import React, { useEffect, useRef, useState } from "react";
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
import AddContact from "./AddContact";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const scroll = useRef();

  const syncLoggedInUserInfoWithUsersDb = () => {
    const { uid, email } = auth.currentUser;
    const userExistsQuery = query(
      collection(db, "users"),
      where("uid", "==", uid)
    );
    getDocs(userExistsQuery).then((userExistsSnapshot) => {
      if (userExistsSnapshot.empty) {
        addDoc(collection(db, "users"), {
          uid: uid,
          email: email,
          createdAt: serverTimestamp(),
        });
      }
    });
  };

  useEffect(() => {
    syncLoggedInUserInfoWithUsersDb();

    const q = query(
      collection(db, "messages"),
      orderBy("createdAt", "desc"),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages = [];
      QuerySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id });
      });
      const sortedMessages = fetchedMessages.sort(
        (a, b) => a.createdAt - b.createdAt
      );
      setMessages(sortedMessages);
    });
    return () => unsubscribe;
  }, []);

  return (
    <div className="chat-box">
      <div className="messages-wrapper">
        {messages?.map((message) => (
          <Message key={message.id} message={message} />
        ))}

      </div>
      {/* when a new message enters the chat, the screen scrolls down to the scroll div */}
      <span ref={scroll}></span>
      <SendMessage scroll={scroll} />
      {/* <AddContact /> */}
    </div>
  );
};

export default ChatBox;