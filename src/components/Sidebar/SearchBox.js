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
    // FIXME: Remove it
    if (searchResults.length > 0) {
      return;
    }

    const searchByNameQuery = query(collection(db, "contacts"), where("ownerId", "==", auth.currentUser.uid), where("name", "==", inputString));
    getDocs(searchByNameQuery)
    .then((searchByNameSnapshot) => {
      console.log(searchByNameSnapshot)
      if (searchByNameSnapshot.empty) {
        const allContactsQuery = query(collection(db, "contacts"), where("ownerId", "==", auth.currentUser.uid));
        getDocs(allContactsQuery)
        .then((allContactsSnapshot) => {
          setSearchResults(allContactsSnapshot.docs.map((doc) => doc.data()));
        });
      } else {
        setSearchResults(searchByNameSnapshot.docs.map((doc) => doc.data()));
      }
    })
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
