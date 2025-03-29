import { useDispatch, useSelector } from "react-redux";
import {
  setLoading,
  setSchedules,
  setFilter,
  setCurrentPage,
  setUpdateSchedule,
  cancelSchedule,
  setFeedback,
} from "../slice/ScheduleSlice";
import axiosInstance from "../../utils/Axios";
import { GET_API, POST_API, PUT_API } from "../../utils/APIs";
import { message } from "antd";

const useSchedule = () => {
  const {
    isLoading,
    schedules,
    filteredSchedules,
    currentPage,
    itemsPerPage,
    totalPages,
    filter,
  } = useSelector((state) => state.schedule);

  const dispatch = useDispatch();
  const token = sessionStorage.getItem("token");
  const userRole = sessionStorage.getItem("role");
  let alertShown = false;

  const handleTutorGetSchedules = async () => {
    dispatch(setLoading(true));
    try {
      const res = await axiosInstance.get(GET_API().viewTutorSchedule, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        dispatch(setSchedules(res.data.schedules));
      }
    } catch (error) {
      console.log(error);
      handleTokenError(error);
    }
    dispatch(setLoading(false));
  };

  const handleStudentGetSchedules = async () => {
    dispatch(setLoading(true));
    try {
      const res = await axiosInstance.get(GET_API().viewStudentSchedule, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        dispatch(setSchedules(res.data.schedules));
      }
    } catch (error) {
      console.log(error);
      handleTokenError(error);
    }
    dispatch(setLoading(false));
  };

  const handleCreateSchedule = async (scheduleData) => {
    if (userRole !== "tutor") {
      alert("Only tutors can create schedules");
      return;
    }
    dispatch(setLoading(true));
    try {
      const res = await axiosInstance.post(
        POST_API().createSchedule,
        scheduleData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.status === 201) {
        handleTutorGetSchedules();
        message.success("Schedule created successfully");
      }
    } catch (error) {
      console.log(error);
      handleTokenError(error);
    }
    dispatch(setLoading(false));
  };

  const handleUpdateStatus = async (id, status) => {
    dispatch(setLoading(true));
    try {
      const res = await axiosInstance.put(
        PUT_API(id).updateSchedule,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.status === 200) {
        dispatch(setUpdateSchedule({ id, status }));
      }
    } catch (error) {
      console.log(error);
      message.error(error.response.data.message);
      handleTokenError(error);
    }
    dispatch(setLoading(false));
  };

  const handleCancelSchedule = async (id, reason) => {
    dispatch(setLoading(true));
    try {
      const res = await axiosInstance.put(
        PUT_API(id).updateSchedule,
        { status: "cancelled", reason },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.status === 200) {
        dispatch(cancelSchedule({ id, reason }));
      }
    } catch (error) {
      console.log(error);
      handleTokenError(error);
    }
    dispatch(setLoading(false));
  };

  const handleAddFeedback = async (scheduleId, rating, comment) => {
    if (userRole !== "Student") {
      alert("Only students can provide feedback");
      return;
    }
    dispatch(setLoading(true));
    try {
      const res = await axiosInstance.post(
        POST_API(scheduleId).addFeedback,
        { rating, comment },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.status === 200) {
        dispatch(setFeedback({ scheduleId, rating, comment }));
      }
    } catch (error) {
      console.log(error);
      handleTokenError(error);
    }
    dispatch(setLoading(false));
  };

  const handleFilterChange = (newFilter) => {
    dispatch(setFilter(newFilter));
  };

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  const handleTokenError = (error) => {
    if (error.response?.data?.message === "Invalid token!" && !alertShown) {
      alertShown = true;
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("isAuthenticated");
      window.location.href = "/";
      alert("Session expired! Please login again.");
    }
  };

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredSchedules.slice(startIndex, endIndex);
  };

  return {
    isLoading,
    schedules: getCurrentPageData(),
    totalPages,
    currentPage,
    filter,
    handleTutorGetSchedules,
    handleStudentGetSchedules,
    handleCreateSchedule,
    handleUpdateStatus,
    handleCancelSchedule,
    handleAddFeedback,
    handleFilterChange,
    handlePageChange,
  };
};

export default useSchedule;
