import React, { useEffect } from "react";
import ChatBox from '../Chatbox';
import SendMessage from '../SendMessage';
import NavBar from '../NavBar';
import { auth, db } from "../firebase";
import {
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";

const Chatbar = (props) => {
  const activeChartId = props.activeChartId;

  const fetchChatUser = () => {
    if (!activeChartId) {
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
        props.setActiveChartName(userNames[0]);
      }
    });
  };

  useEffect(() => {
    fetchChatUser();
  }, [activeChartId]);

  if (activeChartId === null) {
    return (
      <div>
        <h1>WhatsApp Web</h1>
      <p>
        Send and receive messages without keeping your phone online.
        <br />
        Use WhatsApp on up to 4 linked devices and 1 phone at the same time.
      </p>

      <div className="ubfBJ"><span data-icon="lock-small"><svg viewBox="0 0 10 12" height="12" width="10" preserveAspectRatio="xMidYMid meet" version="1.1"><path d="M5.00847986,1.6 C6.38255462,1.6 7.50937014,2.67435859 7.5940156,4.02703389 L7.59911976,4.1906399 L7.599,5.462 L7.75719976,5.46214385 C8.34167974,5.46214385 8.81591972,5.94158383 8.81591972,6.53126381 L8.81591972,9.8834238 C8.81591972,10.4731038 8.34167974,10.9525438 7.75719976,10.9525438 L2.25767996,10.9525438 C1.67527998,10.9525438 1.2,10.4731038 1.2,9.8834238 L1.2,6.53126381 C1.2,5.94158383 1.67423998,5.46214385 2.25767996,5.46214385 L2.416,5.462 L2.41679995,4.1906399 C2.41679995,2.81636129 3.49135449,1.68973395 4.84478101,1.60510326 L5.00847986,1.6 Z M5.00847986,2.84799995 C4.31163824,2.84799995 3.73624912,3.38200845 3.6709675,4.06160439 L3.6647999,4.1906399 L3.663,5.462 L6.35,5.462 L6.35111981,4.1906399 C6.35111981,3.53817142 5.88169076,2.99180999 5.26310845,2.87228506 L5.13749818,2.85416626 L5.00847986,2.84799995 Z" fill="currentColor"></path></svg></span> Your personal messages are end-to-end encrypted</div>
   
      </div>
    );
  }

  return (
    <div>
      <div className="row" style={{ backgroundColor: '#d1d7db', position: 'sticky', top: "0", paddingTop: "10px", paddingBottom: "10px" }}>
      <div className="col-1" >
         <img src={props.activeChartName} alt="Profile"  style={{ width: '40px', height: '40px', borderRadius: '50%' }}></img></div>
        <div className="col-9" style={{ borderLeft: '1px solid light' }}>{props.activeChartName}</div>
        <div className="col-1"><i className="bi bi-search" style={{ fontSize: "25px" }}></i></div>
        <div className="col-1"><NavBar></NavBar></div>
      </div>
      <ChatBox activeChartId={props.activeChartId} />
    </div>
  );
};

export default Chatbar;
