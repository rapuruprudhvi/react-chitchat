import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

function GroupChat({ groupUid }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  // Create a reference to the group messages collection
  const groupMessagesRef = collection(db,"groupmessages");

  // Function to send a message
  const sendMessage = async () => {
    if (message.trim() !== '') {
      await addDoc(groupMessagesRef, {
        text: message,
        senderUid: auth.currentUser.uid,
        createdAt: serverTimestamp(),
      });

      // Clear the input field
      setMessage('');
    }
  };

  // Function to listen for new messages
  useEffect(() => {
    const q = query(groupMessagesRef, orderBy('createdAt'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages = [];
      snapshot.forEach((doc) => {
        newMessages.push({ id: doc.id, ...doc.data() });
      });
      setMessages(newMessages);
    });

    return () => {
      unsubscribe(); // Unsubscribe when the component unmounts
    };
  }, [groupMessagesRef]);

  return (
    <div>
      <h2>Group Chat</h2>
      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className="message">
            <p>{msg.text}</p>
            <small>Sender: {msg.senderUid}</small>
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          placeholder="Type your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default GroupChat;
