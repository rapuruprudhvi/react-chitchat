import React, { useEffect, useState } from "react";
import ChatBox from '../Chatbox';
import SendMessage from '../SendMessage';
import NavBar from '../NavBar';
import { auth, db } from "../firebase";
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

const Chatbar = (props) => {
  const activeChartId = props.activeChartId;

  const fetchChatUser = () => {
    if(!activeChartId){
      return;
    }

    const chatExistsQuery = query(collection(db, "chats"), where("chatId", "==", activeChartId));
    getDocs(chatExistsQuery).then((chatExistsSnapshot) => {
      if (!chatExistsSnapshot.empty) {
        const chatDocRef = chatExistsSnapshot.docs.map((doc) => doc.data())[0];
        const userNames = chatDocRef.userNames;
        const index = userNames.indexOf(auth.currentUser.displayName);
        if (index > -1) {
          userNames.splice(index, 1);
        }
        props.setActiveChartName(userNames[0]); // Set the selected person's name
      }
    })
  }

  useEffect(() => {
    fetchChatUser()
  }, [activeChartId]);

  return (
    <div>
       <div className="row " style={{ backgroundColor: '#d1d7db',position: 'sticky',top:"0",paddingTop:"10px",paddingBottom:"10px"}}>
          <div className="col-10" style={{borderLeft: '1px solid light'}}>{props.activeChartName}</div>
          <div   className="col-1"><i class="bi bi-search" style={{fontSize:"25px"}} ></i></div>

          <div className="col-1"><NavBar></NavBar></div>
       </div>

        <ChatBox activeChartId={props.activeChartId} />
    </div>
  );
};
export default Chatbar;