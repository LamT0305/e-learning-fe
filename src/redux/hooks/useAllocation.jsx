import { useDispatch, useSelector } from "react-redux";
import {
  setLoading,
  setError,
  setAllocatedStudents,
  setAllocatedTutors,
  clearError,
} from "../slice/AllocationSlice";
import axiosInstance from "../../utils/Axios";
import { GET_API, POST_API, DELETE_API } from "../../utils/APIs";

const useAllocation = () => {
  const dispatch = useDispatch();
  const { isLoading, allocations, allocatedStudents, allocatedTutors, error } =
    useSelector((state) => state.allocation);

  const token = sessionStorage.getItem("token");

  const fetchAllocatedStudents = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axiosInstance.get(GET_API().viewStudentAssigned, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setAllocatedStudents(response.data.students));
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message || "Failed to fetch allocated students"
        )
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  const fetchAllocatedTutors = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axiosInstance.get(GET_API().viewTutorAssigned, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setAllocatedTutors(response.data.tutors));
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message || "Failed to fetch allocated tutors"
        )
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleError = () => {
    dispatch(clearError());
  };

  return {
    isLoading,
    allocations,
    allocatedStudents,
    allocatedTutors,
    error,
    fetchAllocatedStudents,
    fetchAllocatedTutors,
    handleError,
  };
};

export default useAllocation;
