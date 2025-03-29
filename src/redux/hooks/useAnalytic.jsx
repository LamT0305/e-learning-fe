import { useDispatch, useSelector } from "react-redux";
import { GET_API } from "../../utils/APIs";
import axiosInstance from "../../utils/Axios";
import {
  setLoading,
  setError,
  setStudentAnalytics,
  setOverallAnalytics,
  clearAnalytics,
} from "../slice/AnalyticSlice";

const useAnalytic = () => {
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("token");
  const { isLoading, studentAnalytics, overallAnalytics, error } = useSelector(
    (state) => state.analytic
  );

  const handleGetStudentAnalytics = async (studentId) => {
    dispatch(setLoading(true));
    try {
      const response = await axiosInstance.get(
        GET_API(studentId).getStudentAnalytics,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(setStudentAnalytics(response.data.analytics));
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message || "Failed to fetch student analytics"
        )
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGetOverallAnalytics = async () => {
    dispatch(setLoading(true));
    try {
      const response = await axiosInstance.get(GET_API().getAnalyticOverall, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setOverallAnalytics(response.data.analytics));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch overall analytics";
      console.error("Error fetching overall analytics:", errorMessage); // Log error for debugging
      dispatch(setError(errorMessage));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleClearAnalytics = () => {
    dispatch(clearAnalytics());
  };

  return {
    isLoading,
    studentAnalytics,
    overallAnalytics,
    error,
    handleGetStudentAnalytics,
    handleGetOverallAnalytics,
    handleClearAnalytics,
  };
};

export default useAnalytic;
