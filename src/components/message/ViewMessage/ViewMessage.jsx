import React from "react";
import "./style.css";
import avt from "../../../assets/avt.jpg";

const messages = [
  {
    _id: "67a38568811f36cfbccd86fb",
    sender_id: { _id: "679480e8824268d08507a9b3", name: "Joe Lam" },
    receiver_id: {
      _id: "6794894097b1b5b9a9dc0c0b",
      name: "Tyson Tutor Corztera",
    },
    content: "This is update message",
    created_at: "2025-02-05T15:36:08.293Z",
    __v: 0,
  },
  {
    _id: "67b1dda0ace75f720300b2e0",
    sender_id: {
      _id: "6794894097b1b5b9a9dc0c0b",
      name: "Tyson Tutor Corztera",
    },
    receiver_id: { _id: "679480e8824268d08507a9b3", name: "Joe Lam" },
    content: "Helo 1",
    created_at: "2025-02-16T12:44:16.775Z",
    __v: 0,
  },
  {
    _id: "67b1dda6ace75f720300b2e3",
    sender_id: {
      _id: "6794894097b1b5b9a9dc0c0b",
      name: "Tyson Tutor Corztera",
    },
    receiver_id: { _id: "679480e8824268d08507a9b3", name: "Joe Lam" },
    content: "Helo 2",
    created_at: "2025-02-16T12:44:22.204Z",
    __v: 0,
  },
  {
    _id: "67b1e375ace75f720300b2e9",
    sender_id: {
      _id: "6794894097b1b5b9a9dc0c0b",
      name: "Tyson Tutor Corztera",
    },
    receiver_id: {
      _id: "679480e8824268d08507a9b3",
      name: "Joe Lam",
    },
    content: "Helo 3",
    created_at: "2025-02-16T13:09:09.992Z",
    __v: 0,
  },
  {
    _id: "67b1e37aace75f720300b2ec",
    sender_id: {
      _id: "6794894097b1b5b9a9dc0c0b",
      name: "Tyson Tutor Corztera",
    },
    receiver_id: {
      _id: "679480e8824268d08507a9b3",
      name: "Joe Lam",
    },
    content: "Helo 4",
    created_at: "2025-02-16T13:09:14.696Z",
    __v: 0,
  },
];

function ViewMessage() {
  return (
    <div className="message-list">
      <div className="user-info">
        <img
          src={avt}
          alt="avt"
          className="avt"
          width={46}
          height={46}
          style={{ borderRadius: "50%" }}
        />
        <p>Nguyen A</p>
      </div>
      <div className="ms-content">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`message-v ${
              message.sender_id._id === "6794894097b1b5b9a9dc0c0b"
                ? "sent"
                : "received"
            }`}
          >
            <div className="" style={{ display: "flex", alignItems: "center" }}>
              {message.sender_id._id !== "6794894097b1b5b9a9dc0c0b" ? (
                <img
                  src={avt}
                  alt="avt"
                  className="avt"
                  width={36}
                  height={36}
                  style={{ borderRadius: "50%" }}
                />
              ) : null}
              <div className="message-content" style={{ marginRight: 10 }}>
                {message.content}
              </div>
              <div className="timestamp">
                {new Date(message.created_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        ))}

        {/* input */}
        <div className="message-input">
          <input type="text" placeholder="Write a message" />
          <div
            style={{
              color: "blue",
              padding: 8,
              fontSize: 20,
              cursor: "pointer",
            }}
          >
            <i className="fa fa-paper-plane" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewMessage;
