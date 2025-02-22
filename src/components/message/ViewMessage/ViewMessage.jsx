import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import avt from "../../../assets/avt.jpg";
import useMessage from "../../../redux/hooks/useMessage";
import useAuth from "../../../redux/hooks/useAuth";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000"); // Ensure WebSocket is initialized

function ViewMessage({ id, name }) {
  const {
    messages,
    handleGetConversationBetweenUsers,
    handleSendMessage,
    handleUpdateMessage,
    handleDeleteMessage,
  } = useMessage();
  const { user, handleGetUser } = useAuth();
  const [newMessage, setNewMessage] = useState("");
  const [editingMessageId, setEditingMessageId] = useState(null); // Track editing message

  const generateConversationId = (userId1, userId2) => {
    return [userId1, userId2].sort().join("_"); // Ensures consistent ordering
  };

  useEffect(() => {
    if (id && user?.user_id?._id) {
      const conversationId = generateConversationId(user.user_id._id, id);
      socket.emit("joinRoom", conversationId);
      handleGetConversationBetweenUsers(id);
    }
    handleGetUser();
  }, [id, user]); // Ensure it updates when `id` or `user` changes

  // Handle Send or Update Message
  const _handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === "" || !id) return;

    if (editingMessageId) {
      // If editing, update the message
      handleUpdateMessage(editingMessageId, newMessage);
      setEditingMessageId(null);
    } else {
      // Otherwise, send a new message
      handleSendMessage(id, newMessage);
    }
    setNewMessage(""); // Clear input
  };

  // Handle Edit Click
  const _handleEditMessage = (messageId, content) => {
    setEditingMessageId(messageId);
    setNewMessage(content); // Populate input with message content
  };

  const bottomRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const checkIfAtBottom = () => {
    if (messagesEndRef.current) {
      const { scrollHeight, scrollTop, clientHeight } = messagesEndRef.current;
      setIsAtBottom(scrollHeight - scrollTop === clientHeight);
    }
  };

  useEffect(() => {
    // Check if user is at the bottom every time the component is mounted or updated
    checkIfAtBottom();

    // Scroll to the bottom if user is at the bottom
    if (isAtBottom && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isAtBottom]);
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
        <p>{name ? name : "Unknown"}</p>
      </div>
      <div className="ms-content">
        <div
          className="ms-content-listms"
          ref={messagesEndRef}
          onScroll={checkIfAtBottom}
        >
          {messages.map((message, index) => (
            <div
              key={message._id || index}
              className={`message-v ${
                String(message.sender_id._id || message.sender_id) ===
                String(user.user_id?._id)
                  ? "sent"
                  : "received"
              } ${message.sender_id._id}`}
            >
              <div
                className=""
                style={{ display: "flex", alignItems: "center" }}
              >
                {String(message.sender_id._id || message.sender_id) !==
                String(user.user_id?._id) ? (
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

                {String(message.sender_id._id || message.sender_id) ===
                String(user.user_id?._id) ? (
                  <div
                    className="message-actions"
                    style={{
                      marginLeft: 10,
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
                    <button
                      style={{ padding: 5 }}
                      onClick={() =>
                        _handleEditMessage(message._id, message.content)
                      }
                    >
                      <i className="fa fa-edit"></i>
                    </button>
                    <button
                      style={{ padding: 5 }}
                      onClick={() =>
                        handleDeleteMessage(
                          message._id,
                          message.sender_id,
                          user.user_id?._id
                        )
                      }
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          ))}
          {/* Add this div to scroll to */}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="message-input">
          <input
            type="text"
            placeholder="Write a message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <div
            style={{
              color: "blue",
              padding: 8,
              fontSize: 20,
              cursor: "pointer",
            }}
          >
            <i
              className={`fa ${
                editingMessageId ? "fa-check" : "fa-paper-plane"
              }`}
              aria-hidden="true"
              onClick={(e) => _handleSendMessage(e)}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewMessage;
