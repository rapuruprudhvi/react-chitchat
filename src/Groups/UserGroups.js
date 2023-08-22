import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import {
    addDoc,
    collection,
    serverTimestamp,
    query,
    where,
    getDocs,
  } from "firebase/firestore";

const UserGroups = () => {
  const [userGroups, setUserGroups] = useState([]);

  useEffect(() => {
    const fetchUserGroups = async () => {
      const user = auth.currentUser;

      if (user) {
        // const querySnapshot = await db.collection('groups').where('members', 'array-contains', user.uid).get();
        // const groups = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        // setUserGroups(groups);

        const groupsQuery = query(collection(db, "groups"), where('memberUids', 'array-contains', user.uid));
        getDocs(groupsQuery)
        .then((groupsSnapshot) => {
            setUserGroups(groupsSnapshot.docs.map((doc) => doc.data()));
        })
      }
    };

    fetchUserGroups();
  }, []);

  return (
    <div>
      <h2>Your Groups</h2>
      <ul>
        {userGroups.map((group) => (
          <li key={group.id}>{group.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserGroups;
