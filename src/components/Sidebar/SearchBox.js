import React, { useState } from 'react';
import { auth, db } from "../../firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const SearchBox = (props) => {
  const [searchResults, setSearchResults] = useState([]);

  const searchByName = (inputString) => {
    const sanitizedInput = inputString.trim().toLowerCase();

    if (sanitizedInput === "") {
      // If the search input is empty, do nothing
      return;
    }

    const contactsAndGroupsQuery = query(
      collection(db, "contacts"),
      where("ownerId", "==", auth.currentUser.uid),
      where("name", "==", inputString)
    );

    getDocs(contactsAndGroupsQuery).then((snapshot) => {
      const results = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        results.push({ type: "contact", ...data });
      });

      // You can also query and include groups
      const groupsQuery = query(
        collection(db, "groups"),
        where("adminUid", "==", auth.currentUser.uid),
        where("name", "==", inputString)
      );

      getDocs(groupsQuery).then((groupSnapshot) => {
        groupSnapshot.forEach((doc) => {
          const data = doc.data();
          results.push({ type: "group", ...data });
        });

        setSearchResults(results);
      });
    });
  }

  const findOrCreateNewChat = (selectedContactUid, selectedUserName) => {
    const chatId = [auth.currentUser.uid, selectedContactUid].sort().join("_");
    console.log('chatId', chatId)

    const chatExistsQuery = query(collection(db, "chats"), where("chatId", "==", chatId));
    getDocs(chatExistsQuery).then((chatExistsSnapshot) => {
      if (chatExistsSnapshot.empty) {
        addDoc(collection(db, "chats"), {
          chatId: chatId,
          type: "personal",
          userIds: [auth.currentUser.uid, selectedContactUid],
          userNames: [auth.currentUser.displayName, selectedUserName],
          createdAt: serverTimestamp(),
        }).then((chatDocRef) => {
          props.setActiveChartId(chatDocRef.chatId);
          props.setActiveChartName(selectedUserName); // Set the selected person's name
        });
      } else {
        props.setActiveChartId(chatId);
        props.setActiveChartName(selectedUserName); // Set the selected person's name
      }
    })
  }

  const activateChat = (selectedContactUid, selectedUserName) => {
    findOrCreateNewChat(selectedContactUid, selectedUserName);
  }

  return (
    <>
      <div className='row'>
        <input type='text' placeholder='Search or start a new chat' onChange={(e) => searchByName(e.target.value)}></input>
      </div>
      {searchResults.map((contact) => (
        <div className='row' key={contact.uid}>
          <span onClick={() => activateChat(contact.uid, contact.name)}>{contact.name}</span>
        </div>
      ))}
    </>
  );
};

export default SearchBox;
