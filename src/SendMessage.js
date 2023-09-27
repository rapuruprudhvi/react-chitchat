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
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default SendMessage;
