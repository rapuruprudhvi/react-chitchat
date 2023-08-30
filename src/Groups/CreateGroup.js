import React, { useState } from 'react';
import { db,auth } from '../firebase';
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";


const CreateGroup = () => {
  const [groupName, setGroupName] = useState('');

  const createGroup = async () => {
    if (groupName.trim() !== '') {
      return addDoc(collection(db, "groups"), {
        name: groupName,
        createdAt: serverTimestamp(),
        adminUid: auth.currentUser.uid,
        memberUids: [auth.currentUser.uid],
      });

      console.log('Group created');

      setGroupName('');
    }
  };

  return (
    <div>
      <h2>Create Group</h2>
      <input
        type="text"
        placeholder="Group Name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />
      <button onClick={createGroup}>Create Group</button>
    </div>
  );
}

export default CreateGroup;
