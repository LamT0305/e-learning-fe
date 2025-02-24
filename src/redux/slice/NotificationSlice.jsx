import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: [],
  isLoading: false,
};

const slice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    addNotification: (state, action) => {
      const exists = state.notifications.some(
        (noti) => noti._id === action.payload._id
      );
      if (!exists) {
        state.notifications.unshift(action.payload);
      }
    },
    setDeleteNoti: (state, action) => {
      state.notifications = state.notifications.filter(
        (noti) => noti._id !== action.payload
      );
    },
  },
});

export const { setLoading, setNotifications, addNotification, setDeleteNoti } = slice.actions;
export default slice.reducer;
