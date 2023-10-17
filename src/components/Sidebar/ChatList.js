import React, { useState, useEffect } from 'react';
import { auth, db } from "../../firebase";

import {
    collection,
    query,
    where,
    getDocs,
  } from "firebase/firestore";

const ChatList = (props) => {
  const [chatList, setChatList] = useState([]);

  const fetchChatList = async () => {
    const user = auth.currentUser;
    if (!user) {
      return
    }

    const chatListQuery = query(collection(db, "chats"), where('userIds', 'array-contains', auth.currentUser.uid));
    getDocs(chatListQuery).then((chatListSnapshot) => {
      setChatList(chatListSnapshot.docs.map((doc) => doc.data()));
    })
  };

  const fetchUserName = (chat) => {
    const userNames = chat.userNames;
    const index = userNames.indexOf(auth.currentUser.displayName);
    if (index > -1) {
      userNames.splice(index, 1);
    }
    return userNames[0];
  }

  useEffect(() => {
    fetchChatList();
  }, []);

  return (
    <>
      <div className='row'><h3>Chats:</h3></div>
      {chatList.map((chat) => (
        <div className='row' key={chat.chatId} onClick={(e) => props.setActiveChartId(chat.chatId)}>{fetchUserName(chat)}</div>
      ))}
    </>
  );
}

export default ChatList;
