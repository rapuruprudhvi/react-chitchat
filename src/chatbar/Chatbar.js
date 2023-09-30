import React, { useState } from 'react';
import ChatBox from '../Chatbox';
import SendMessage from '../SendMessage';
import NavBar from '../NavBar';
const Chatbar = () => {
  return (
    <div>
       <div className="row " style={{ backgroundColor: '#d1d7db',position: 'sticky',top:"0",paddingTop:"10px",paddingBottom:"10px"}}>
          <div className="col-9 " style={{borderLeft: '1px solid light'}}></div>
          <div className="col-1 " > <button>search</button></div>

          <div className="col-2 " ><NavBar></NavBar></div>
       </div>
        <ChatBox />
    </div>
  );
};
export default Chatbar;