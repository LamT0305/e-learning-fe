import { useDispatch, useSelector } from "react-redux";
import {
  setLoading,
  setNotifications,
  addNotification,
  setDeleteNoti,
} from "../slice/NotificationSlice";
import axiosInstance from "../../utils/Axios";
import { DELETE_API, GET_API } from "../../utils/APIs";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useNotification = () => {
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("token");
  const { isLoading, notifications } = useSelector(
    (state) => state.notification
  );
  let alertShown = false;

  const handleTokenError = (error) => {
    if (error.response?.data?.message === "Invalid token!" && !alertShown) {
      alertShown = true;
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("isAuthenticated");
      window.location.href = "/";
      alert("Session expired! Please login again.");
    }
  };

  const handleGetNotifications = async () => {
    dispatch(setLoading(true));
    try {
      const res = await axiosInstance.get(GET_API().getNotifications, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 200) {
        console.log(res.data.notifications);
        dispatch(setNotifications(res.data.notifications));
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
      handleTokenError(error);
    }
    dispatch(setLoading(false));
  };

  const handleDeleteNoti = async (id) => {
    dispatch(setLoading(true));
    try {
      const res = await axiosInstance.delete(
        DELETE_API(id).deleteNotifications,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.status === 200) {
        dispatch(setDeleteNoti(id));
        toast.success("Deleted notification successfully!");
      }
    } catch (error) {
      console.error("Error deleting notifications:", error);
      handleTokenError(error);
    }
    dispatch(setLoading(false));
  };

  return { isLoading, notifications, handleGetNotifications, handleDeleteNoti };
};

export default useNotification;
