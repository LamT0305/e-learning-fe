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
import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { jwtDecode } from "jwt-decode";

const generateConversationId = (userId1, userId2) => {
  return [userId1, userId2].sort().join("_");
};

const useMessage = () => {
  const { users, messages, isLoading } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("token");
  const alertShown = useRef(false);
  const navigate = useNavigate();
  const socketRef = useRef(null);

  useEffect(() => {
    if (!token) return;

    socketRef.current = io("http://localhost:3000", {
      withCredentials: true,
    });

    const socket = socketRef.current;
    const decodedToken = jwtDecode(token);

    socket.emit("joinRoom", decodedToken.id);

    socket.on("receiveMessage", (message) => {
      if (message?.sender?._id !== decodedToken.id) {
        dispatch(addMessage(message));
        handleGetUsers();
      }
    });
    socket.on("refreshUserList", () => {
      handleGetUsers();
    });

    socket.on("messageUpdated", (updatedMessage) => {
      dispatch(updateMessage(updatedMessage));
    });

    socket.on("messageDeleted", ({ messageId }) => {
      dispatch(deleteMessage(messageId));
    });

    return () => {
      if (socket) {
        socket.emit("leaveRoom", decodedToken.id);
        socket.off("receiveMessage");
        socket.off("messageUpdated");
        socket.off("messageDeleted");
        socket.off("refreshUserList");
        socket.disconnect();
      }
    };
  }, [token]);

  const handleError = (error) => {
    console.error("Operation failed:", error);
    if (
      error.response?.data?.message === "Invalid token!" &&
      !alertShown.current
    ) {
      alertShown.current = true;
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("isAuthenticated");
      navigate("/");
      window.location.reload();
      alert("Session expired! Please login again.");
    }
  };

  const handleGetUsers = async () => {
    if (!token) return;
    dispatch(setLoading(true));
    try {
      const res = await axiosInstance.get(GET_API().getListOfMessengers, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 200) {
        dispatch(setUsers(res.data.conversations));
      }
    } catch (error) {
      handleError(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGetConversationBetweenUsers = async (userId) => {
    if (!token || !userId) return;
    dispatch(setLoading(true));
    try {
      const decodedToken = jwtDecode(token);
      const conversationId = generateConversationId(decodedToken.id, userId);
      socketRef.current?.emit("joinRoom", conversationId);

      const res = await axiosInstance.get(
        GET_API(userId, 0, 0).getMessagesBetweenUsers,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 200 && res.data.success) {
        dispatch(setMessages(res.data.data));
      }
    } catch (error) {
      handleError(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSendMessage = async (receiverId, content) => {
    if (!token || !receiverId || !content.trim()) return;
    try {
      const formData = new FormData();
      formData.append("content", content);
      formData.append("receiver", receiverId);

      const res = await axiosInstance.post(POST_API().sendMessage, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 201) {
        const decodedToken = jwtDecode(token);
        const conversationId = generateConversationId(
          decodedToken.id,
          receiverId
        );
        dispatch(addMessage(res.data.data));
        socketRef.current?.emit("sendMessage", {
          ...res.data.data,
          conversationId,
        });
        handleGetUsers();
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleUpdateMessage = async (messageId, content) => {
    if (!token || !messageId || !content.trim()) return;
    try {
      const res = await axiosInstance.put(
        PUT_API(messageId).updateMessage,
        { content },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 200) {
        dispatch(updateMessage(res.data.data));
        socketRef.current?.emit("updateMessage", res.data.data);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleDeleteMessage = async (messageId, senderId, receiverId) => {
    if (!token || !messageId) return;
    try {
      const res = await axiosInstance.delete(
        DELETE_API(messageId).deleteMessage,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.status === 200) {
        dispatch(deleteMessage(messageId));
        socketRef.current?.emit("deleteMessage", { messageId });
      }
    } catch (error) {
      handleError(error);
    }
  };

  return {
    usersMessage: users,
    messages,
    isLoading,
    handleGetUsers,
    handleGetConversationBetweenUsers,
    handleSendMessage,
    handleUpdateMessage,
    handleDeleteMessage,
  };
};

export default useMessage;
