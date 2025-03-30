import { useDispatch, useSelector } from "react-redux";
import {
  setLoading,
  setNotifications,
  addNotification,
  setDeleteNoti,
} from "../slice/NotificationSlice";
import axiosInstance from "../../utils/Axios";
import { DELETE_API, GET_API } from "../../utils/APIs";
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
  let alertShown = false;

  const listenerAdded = useRef(false);
  const socketReceivedNotifications = useRef(new Set());

  useEffect(() => {
    if (!token || listenerAdded.current) return;

    listenerAdded.current = true; // Ensure listener is added only once

    const decodedToken = jwtDecode(token);
    const role_name = decodedToken.role_name;
    socket.emit("joinRoom", decodedToken.id);

    const handleNotification = (notification) => {
      if (socketReceivedNotifications.current.has(notification.noti._id))
        return;

      socketReceivedNotifications.current.add(notification.noti._id);

      const exists = notifications.some(
        (noti) => noti._id === notification.noti._id
      );

      if (!exists) {
        dispatch(addNotification(notification.noti));

        // Show toast only if the user is NOT on the notifications page
        if (window.location.pathname !== "/notifications") {
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
              {notification.noti.title} - Click to view
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
        }
      }
    };

    const handleNotificationBlog = (notification) => {
      if (socketReceivedNotifications.current.has(notification.noti._id))
        return;

      socketReceivedNotifications.current.add(notification.noti._id);

      const exists = notifications.some(
        (noti) => noti._id === notification.noti._id
      );

      if (!exists) {
        dispatch(addNotification(notification.noti));

        // Show toast only if the user is NOT on the notifications page
        if (window.location.pathname !== "/notifications") {
          toast.info(
            <div
              onClick={() => (window.location.href = "/view-blog-request")}
              style={{
                cursor: "pointer",
                color: "blue",
                textDecoration: "underline",
              }}
            >
              {notification.noti.title} - Click to view
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
        }
      }
    };
    socket.on("receiveNotification", handleNotification);

    socket.on("receiveNotiUploadBlog", handleNotificationBlog);

    const handleNotiBlog = (notification) => {
      if (socketReceivedNotifications.current.has(notification.noti._id))
        return;

      socketReceivedNotifications.current.add(notification.noti._id);

      const exists = notifications.some(
        (noti) => noti._id === notification.noti._id
      );

      console.log(notification);
      // if (!exists) {
      //   dispatch(addNotification(notification.noti));

      //   if (window.location.pathname !== "/notifications") {
      //     toast.info(
      //       <div
      //         onClick={() => (window.location.href = "/view-blog-request")}
      //         style={{
      //           cursor: "pointer",
      //           color: "blue",
      //           textDecoration: "underline",
      //         }}
      //       >
      //         {notification.noti.title} - Click to view
      //       </div>,
      //       {
      //         position: "top-right",
      //         autoClose: 6000,
      //         hideProgressBar: false,
      //         closeOnClick: true,
      //         pauseOnHover: true,
      //         draggable: true,
      //       }
      //     );
      //   }
      // }
    };

    socket.on("receiveNotiBlogApproval", handleNotiBlog);
    return () => {
      socket.off("receiveNotification", handleNotification);
      socket.off("receiveNotiUploadBlog", handleNotificationBlog);
      socket.off("receiveNotiBlogApproval", handleNotiBlog);
      listenerAdded.current = false;
    };
  }, [dispatch, token, notifications]);

  const handleGetNotifications = async () => {
    dispatch(setLoading(true));
    try {
      const res = await axiosInstance.get(GET_API().getNotifications, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 200) {
        const uniqueNotifications = res.data.filter(
          (noti) =>
            !notifications.some((existingNoti) => existingNoti._id === noti._id)
        );

        if (uniqueNotifications.length > 0) {
          dispatch(
            setNotifications([...notifications, ...uniqueNotifications])
          );
        }
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
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

  const handleDeleteNoti = async (id) => {
    dispatch(setLoading(true));
    try {
      const res = await axiosInstance.delete(
        DELETE_API(id).deleteNotifications,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        dispatch(setDeleteNoti(id));
        toast.info(
          <div
            style={{
              cursor: "pointer",
              color: "blue",
              textDecoration: "underline",
            }}
          >
            <p>Deleted notification successfully!</p>
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
      }
    } catch (error) {
      console.error("Error deleting notifications:", error);
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

  return { isLoading, notifications, handleGetNotifications, handleDeleteNoti };
};

export default useNotification;
