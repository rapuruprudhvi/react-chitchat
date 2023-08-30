import React from "react";
import { auth } from "./firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import NavBar from "./NavBar";
import ChatBox from "./Chatbox.js";
import Welcome from "./Welcome.js";
import AddContact from "./AddContact.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import SendMessage from "./SendMessage.js";
// import Contacts from "./Contacts.js";
import SideBar from "./components/Sidebar/Sidebar.js";


const Layout = () => {
  // const [user] = useAuthState(auth);

  return (
    <div className="container-fluid position-fixed">
      <div className="row ">
        <div className="col-3  "> 
          <SideBar></SideBar>
        </div>

        <div className="col-9 p-0" >
          <div className="row " style={{ backgroundColor: '#d1d7db',position: 'sticky',top:"0",paddingTop:"10px",paddingBottom:"10px"}}>
            <div className="col-12 " style={{borderLeft: '1px solid light'}}> <button> naveen</button></div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', height: '95vh' }}>
            <div style={{ paddingLeft: '25px', flex: 1, overflowY: 'scroll' }}>
              {/* <NavBar /> */}
              <ChatBox />
            </div>
           
            <div className="row" style={{ backgroundColor: '#ccc',position: 'sticky',paddingTop:"10px",paddingBottom:"10px",top:"0"}} >
              <SendMessage />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;