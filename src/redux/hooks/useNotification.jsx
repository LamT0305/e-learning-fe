import { useDispatch, useSelector } from "react-redux";
import {
  setLoading,
  setNotifications,
  addNotification,
} from "../slice/NotificationSlice";
import axiosInstance from "../../utils/Axios";
import { GET_API } from "../../utils/APIs";
import { io } from "socket.io-client";
import { useEffect, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const socket = io("http://localhost:3000");

const useNotification = () => {
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("token");
  const { isLoading, notifications } = useSelector(
    (state) => state.notification
  );

  const listenerAdded = useRef()

  useEffect(() => {
    if (!token || listenerAdded.current) return;

    listenerAdded.current = true;

    const decodedToken = jwtDecode(token);
    const role_name = decodedToken.role_name;
    socket.emit("joinRoom", decodedToken.id);

    const handleNotification = (notification) => {
      dispatch(addNotification(notification.noti));

      // Show a real-time pop-up with a clickable link
      toast.info(
        <div
          onClick={() =>
            (window.location.href =
              role_name === "Student"
                ? "/view-student-schedules"
                : "/view-tutor-schedules")
          }
          style={{
            cursor: "pointer",
            color: "blue",
            textDecoration: "underline",
          }}
        >
          {notification.noti.content} - Click to view
        </div>,
        {
          position: "top-right",
          autoClose: 6000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    };

    socket.on("receiveNotification", handleNotification);

    return () => {
      socket.off("receiveNotification", handleNotification);
      listenerAdded.current = false;
    };
  }, [dispatch, token]);

  const handleGetNotifications = async () => {
    dispatch(setLoading(true));
    try {
      const res = await axiosInstance.get(GET_API().getNotifications, {
        headers: { Authorization: `Bearer ${token}  ` },
      });

      if (res.status === 200) {
        dispatch(setNotifications(res.data));
      }
    } catch (error) {}
    dispatch(setLoading(false));
  };

  return { isLoading, notifications, handleGetNotifications };
};

export default useNotification;
