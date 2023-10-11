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

  const { uid, email } = auth.currentUser;
  console.log(auth.currentUser)

  // debugger
  const selectedPersonId = props.activeChartId;

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

    console.log('selectedPersonId', selectedPersonId)
    if(!selectedPersonId){
      return;
    }
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
      console.log(fetchedMessages)
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

  if (props.activeChartId === null) {
    return <>
      <h1>WhatsApp Web</h1>
      <p>
        Send and receive messages without keeping your phone online.
        <br />
        Use WhatsApp on up to 4 linked devices and 1 phone at the same time.
      </p>

      <div class="ubfBJ"><span data-icon="lock-small" class=""><svg viewBox="0 0 10 12" height="12" width="10" preserveAspectRatio="xMidYMid meet" class="" version="1.1"><path d="M5.00847986,1.6 C6.38255462,1.6 7.50937014,2.67435859 7.5940156,4.02703389 L7.59911976,4.1906399 L7.599,5.462 L7.75719976,5.46214385 C8.34167974,5.46214385 8.81591972,5.94158383 8.81591972,6.53126381 L8.81591972,9.8834238 C8.81591972,10.4731038 8.34167974,10.9525438 7.75719976,10.9525438 L2.25767996,10.9525438 C1.67527998,10.9525438 1.2,10.4731038 1.2,9.8834238 L1.2,6.53126381 C1.2,5.94158383 1.67423998,5.46214385 2.25767996,5.46214385 L2.416,5.462 L2.41679995,4.1906399 C2.41679995,2.81636129 3.49135449,1.68973395 4.84478101,1.60510326 L5.00847986,1.6 Z M5.00847986,2.84799995 C4.31163824,2.84799995 3.73624912,3.38200845 3.6709675,4.06160439 L3.6647999,4.1906399 L3.663,5.462 L6.35,5.462 L6.35111981,4.1906399 C6.35111981,3.53817142 5.88169076,2.99180999 5.26310845,2.87228506 L5.13749818,2.85416626 L5.00847986,2.84799995 Z" fill="currentColor"></path></svg></span> Your personal messages are end-to-end encrypted</div>
    </>;
  }

  return (
    <div className="chat-box">
      <div style={{ display: 'flex', flexDirection: 'column', height: '93vh' }}>
        <div style={{ paddingLeft: '25px', flex: 1, overflowY: 'scroll' }}>
          {messages.map((message) => (
            <Message key={message.id} message={message} />
           ))}
        </div>

        <div className="row" style={{ backgroundColor: '#ccc',position: 'sticky',paddingTop:"10px",paddingBottom:"10px",top:"0"}} >
          <SendMessage sendMessage={sendMessage} />
         </div>
      </div>
    </div>
  );
};

export default ChatBox;