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
} from "firebase/firestore";
import { db } from "./firebase";
import Message from "./Message";
import SendMessage from "./SendMessage";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [newUserCreated, setNewUserCreated] = useState(false);
  
  const { uid, email } = auth.currentUser;
  console.log(auth.currentUser)
  
  // debugger
  const selectedPersonId = "4WbapkEtDbejNuNs6lL8PdMviEs1";

  // Sync user information with the database if necessary
  const syncLoggedInUserInfoWithUsersDb = async () => {
    if(!email) {
      return;
    }
    const userExistsQuery = query(collection(db, "users"), where("email", "==", email));
    const userExistsSnapshot = await getDocs(userExistsQuery);
    
    if (userExistsSnapshot.empty && !newUserCreated) {
      setNewUserCreated(true)
      // Add the user to the "users" collection if not already present
      await addDoc(collection(db, "users"), {
        uid: uid,
        email: email,
        createdAt: serverTimestamp(),
      });
    }
  };

  useEffect(() => {
    syncLoggedInUserInfoWithUsersDb();

    // Create a query to fetch messages for either the current user or the selected person
    const messagesQuery = query(
      collection(db, "messages"),
      orderBy("createdAt", "asc"),
      where("receiverId", "in", [auth.currentUser.uid, selectedPersonId]),
      where("senderId", "in", [auth.currentUser.uid, selectedPersonId]),
     
      limit(50)
    );

    const unsubscribe = onSnapshot(messagesQuery, (querySnapshot) => {
      const fetchedMessages = [];
      querySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(fetchedMessages);
    }, (error) => {
      console.error("Error fetching messages:", error);
    });

    return () => {
      unsubscribe();
    };
  }, [selectedPersonId]);

  // Function to send a new message
  const sendMessage = async (text) => {
    try {
      await addDoc(collection(db, "messages"), {
        text: text,
        senderId: auth.currentUser.uid,
        receiverId: selectedPersonId,
        createdAt: serverTimestamp(),
      });
      console.log("Message sent successfully!");
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  return (
    <div className="chat-box">
      <div className="messages-wrapper">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      <SendMessage sendMessage={sendMessage} />
    </div>
  );
};

export default ChatBox;