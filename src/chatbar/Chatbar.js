import React, { useState } from 'react';
import ChatBox from '../Chatbox';
import SendMessage from '../SendMessage';
const Chatbar = () => {
  return (
    <div>
       <div className="row " style={{ backgroundColor: '#d1d7db',position: 'sticky',top:"0",paddingTop:"10px",paddingBottom:"10px"}}>
          <div className="col-10 " style={{borderLeft: '1px solid light'}}></div>
          <div className="col-1 " > <button>search</button></div>
          <div className="col-1 " ></div>
       </div>

        <div style={{ display: 'flex', flexDirection: 'column', height: '93vh' }}>
          <div style={{ paddingLeft: '25px', flex: 1, overflowY: 'scroll' }}>
              <ChatBox />
           </div>
        
           
           <div className="row" style={{ backgroundColor: '#ccc',position: 'sticky',paddingTop:"10px",paddingBottom:"10px",top:"0"}} >
             <SendMessage />
           </div>
        </div>
    </div>
  );
};
export default Chatbar;