import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axiosInstance from "../../utils/Axios";
import {
  setLoading,
  setStudents,
  setTotalPages,
  setCurrentPage,
  setTotalStudent,
  setAssignedTutors,
} from "../slice/StudentSlice";
import { GET_API } from "../../utils/APIs";

const useStudent = () => {
  const token = sessionStorage.getItem("token");
  const dispatch = useDispatch();
  const {
    isLoading,
    students,
    totalPages,
    currentPage,
    totalStudent,
    assignedTutors,
  } = useSelector((state) => state.student);

  const fetchAssignedTutors = async () => {
    dispatch(setLoading(true));
    try {
      const response = await axiosInstance.get(GET_API().viewTutorAssigned, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setAssignedTutors(response.data.tutors));
    } catch (error) {
      console.error("Failed to fetch assigned tutors:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    isLoading,
    students,
    totalPages,
    currentPage,
    totalStudent,
    assignedTutors,
    fetchAssignedTutors,
  };
};

export default useStudent;
