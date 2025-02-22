import React from "react";
import img from "../../../assets/avt.jpg";
import "./style.css";

function Notification() {
  return (
    <div className="inner-page">
      <div className="noti-container">
        <h1 style={{ textDecoration: "underline", marginBottom:20 }}>Notifications</h1>
        <ul className="noti-list">
          <li className="noti-item">
            <img
              src={img}
              alt=""
              width={50}
              height={50}
              style={{ borderRadius: 10, marginRight: 10 }}
            />
            <div className="noti-content">
              <p>Notification Title</p>

              <p>
                Eu amet ad quis proident ullamco culpa amet do pariatur Lorem
                minim pariatur occaecat nulla.
              </p>
            </div>
            <div className="delete-noti">
                <i className="fa fa-trash" aria-hidden="true"></i>
            </div>
          </li>
          <li className="noti-item">
            <img
              src={img}
              alt=""
              width={50}
              height={50}
              style={{ borderRadius: 10, marginRight: 10 }}
            />
            <div className="noti-content">
              <p>Notification Title</p>

              <p>
                Eu amet ad quis proident ullamco culpa amet do pariatur Lorem
                minim pariatur occaecat nulla.
              </p>
            </div>
          </li>
          <li className="noti-item">
            <img
              src={img}
              alt=""
              width={50}
              height={50}
              style={{ borderRadius: 10, marginRight: 10 }}
            />
            <div className="noti-content">
              <p>Notification Title</p>

              <p>
                Eu amet ad quis proident ullamco culpa amet do pariatur Lorem
                minim pariatur occaecat nulla.
              </p>
            </div>
          </li>
          <li className="noti-item">
            <img
              src={img}
              alt=""
              width={50}
              height={50}
              style={{ borderRadius: 10, marginRight: 10 }}
            />
            <div className="noti-content">
              <p>Notification Title</p>

              <p>
                Eu amet ad quis proident ullamco culpa amet do pariatur Lorem
                minim pariatur occaecat nulla.
              </p>
            </div>
          </li>
          <li className="noti-item">
            <img
              src={img}
              alt=""
              width={50}
              height={50}
              style={{ borderRadius: 10, marginRight: 10 }}
            />
            <div className="noti-content">
              <p>Notification Title</p>

              <p>
                Eu amet ad quis proident ullamco culpa amet do pariatur Lorem
                minim pariatur occaecat nulla.
              </p>
            </div>
          </li>
          <li className="noti-item">
            <img
              src={img}
              alt=""
              width={50}
              height={50}
              style={{ borderRadius: 10, marginRight: 10 }}
            />
            <div className="noti-content">
              <p>Notification Title</p>

              <p>
                Eu amet ad quis proident ullamco culpa amet do pariatur Lorem
                minim pariatur occaecat nulla.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Notification;
