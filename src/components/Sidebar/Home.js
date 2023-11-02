import React, { useState } from 'react';
import SidebarContacts from './SidebarContacts';
import SearchBox from './SearchBox';
import ChatList from './ChatList';
import { auth} from "../../firebase";


const Home = (props) => {
  const [showContacts, setShowContacts] = useState(false);

  const toggleContacts = () => {
    setShowContacts(!showContacts);
  };

  if (showContacts) {
    // If showContacts is true, render only the SidebarContacts
    return <SidebarContacts />;
  }

  return (
    <>
      {/* Left side bar buttons */}
      <div className="row" style={{ backgroundColor: '#d1d7db', position: 'sticky', top: "0", borderRight: '1px solid #ccc', marginRight: "0px", paddingTop: "10px", paddingBottom: "10px" }}>
        <div className="col-8"> 
           <img src={auth.currentUser.photoURL} alt="User Profile" 
                style={{ width: '40px', height: '40px', borderRadius: '50%' }}></img>
        </div>
        <div className="col-2">
          <i className="bi bi-person-plus-fill" onClick={toggleContacts} style={{fontSize:"25px",paddingLeft:"5px"}}></i>
        </div>
        <div className="col-2 pt-1">
           <i class="bi bi-three-dots-vertical" style={{fontSize:"20px"}}></i>
         </div>
      </div>
      <SearchBox setActiveChartId={props.setActiveChartId} setActiveChartName={props.setActiveChartName} setActiveChartAvatar={props.setActiveChartAvatar} />
      <ChatList setActiveChartId={props.setActiveChartId} setActiveChartName={props.setActiveChartName} setActiveChartAvatar={props.setActiveChartAvatar} />
    </>
  );
};

export default Home;