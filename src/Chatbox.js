import React, { useEffect, useState } from "react";
import { auth } from "./firebase";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
  addDoc,
  serverTimestamp,
  where,
  getDocs, 
} from "firebase/firestore"; // Make sure you have the correct path to "firebase/firestore"
import { db } from "./firebase";
import Message from "./Message";
import SendMessage from "./SendMessage";

const ChatBox = ({ selectedPersonId }) => {
  const [messages, setMessages] = useState([]);

  // Sync user information with the database if necessary
  const syncLoggedInUserInfoWithUsersDb = async () => {
    const { uid, email } = auth.currentUser;
    const userExistsQuery = query(
      collection(db, "users"),
      where("uid", "==", uid)
    );
    const userExistsSnapshot = await getDocs(userExistsQuery);

    if (userExistsSnapshot.empty) {
      // Add the user to the "users" collection if not already present
      await addDoc(collection(db, "users"), {
        uid: uid,
        email: email,
        createdAt: serverTimestamp(),
    
      });
    }
  };

  useEffect(() => {
    // Ensure the user info is synchronized with the database
    syncLoggedInUserInfoWithUsersDb();
    const selectedPersonId = '8ZbF03mHsaVru2NXiK53fiUMPf2';
    // Create a query to fetch messages for the selected person
    const messagesQuery = query(
      collection(db, "messages"),
      where("receiverId", "==", selectedPersonId),
      orderBy("createdAt", "asc"), // You can change the ordering as needed
      limit(50)
    );

    
    const unsubscribe = onSnapshot(messagesQuery, (querySnapshot) => {
      const fetchedMessages = [];
      querySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(fetchedMessages);
    });

    return () => {
      
      unsubscribe();
    };
  }, [selectedPersonId]); 

  return (
    <div className="chat-box">
      <div className="messages-wrapper">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      <SendMessage senderId={auth.currentUser.uid} receiverId={selectedPersonId} />
    </div>
  );
};

export default ChatBox;