import React, { useState } from "react";
const SendMessage = ({ sendMessage }) => {
  const [messageText, setMessageText] = useState("");

  const handleSendMessage = () => {
    if (messageText.trim() !== "") {
      sendMessage(messageText);
      setMessageText("");
    }
  };

  return (
    <div className="send-message">
      <input
        type="text"
        placeholder="Type your message..."
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)} 
        style={{paddingRight:"70%",marginLeft:"20px"}}
      />
      <i class="bi bi-send-fill" onClick={handleSendMessage} style={{fontSize:"20px",marginLeft:"10px",color:"green"}}></i>
    </div>
  );
};

export default SendMessage;
