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
    if(searchResults.length > 0){
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

  const findOrCreateNewChat = (selectedContactUid) => {
    const chatId = [auth.currentUser.uid, selectedContactUid].sort().join("_");
    console.log('chatId', chatId)

    const chatExistsQuery = query(collection(db, "chats"), where("chatId", "==", chatId));
    getDocs(chatExistsQuery).then((chatExistsSnapshot) => {
      if (chatExistsSnapshot.empty) {
        const selectedUserQuery = query(collection(db, "users"), where("uid", "==", selectedContactUid));
        getDocs(selectedUserQuery).then((selectedUserSnapshot) => {
          console.log('selectedUserSnapshot.docs[0].data()', selectedUserSnapshot.docs[0].data())
          const selectedUserName = selectedUserSnapshot.docs[0].data().name || 'Unkown';
          addDoc(collection(db, "chats"), {
            chatId: chatId,
            type: "personal",
            userIds: [auth.currentUser.uid, selectedContactUid],
            userNames: [auth.currentUser.displayName, selectedUserName],
            createdAt: serverTimestamp(),
          }).then((chatDocRef) => {
            props.setActiveChartId(chatDocRef.chatId);
          });
        });
      } else {
        props.setActiveChartId(chatId);
      }
    })
  }

  const activateChat = (selectedContactUid) => {
    findOrCreateNewChat(selectedContactUid);
  }

  return (
    <>
      <div className='row'>
        <input type='text' placeholder='Search or start a new chat' onChange={(e) => searchByName(e.target.value)}></input>
      </div>
      {searchResults.map((contact) => (
        <div className='row'>
          <span key={contact.uid} onClick={(e) => activateChat(contact.uid)}>{contact.name}</span>
        </div>
      ))}

    </>
  );
};

export default SearchBox;