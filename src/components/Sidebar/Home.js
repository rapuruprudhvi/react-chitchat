import React, { useState } from 'react';
import SidebarContacts from './SidebarContacts';

const Home = () => {
  const [showHome, setShowHome] = useState(true);

//  Function to hide the home page and show the sidebar
  const toggleComponents = () => {
    setShowHome(!showHome);
  };

  return (
    <>
      {showHome ? (
        <>
          {/* Left side bar buttons */}
          <div className="row p-0 " style={{ backgroundColor: '#d1d7db', position: 'sticky',top: "0",borderRight:"5px"}}>
            <div className="col-6"></div>
            <div className="col-2"></div>
            <div className="col-2">
              <button onClick={toggleComponents}>Contacts</button>
            </div>
            <div className="col-2"> </div>
          </div>

          <div className="row">
            <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', flex: 1, overflowY: 'scroll' }}>
              <div className="col-2"></div>
              <div className="col-10">
                {/* Content of the Home component */}
              </div>
            </div>
          </div>
        </>
      ) : (
        <SidebarContacts />
      )}
    </>
  );
};

export default Home;