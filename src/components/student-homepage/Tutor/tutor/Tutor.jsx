import React from "react";
import avt from "../../../../assets/avt.jpg";
import Schedule from "../schedule/Schedule";
import RecentMessages from "../recent-messages/RecentMessages";
import "./style.css";

function Tutor() {
  return (
    <div className="tutor">
      <h1
        style={{
          fontSize: 40,
          color: "black",
          textDecoration: "underline",
          marginBottom: 50,
        }}
      >
        Tutor
      </h1>

      <div className="tutor-information">
        <div className="" style={{ display: "flex", alignItems: "center" }}>
          <div className="avatar">
            <img src={avt} alt="" width={"100%"} height={"100%"} />
          </div>

          <div className="contact-info">
            <p className="name">Amanda</p>
            <p className="email">Amanda@gmail.com</p>
          </div>
        </div>

        <div className="interaction-btn">
          <div className="message-btn" style={{backgroundColor: 'white'}}>
            <i className="fa fa-paper-plane" aria-hidden="true"></i>
            <p style={{ marginLeft: 10 }}>Send message</p>
          </div>
          <div className="schedule-btn" style={{backgroundColor: 'white'}}>
            <i className="fa fa-calendar" aria-hidden="true"></i>
            <p style={{ marginLeft: 10 }}>Schedule</p>
          </div>
        </div>
      </div>

      <Schedule />
      <RecentMessages />
    </div>
  );
}

export default Tutor;
