import React, { useState } from 'react';
import SidebarContacts from './SidebarContacts';

const Home = () => {
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
        <div className="col-6"></div>
        <div className="col-2">
          <button onClick={toggleContacts}>Contacts</button>
        </div>
        <div className="col-2"> </div>
      </div>
    
    </>
  );
};

export default Home;