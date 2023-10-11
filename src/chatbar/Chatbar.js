import React, { useState } from 'react';
import ChatBox from '../Chatbox';
import SendMessage from '../SendMessage';
import NavBar from '../NavBar';
const Chatbar = (props) => {
  return (
    <div>
       <div className="row " style={{ backgroundColor: '#d1d7db',position: 'sticky',top:"0",paddingTop:"10px",paddingBottom:"10px"}}>
          <div className="col-10" style={{borderLeft: '1px solid light'}}></div>
          <div   className="col-1"><i class="bi bi-search" style={{fontSize:"25px"}} ></i></div>

          <div className="col-1"><NavBar></NavBar></div>
       </div>

        <ChatBox activeChartId={props.activeChartId}/>
    </div>
  );
};
export default Chatbar;