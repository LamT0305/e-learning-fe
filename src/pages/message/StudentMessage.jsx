import React from "react";
import ListUserMessage from "../../components/message/ListUserMessage/ListUserMessage";
import ViewMessage from "../../components/message/ViewMessage/ViewMessage";
import "./style.css"

function StudentMessage() {
  return (
    <div className="inner-page">
      <div className="message">
        <ListUserMessage />
        <ViewMessage />
      </div>
    </div>
  );
}

export default StudentMessage;
