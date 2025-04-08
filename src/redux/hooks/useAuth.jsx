import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../slice/AuthSlice";
import axiosInstance from "../../utils/Axios";
import { GET_API, POST_API, PUT_API } from "../../utils/APIs";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const useAuth = () => {
  const { isLoading, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let alertShown = false;
  const token = sessionStorage.getItem("token");

  const handleLogin = async (form) => {
    dispatch(setLoading(true));
    try {
      const response = await axiosInstance.post(POST_API().login, form);
      if (response.status === 200) {
        console.log(response.data);
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("isAuthenticated", true);
        dispatch(setUser(response.data.user));
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      message.error("Invalid email or password");
    }
    dispatch(setLoading(false));
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("role");
    dispatch(setUser(null));
    navigate("/");
    window.location.reload();
  };

  const handleGetUser = async () => {
    dispatch(setLoading(true));
    try {
      const response = await axiosInstance.get(GET_API().getUserProfile, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        dispatch(setUser(response.data.user));
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.message === "Invalid token!" && !alertShown) {
        alertShown = true;
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("isAuthenticated");
        window.location.reload();
        alert("Session expired! Please login again.");
      }
    }
    dispatch(setLoading(false));
  };

  const handleUpdateUser = async (form) => {
    dispatch(setLoading(true));
    try {
      const res = await axiosInstance.put(PUT_API().updateProfile, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        dispatch(setUser(res.data.user));
        message.success("Profile updated successfully");
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoading(false));
  };

  return {
    isLoading,
    user,
    handleLogin,
    handleLogout,
    handleGetUser,
    handleUpdateUser,
  };
};

export default useAuth;
