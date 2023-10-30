import React from "react";
import { useEffect, useState } from "react";
import { auth } from "./firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import NavBar from "./NavBar";
import ChatBox from "./Chatbox.js";
import Welcome from "./Welcome.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import SendMessage from "./SendMessage.js";
// import Contacts from "./Contacts.js";
import SideBar from "./components/Sidebar/Sidebar.js";
import Chatbar from "./chatbar/Chatbar.js";


const Layout = () => {
  // const [user] = useAuthState(auth);

  const [activeChartId, setActiveChartId] = useState(null);
  const [activeChartName,setActiveChartName]=useState(null);
  const [activeChartAvater,setActiveChartAvater]=useState(null);


  return (
    <div className="container-fluid position-fixed">
      <div className="row">
        <div className="col-3">
          <SideBar setActiveChartId={setActiveChartId} setActiveChartName={setActiveChartName} setActiveChartAvater={setActiveChartAvater}></SideBar>
        </div>

        <div className="col-9 p-0" >
          <Chatbar activeChartId={activeChartId} activeChartName={activeChartName} activeChartAvater={activeChartAvater} setActiveChartName={setActiveChartName}/>
        </div>
      </div>
    </div>
  );
};

export default Layout;