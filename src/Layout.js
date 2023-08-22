import React from "react";
import { auth } from "./firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import NavBar from "./NavBar";
import ChatBox from "./Chatbox.js";
import Welcome from "./Welcome.js";
import AddContact from "./AddContact.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateGroup from "./Groups/CreateGroup.js";
import UserGroups from "./Groups/UserGroups.js";

const Layout = () => {
  // const [user] = useAuthState(auth);

  return (
    <div className="container">
      <div className="row">
        
        <div className="col-3 ">
          <AddContact />
          <CreateGroup />
          <UserGroups />
          
        </div>

        
        <div className="col-9 ">
          <ChatBox />
        </div>
      </div>
    </div>
  );
};

export default Layout;