import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../../firebase.js"; // Import the auth object
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./Home.js";
import NewGroup from "./NewGroup.js";
import AddContacts from "./AddContacts.js";


const SidebarContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [showHome, setShowHome] = useState(true);

  const [showGroupContacts, setShowGroupContacts] = useState(false);

  // Get the signed-in user's ID
  const signedInUserId = auth.currentUser ? auth.currentUser.uid : null;

  // Function to toggle between SidebarContacts and Home
  const toggleComponent = () => {
    setShowHome(!showHome);
  };

  const toggleGroupContacts = () => {
    setShowGroupContacts(!showGroupContacts);
  };

  if(showGroupContacts) {
    return <NewGroup/>
  }

  return (
    <div>
      {showHome ? (
        <div>
          <div className="row " style={{ backgroundColor: '#008069', position: 'sticky', top: "0", color: "white",paddingTop:"50px",marginRight:"0px",paddingBottom:"10px" }}>
            <div className="col-2">
              <button className="bi bi-arrow-left" onClick={toggleComponent}>back</button> {/* Bootstrap left arrow icon */}
            </div>
            <h4 className="col-10"> New Chat</h4>
          </div>
          <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', flex: 1, overflowY: 'scroll' }} >
            <div className="row">
              <span onClick={toggleGroupContacts}>New Group</span>
            </div>
            <div className="row">
              <AddContacts />
            </div>
          </div>
        </div>

      ) : (
        <div>
          <Home></Home>
        </div>
      )}
    </div>
  );
};

export default SidebarContacts;