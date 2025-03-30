import { useSelector, useDispatch } from "react-redux";
import {
  setLoading,
  setUsers,
  setSearchResults,
  setSelectedUser,
  setError,
  clearSearchResults,
  clearSelectedUser,
  updateUser,
  deleteUser,
} from "../slice/UserSlice";
import axiosInstance from "../../utils/Axios";
import { DELETE_API, GET_API, POST_API, PUT_API } from "../../utils/APIs";

const useUser = () => {
  const token = sessionStorage.getItem("token");
  const { isLoading, users, searchResults, selectedUser, error } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  const handleGetAllUsers = async () => {
    dispatch(setLoading(true));
    try {
      const res = await axiosInstance.get(GET_API().getAllUsers, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        dispatch(setUsers(res.data.users));
      }
    } catch (error) {
      dispatch(
        setError(error.response?.data?.message || "Failed to fetch users")
      );
    }
    dispatch(setLoading(false));
  };

  const handleSearchUsers = async (searchTerm) => {
    if (!searchTerm.trim()) {
      dispatch(clearSearchResults());
    }
    dispatch(setSearchResults(searchTerm));
  };

  const handleGetUserById = async (userId) => {
    dispatch(setLoading(true));
    try {
      const res = await axiosInstance.get(GET_API(userId).getUserById, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        dispatch(setSelectedUser(res.data.user));
      }
    } catch (error) {
      dispatch(
        setError(error.response?.data?.message || "Failed to fetch user")
      );
    }
    dispatch(setLoading(false));
  };

  const handleUpdateUser = async (userId, userData) => {
    dispatch(setLoading(true));
    try {
      const res = await axiosInstance.put(
        PUT_API(userId).updateUser,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        dispatch(updateUser(res.data.user));
        return true;
      }
    } catch (error) {
      dispatch(setError(error.response?.data?.message || "Update failed"));
      return false;
    }
    dispatch(setLoading(false));
  };

  const handleDeleteUser = async (userId) => {
    dispatch(setLoading(true));
    try {
      const res = await axiosInstance.delete(DELETE_API(userId).deleteUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        dispatch(deleteUser(userId));
        return true;
      }
    } catch (error) {
      dispatch(setError(error.response?.data?.message || "Delete failed"));
      return false;
    }
    dispatch(setLoading(false));
  };

  const handleClearSelectedUser = () => {
    dispatch(clearSelectedUser());
  };

  return {
    isLoading,
    userList: users,
    searchResults,
    selectedUser,
    error,
    handleGetAllUsers,
    handleSearchUsers,
    handleGetUserById,
    handleUpdateUser,
    handleDeleteUser,
    handleClearSelectedUser,
  };
};

export default useUser;
