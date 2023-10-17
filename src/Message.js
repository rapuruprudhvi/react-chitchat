import React from "react";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
const Message = ({ message }) => {
  const [user] = useAuthState(auth);

  return (
    <div
      className={`row chat-bubble ${message.uid === user.uid ? "right" : ""}`}>
      {/* <img
        className="chat-bubble__left"
        src={message.avatar}
        alt="user avatar"
      /> */}

      <div className="chat-bubble__right">
        <p className="user-name"><b>{message.senderName || message.senderId}:</b> {message.text}</p>
      </div>
    </div>
  );
};
export default Message;