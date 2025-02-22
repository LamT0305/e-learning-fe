import React, { useEffect } from "react";
import "./style.css";
import avt from "../../../assets/avt.jpg";
import useMessage from "../../../redux/hooks/useMessage";

function ListUserMessage({ messageId, setUserName, setMessageId }) {
  const { users, handleGetUsers } = useMessage();
  useEffect(() => {
    handleGetUsers();
  }, []);

  useEffect(() => {
    if (!users?.some((user) => user.id === messageId) && users.length > 0) {
      // Only change if the current user is no longer in the list
      setMessageId(users[0].id);
      setUserName(users[0].name);
    }
  }, [users, messageId]);
  

  const handleOnClick = (id, name) => {
    setMessageId(id);
    setUserName(name);
  };
  return (
    <div className="list-users">
      <ul className="list-users__list">
        <h3>Chats</h3>
        {users.map((user) => (
          <li
            className="list-users_user"
            key={user.id}
            onClick={() => handleOnClick(user.id, user.name)}
          >
            <div className="avt">
              <img src={avt} alt="" />
            </div>
            <div className="info">
              <div className="name">{user.name}</div>
              <div className="message">{user.lastMessage}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListUserMessage;
