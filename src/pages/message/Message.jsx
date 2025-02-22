import React from "react";
import ListUserMessage from "../../components/message/ListUserMessage/ListUserMessage";
import ViewMessage from "../../components/message/ViewMessage/ViewMessage";
import "./style.css";

function Message() {
  const [messageId, setMessageId] = React.useState(null);
  const [userName, setUserName] = React.useState(null);
  return (
    <div className="inner-page">
      <div className="message">
        <ListUserMessage messageId={messageId} setUserName={setUserName} setMessageId={setMessageId}/>
        <ViewMessage id={messageId} name={userName} />
      </div>
    </div>
  );
}

export default Message;
 