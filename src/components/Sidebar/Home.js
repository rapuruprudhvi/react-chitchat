import React, { useState } from 'react';
import SidebarContacts from './SidebarContacts';
import SearchBox from './SearchBox';
import ChatList from './ChatList';

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
        <div className="col-8"></div>
        <div className="col-2">
          <i className="bi bi-person-plus-fill" onClick={toggleContacts} style={{fontSize:"25px"}}></i>
        </div>
        <div className="col-2"> </div>
      </div>
      <SearchBox setActiveChartId={props.setActiveChartId} />
      <ChatList setActiveChartId={props.setActiveChartId} />
    </>
  );
};

export default Home;