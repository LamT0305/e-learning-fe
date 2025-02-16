import React from "react";
import avt from "../../../../assets/avt.jpg";
import "./style.css";

function RecentMessages() {
  return (
    <div className="recent-messages">
      <h3>Recent Messages</h3>
      <ul>
        <li className="list-ms-item">
          <div className="ms-user">
            <img
              className="avt"
              src={avt}
              alt="avatar"
              width={40}
              height={40}
            />
          </div>
          <div style={{ fontSize: "14px" }}>
            <p style={{ marginBottom: 5 }}>Amanda</p>

            <p className="ms-content">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's.....
            </p>
          </div>
        </li>
        <li className="list-ms-item">
          <div className="ms-user">
            <img
              className="avt"
              src={avt}
              alt="avatar"
              width={40}
              height={40}
            />
          </div>
          <div style={{ fontSize: "14px" }}>
            <p style={{ marginBottom: 5 }}>Amanda</p>

            <p className="ms-content">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's.....
            </p>
          </div>
        </li>
        <li className="list-ms-item">
          <div className="ms-user">
            <img
              className="avt"
              src={avt}
              alt="avatar"
              width={40}
              height={40}
            />
          </div>
          <div style={{ fontSize: "14px" }}>
            <p style={{ marginBottom: 5 }}>Amanda</p>

            <p className="ms-content">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's.....
            </p>
          </div>
        </li>
        <li className="list-ms-item">
          <div className="ms-user">
            <img
              className="avt"
              src={avt}
              alt="avatar"
              width={40}
              height={40}
            />
          </div>
          <div style={{ fontSize: "14px" }}>
            <p style={{ marginBottom: 5 }}>Amanda</p>

            <p className="ms-content">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's.....
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default RecentMessages;
