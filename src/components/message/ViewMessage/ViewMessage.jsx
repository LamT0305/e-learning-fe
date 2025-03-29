import React, { useEffect, useRef, useState, memo } from "react";
import avt from "../../../assets/avt.jpg";
import useMessage from "../../../redux/hooks/useMessage";
import useAuth from "../../../redux/hooks/useAuth";

const MessageItem = memo(({ message, currentUserId, onEdit, onDelete }) => {
  const [showActions, setShowActions] = useState(false);
  const isSentByUser =
    String(message?.sender?._id || message?.sender) === String(currentUserId);
  const actionsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (actionsRef.current && !actionsRef.current.contains(event.target)) {
        setShowActions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`flex ${isSentByUser ? "justify-end" : "justify-start"} mb-4`}
    >
      <div
        className={`flex items-start max-w-[70%] ${
          isSentByUser ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {!isSentByUser && (
          <img src={avt} alt="avatar" className="w-8 h-8 rounded-full mr-2" />
        )}
        <div
          className={`flex flex-col ${
            isSentByUser ? "items-end" : "items-start"
          }`}
        >
          <div
            className={`px-4 py-2 rounded-2xl ${
              isSentByUser
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            <p className="text-sm">{message?.content}</p>
          </div>
          <div className="flex items-center mt-1">
            <span className="text-xs text-gray-500">
              {new Date(message?.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            {isSentByUser && (
              <div className="relative ml-2" ref={actionsRef}>
                <div
                  onClick={() => setShowActions(!showActions)}
                  className="cursor-pointer p-1 text-gray-500 hover:text-gray-700"
                >
                  <i className="fas fa-ellipsis-h text-xs" />
                </div>
                {showActions && (
                  <div className="absolute bottom-full right-0 mb-1 bg-white shadow-lg rounded-lg py-1 min-w-[100px] z-10">
                    <div
                      onClick={() => {
                        onEdit(message);
                        setShowActions(false);
                      }}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                    >
                      <i className="fas fa-edit text-xs text-blue-500 mr-2" />
                      <span className="text-sm">Edit</span>
                    </div>
                    <div
                      onClick={() => {
                        onDelete(message);
                        setShowActions(false);
                      }}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                    >
                      <i className="fas fa-trash text-xs text-red-500 mr-2" />
                      <span className="text-sm">Delete</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

const ViewMessage = memo(({ id, name }) => {
  const {
    messages,
    handleGetConversationBetweenUsers,
    handleSendMessage,
    handleUpdateMessage,
    handleDeleteMessage,
  } = useMessage();
  const { user, handleGetUser } = useAuth();
  const [newMessage, setNewMessage] = useState("");
  const [editingMessageId, setEditingMessageId] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const initializeChat = async () => {
      if (!id || !user?._id) return;
      if (isMounted) {
        await handleGetConversationBetweenUsers(id);
      }
    };

    handleGetUser();
    initializeChat();

    return () => {
      isMounted = false;
    };
  }, [id, user?._id]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim() === "" || !id || !user?._id) return;

    if (editingMessageId) {
      handleUpdateMessage(editingMessageId, newMessage);
      setEditingMessageId(null);
    } else {
      handleSendMessage(id, newMessage);
    }
    setNewMessage("");
  };

  const handleEditMessage = (message) => {
    if (!message?._id || !user?._id) return;
    setEditingMessageId(message._id);
    setNewMessage(message.content);
  };

  const handleMessageDelete = (message) => {
    if (!message?._id || !message?.sender?._id || !user?._id) return;
    handleDeleteMessage(message._id, message.sender._id, user._id);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleMessageSubmit(e);
    }
  };

  if (!user?._id) return null;

  return (
    <div className="w-[80%] h-full flex flex-col bg-white">
      <div className="h-16 border-b flex items-center px-6">
        <img src={avt} alt="avatar" className="w-10 h-10 rounded-full" />
        <div className="ml-4">
          <h3 className="font-semibold text-gray-800">{name || "Unknown"}</h3>
          <p className="text-xs text-gray-500">Active now</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto px-6 py-4" ref={messagesEndRef}>
          {messages?.map((message) => (
            <MessageItem
              key={message?._id}
              message={message}
              currentUserId={user._id}
              onEdit={handleEditMessage}
              onDelete={handleMessageDelete}
            />
          ))}
        </div>

        <div className="border-t p-4">
          <form
            onSubmit={handleMessageSubmit}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="!py-2 px-4 !rounded-xl !bg-blue-500 !text-white hover:!bg-blue-600 !transition-colors"
            >
              <i
                className={`fas ${
                  editingMessageId ? "fa-check" : "fa-paper-plane"
                }`}
              />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
});

export default ViewMessage;
