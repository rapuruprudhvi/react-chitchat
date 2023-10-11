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

  const activateChat = (uid) => {
    props.setActiveChartId(uid);
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