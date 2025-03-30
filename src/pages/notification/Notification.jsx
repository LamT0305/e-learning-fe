import React, { useEffect } from "react";
import img from "../../assets/avt.jpg";
import "./style.css";
import useNotification from "../../redux/hooks/useNotification";

function Notification() {
  const { isLoading, notifications, handleGetNotifications, handleDeleteNoti } =
    useNotification();

  useEffect(() => {
    handleGetNotifications();
  }, []);

  return (
    <div className="inner-page">
      <div className="noti-container">
        <h1
          style={{ textDecoration: "underline", marginBottom: 20, padding: 20 }}
        >
          Notifications
        </h1>
        <ul className="noti-list">
          {notifications.map((noti) => (
            <li className="noti-item" key={noti._id}>
              <img
                src={img}
                alt=""
                width={50}
                height={50}
                style={{ borderRadius: 10, marginRight: 10 }}
              />
              <div className="noti-content">
                <p>{noti.content}</p>
              </div>
              <div
                className="delete-noti"
                onClick={() => handleDeleteNoti(noti._id)}
              >
                <i className="fa fa-trash" aria-hidden="true"></i>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Notification;
