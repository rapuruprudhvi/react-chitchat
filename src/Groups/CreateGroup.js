import React, { useState } from 'react';
import { db, auth } from '../firebase';
import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import Home from '../components/Sidebar/Home';

function generateRandomString(length) {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    randomString += charset[randomIndex];
  }
  return randomString;
}

const CreateGroup = (props) => {
  const [groupName, setGroupName] = useState('');
  const [showGroup, setShowGroup] = useState(false); // Initialize with false

  const createGroup = async () => {
    if (groupName.trim() !== '') {
      // Generate a random 28-character alphanumeric string for groupUid
      const groupUid = generateRandomString(28);

      const groupDocRef = await addDoc(collection(db, "groups"), {
        groupUid, // Assign the generated groupUid
        name: groupName,
        createdAt: serverTimestamp(),
        adminUid: auth.currentUser.uid,
        memberUids: [auth.currentUser.uid, ...props.selectedIds],
      });

      console.log("Group created with ID:", groupDocRef.id);

      // Reset the groupName input
      setGroupName('');
      // Show the group
      setShowGroup(true);
    }
  };

  if (showGroup) {
    return <Home />;
  }

  return (
    <div>
      <h2>Create Group</h2>
      <input
        type="text"
        placeholder="Group Name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />
        <div className="row">
           <div className='col-4'></div>
             <div className='col-8'>
               <i className="bi bi-check-circle-fill" onClick={createGroup} style={{fontSize:"40px",color:"green"}}></i>
            </div>
        </div>
     </div>
  );
}

export default CreateGroup;
