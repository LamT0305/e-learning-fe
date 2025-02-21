import { useDispatch, useSelector } from "react-redux";
import {
  setLoading,
  setUsers,
  setMessages,
  updateMessage,
  deleteMessage,
  addMessage,
} from "../slice/MessageSlice";
import { DELETE_API, GET_API, POST_API, PUT_API } from "../../utils/APIs";
import axiosInstance from "../../utils/Axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { jwtDecode } from "jwt-decode";

const socket = io("http://localhost:3000");

const generateConversationId = (userId1, userId2) => {
  return [userId1, userId2].sort().join("_"); // Ensures both users join the same room
};

const useMessage = () => {
  const { users, messages, isLoading } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("token");
  let alertShown = false;
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;

    const decodedToken = jwtDecode(token);
    socket.emit("joinRoom", decodedToken.id); // Join general room for notifications

    // Listen for real-time message events
    socket.on("receiveMessage", (message) => {
      dispatch(addMessage(message));
    });

    socket.on("updateMessage", (updatedMessage) => {
      dispatch(updateMessage(updatedMessage));
    });

    socket.on("deleteMessage", ({ id }) => {
      dispatch(deleteMessage(id));
    });

    socket.on("updateUserList", () => {
      handleGetUsers(); 
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("updateMessage");
      socket.off("deleteMessage");
      socket.off("updateUserList");
    };
  }, []);

  const handleGetUsers = async () => {
    dispatch(setLoading(true));
    try {
      const res = await axiosInstance.get(GET_API().getListOfMessengers, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        dispatch(setUsers(res.data));
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.message === "Invalid token!" && !alertShown) {
        alertShown = true;
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("isAuthenticated");
        navigate("/");
        window.location.reload();
        alert("Session expired! Please login again.");
      }
    }
    dispatch(setLoading(false));
  };

  const handleGetConversationBetweenUsers = async (userId) => {
    dispatch(setLoading(true));
    try {
      const res = await axiosInstance.get(
        GET_API(userId, 0, 0).getMessagesBetweenUsers,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status === 200) {
        dispatch(setMessages(res.data));
        const decodedToken = jwtDecode(token);
        const conversationId = generateConversationId(decodedToken.id, userId);
        socket.emit("joinRoom", conversationId); // Join correct conversation room
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.message === "Invalid token!" && !alertShown) {
        alertShown = true;
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("isAuthenticated");
        navigate("/");
        window.location.reload();
        alert("Session expired! Please login again.");
      }
    }
    dispatch(setLoading(false));
  };

  const handleSendMessage = async (receiverId, content) => {
    try {
      const formData = new FormData();
      formData.append("content", content);
      formData.append("receiver_id", receiverId);
      await axiosInstance.post(POST_API().sendMessage, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log("Failed to send message:", error);
      if (error.response.data.message === "Invalid token!" && !alertShown) {
        alertShown = true;
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("isAuthenticated");
        navigate("/");
        window.location.reload();
        alert("Session expired! Please login again.");
      }
    }

    const decodedToken = jwtDecode(token);
    const created_at = new Date().toISOString();
    const conversationId = generateConversationId(decodedToken.id, receiverId);

    socket.emit("sendMessage", {
      sender_id: decodedToken.id,
      receiver_id: receiverId,
      content,
      created_at,
      conversationId, // Include room ID for real-time updates
    });
  };

  const handleUpdateMessage = async (messageId, content) => {
    try {
      await axiosInstance.put(
        PUT_API(messageId).updateMessage,
        { content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Emit update event to WebSocket
      socket.emit("updateMessage", { id: messageId, content });
    } catch (error) {
      console.log("Failed to update message:", error);
    }
  };

  const handleDeleteMessage = async (messageId, x, y) => {
    try {
      // console.log(messageId)
      // console.log(x)
      // console.log(y)
      await axiosInstance.delete(DELETE_API(messageId).deleteMessage, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Emit delete event to WebSocket
      socket.emit("deleteMessage", { id: messageId });
    } catch (error) {
      console.log("Failed to delete message:", error);
    }
  };

  return {
    users,
    messages,
    handleGetUsers,
    handleGetConversationBetweenUsers,
    handleSendMessage,
    handleUpdateMessage,
    handleDeleteMessage,
  };
};

export default useMessage;
