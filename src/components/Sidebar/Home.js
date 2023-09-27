import React, { useState } from 'react';
import SidebarContacts from './SidebarContacts';
import UserGroups from '../../Groups/UserGroups';


const Home = () => {
  const [showContacts, setShowContacts] = useState(false);
  const [showGroups, setShowGroups] = useState(false);

  //  Function to hide the home page and show the sidebar
  const toggleContacts = () => {
    setShowContacts(!showContacts);
  };

  const toggleGroups = () => {
    setShowGroups(!showGroups);
  };

  if(showGroups){
    return <UserGroups></UserGroups>
  } else if(showContacts){
    return <SidebarContacts></SidebarContacts>
  }

  return (
    <>
      {/* Left side bar buttons */}
      <div className="row " style={{ backgroundColor: '#d1d7db', position: 'sticky',top: "0", borderRight: '1px solid #ccc',marginRight:"0px",paddingTop:"10px",paddingBottom:"10px"}}>
        <div className="col-6"></div>
        <div className="col-2">
        <button onClick={toggleGroups}>Groups</button>
        </div>
        <div className="col-2">
          <button onClick={toggleContacts}>Contacts</button>
        </div>
        <div className="col-2"> </div>
      </div>
    </>
  );
};

export default Home;