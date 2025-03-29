import { useDispatch, useSelector } from "react-redux";
import {
  setLoading,
  setTutors,
  setStudents,
  setAllocations,
  setDashboardStats,
  addAllocation,
  removeAllocation,
  addTutor,
  updateTutor,
  removeTutor,
  addStudent,
  updateStudent,
  removeStudent,
} from "../slice/StaffSlice";
import axiosInstance from "../../utils/Axios";
import { GET_API, POST_API, DELETE_API, PUT_API } from "../../utils/APIs";
import { message } from "antd";

const useStaff = () => {
  const token = sessionStorage.getItem("token");
  const dispatch = useDispatch();
  const { isLoading, tutors, students, allocations, dashboardStats } =
    useSelector((state) => state.staff);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchTutors = async () => {
    dispatch(setLoading(true));
    try {
      const response = await axiosInstance.get(GET_API().getAllTutors, config);
      if (response.status === 200) {
        dispatch(setTutors(response.data.tutors));
      }
    } catch (error) {
      message.error("Failed to fetch tutors");
      console.error(error);
    }
    dispatch(setLoading(false));
  };

  const fetchStudents = async () => {
    dispatch(setLoading(true));
    try {
      const response = await axiosInstance.get(
        GET_API().getAllStudents,
        config
      );
      if (response.status === 200) {
        dispatch(setStudents(response.data.students));
      }
    } catch (error) {
      message.error("Failed to fetch students");
      console.error(error);
    }
    dispatch(setLoading(false));
  };

  const fetchAllocations = async () => {
    dispatch(setLoading(true));
    try {
      const response = await axiosInstance.get(
        GET_API().viewAllocations,
        config
      );
      if (response.status === 200) {
        dispatch(setAllocations(response.data.allocations));
      }
    } catch (error) {
      message.error("Failed to fetch allocations");
      console.error(error);
    }
    dispatch(setLoading(false));
  };

  const createAllocation = async (data) => {
    dispatch(setLoading(true));
    try {
      const response = await axiosInstance.post(
        POST_API().allocateTutors,
        data,
        config
      );
      console.log(response.data.allocations);
      if (response.status === 200) {
        message.success("Allocation created successfully");
        fetchAllocations();
      }
    } catch (error) {
      message.error(
        error.response?.data?.message || "Failed to create allocation"
      );
      console.error(error);
    }
    dispatch(setLoading(false));
  };

  const deleteAllocation = async (id) => {
    dispatch(setLoading(true));
    try {
      const response = await axiosInstance.delete(
        DELETE_API(id).deleteAllocation,
        config
      );
      if (response.status === 200) {
        message.success("Allocation deleted successfully");
        dispatch(removeAllocation(id));
      }
    } catch (error) {
      message.error("Failed to delete allocation");
      console.error(error);
    }
    dispatch(setLoading(false));
  };

  // Tutor Operations
  const createTutor = async (data) => {
    dispatch(setLoading(true));
    try {
      const response = await axiosInstance.post(
        POST_API().createTutor,
        data,
        config
      );
      if (response.status === 201) {
        dispatch(addTutor(response.data.tutor));
      }
      dispatch(setLoading(false));
    } catch (error) {
      message.error(error.response?.data?.message || "Failed to create tutor");
      console.error(error);
      dispatch(setLoading(false));
    }
  };

  const editTutor = async (id, data) => {
    dispatch(setLoading(true));
    try {
      const response = await axiosInstance.put(
        PUT_API(id).updateTutor,
        data,
        config
      );
      if (response.status === 200) {
        dispatch(updateTutor(response.data.tutor));
      }
    } catch (error) {
      message.error(error.response?.data?.message || "Failed to update tutor");
      console.error(error);
    }
    dispatch(setLoading(false));
  };

  const deleteTutor = async (id) => {
    dispatch(setLoading(true));
    try {
      const response = await axiosInstance.delete(
        DELETE_API(id).deleteTutor,
        config
      );
      if (response.status === 200) {
        dispatch(removeTutor(id));
      }
    } catch (error) {
      message.error("Failed to delete tutor");
      console.error(error);
    }
    dispatch(setLoading(false));
  };

  // Student Operations
  const createStudent = async (data) => {
    dispatch(setLoading(true));
    try {
      const response = await axiosInstance.post(
        POST_API().createStudent,
        data,
        config
      );
      if (response.status === 201) {
        dispatch(addStudent(response.data.student));
      }
    } catch (error) {
      message.error(
        error.response?.data?.message || "Failed to create student"
      );
      console.error(error);
    }
    dispatch(setLoading(false));
  };

  const editStudent = async (id, data) => {
    dispatch(setLoading(true));
    try {
      const response = await axiosInstance.put(
        PUT_API(id).updateStudent,
        data,
        config
      );
      if (response.status === 200) {
        dispatch(updateStudent(response.data.student));
      }
    } catch (error) {
      message.error(
        error.response?.data?.message || "Failed to update student"
      );
      console.error(error);
    }
    dispatch(setLoading(false));
  };

  const deleteStudent = async (id) => {
    dispatch(setLoading(true));
    try {
      const response = await axiosInstance.delete(
        DELETE_API(id).deleteStudent,
        config
      );
      if (response.status === 200) {
        dispatch(removeStudent(id));
      }
    } catch (error) {
      message.error("Failed to delete student");
      console.error(error);
    }
    dispatch(setLoading(false));
  };

  const getDashboardStats = async () => {
    dispatch(setLoading(true));
    try {
      const [studentsRes, tutorsRes, allocationsRes] = await Promise.all([
        axiosInstance.get(GET_API().getAllStudents, config),
        axiosInstance.get(GET_API().getAllTutors, config),
        axiosInstance.get(GET_API().viewAllocations, config),
      ]);

      const stats = {
        totalStudents: studentsRes.data.students.length,
        totalTutors: tutorsRes.data.tutors.length,
        activeAllocations: allocationsRes.data.allocations.length,
      };

      dispatch(setDashboardStats(stats));
    } catch (error) {
      message.error("Failed to fetch dashboard statistics");
      console.error(error);
    }
    dispatch(setLoading(false));
  };

  return {
    isLoading,
    tutors,
    students,
    allocations,
    dashboardStats,
    fetchTutors,
    fetchStudents,
    fetchAllocations,
    createAllocation,
    deleteAllocation,
    getDashboardStats,
    createTutor,
    editTutor,
    deleteTutor,
    createStudent,
    editStudent,
    deleteStudent,
  };
};

export default useStaff;
