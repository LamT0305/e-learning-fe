import React, { useState, memo } from "react";
import ListUserMessage from "../../components/message/ListUserMessage/ListUserMessage";
import ViewMessage from "../../components/message/ViewMessage/ViewMessage";
import "./style.css";

const Message = memo(() => {
  const [selectedUser, setSelectedUser] = useState({ id: null, name: null });

  const handleUserSelect = (id, name) => {
    setSelectedUser({ id, name });
  };

  return (
    <div className="w-full h-full flex">
      <ListUserMessage
        messageId={selectedUser.id}
        onUserSelect={handleUserSelect}
      />
      <ViewMessage id={selectedUser.id} name={selectedUser.name} />
    </div>
  );
});

export default Message;
