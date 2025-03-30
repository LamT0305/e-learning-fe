import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  users: [],
  searchResults: [],
  selectedUser: null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
      state.searchResults = state.users;
      state.error = null;
    },
    setSearchResults: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      if (searchTerm === "") {
        state.searchResults = state.users;
      }
      state.searchResults = state.users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm) ||
          user.email.toLowerCase().includes(searchTerm) ||
          user.role.toLowerCase().includes(searchTerm)
      );
      state.error = null;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
    updateUser: (state, action) => {
      const updatedUser = action.payload;
      state.users = state.users.map((user) =>
        user._id === updatedUser._id ? updatedUser : user
      );
      if (state.selectedUser?._id === updatedUser._id) {
        state.selectedUser = updatedUser;
      }
    },
    deleteUser: (state, action) => {
      const userId = action.payload;
      state.users = state.users.filter((user) => user._id !== userId);
      if (state.selectedUser?._id === userId) {
        state.selectedUser = null;
      }
    },
  },
});

export const {
  setLoading,
  setUsers,
  setSearchResults,
  setSelectedUser,
  setError,
  clearSearchResults,
  clearSelectedUser,
  updateUser,
  deleteUser,
} = userSlice.actions;

export default userSlice.reducer;
