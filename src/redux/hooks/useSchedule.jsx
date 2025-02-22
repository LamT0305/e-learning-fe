import { useDispatch, useSelector } from "react-redux";
import {
  setLoading,
  setSchedules,
  setTotalPages,
} from "../slice/ScheduleSlice";
import axiosInstance from "../../utils/Axios";
import { GET_API, POST_API } from "../../utils/APIs";

const useSchedule = () => {
  const { isLoading, schedules, totalPages } = useSelector(
    (state) => state.schedule
  );
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("token");
  let alertShown = false;

  const handleGetSchedules = async (status, page) => {
    dispatch(setLoading(true));
    try {
      const res = await axiosInstance.post(
        POST_API().filterScheduleByStatus,
        { status, page },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        dispatch(setSchedules(res.data.schedules));
        dispatch(setTotalPages(res.data.totalPages));
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

  return {
    isLoading,
    schedules,
    totalPages,
    handleGetSchedules,
  };
};

export default useSchedule;
