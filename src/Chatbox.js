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

const ChatBox = (props) => {
  const [messages, setMessages] = useState([]);
  const [newUserCreated, setNewUserCreated] = useState(false);

  const { uid, email, displayName, photoURL } = auth.currentUser; // Added photoURL
  console.log(auth.currentUser);

  const activeChartId = props.activeChartId;

  // Sync user information with the database if necessary
  const syncLoggedInUserInfoWithUsersDb = async () => {
    if (!email) {
      return;
    }
    const userExistsQuery = query(collection(db, "users"), where("email", "==", email));
    const userExistsSnapshot = await getDocs(userExistsQuery);

    if (userExistsSnapshot.empty && !newUserCreated) {
      setNewUserCreated(true);
      // Use the logged-in user's avatar URL
      const avatarUrl = photoURL || ""; // If no URL is available, set it to an empty string

      // Add the user to the "users" collection with the 'avatar' field
      await addDoc(collection(db, "users"), {
        uid: uid,
        email: email,
        name: displayName,
        createdAt: serverTimestamp(),
        avatar: avatarUrl, // Add the avatar URL to the document
      });
    }
  };

  useEffect(() => {
    syncLoggedInUserInfoWithUsersDb();

    if (!activeChartId) {
      return;
    }
    // Create a query to fetch messages for either the current user or the selected person
    const messagesQuery = query(
      collection(db, "messages"),
      orderBy("createdAt", "asc"),
      where("chatId", "==", activeChartId),
      limit(50)
    );

    const unsubscribe = onSnapshot(messagesQuery, (querySnapshot) => {
      const fetchedMessages = [];
      querySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id });
      });
      console.log(fetchedMessages);
      setMessages(fetchedMessages);
    }, (error) => {
      console.error("Error fetching messages:", error);
    });

    return () => {
      unsubscribe();
    };
  }, [activeChartId]);

  // Function to send a new message
  const sendMessage = async (text) => {
    try {
      await addDoc(collection(db, "messages"), {
        chatId: activeChartId,
        text: text,
        senderId: auth.currentUser.uid,
        senderName: auth.currentUser.displayName || auth.currentUser.email,
        createdAt: serverTimestamp(),
      });
      console.log("Message sent successfully!");
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  return (
    <div className="chat-box">
      <div style={{ display: 'flex', flexDirection: 'column', height: '93vh' }}>
        <div style={{ paddingLeft: '25px', flex: 1, overflowY: 'scroll' }}>
          {messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
        </div>

        <div className="row" style={{ backgroundColor: '#ccc', position: 'sticky', paddingTop: "10px", paddingBottom: "10px", top: "0" }} >
          <SendMessage sendMessage={sendMessage} />
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
