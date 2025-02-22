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
      state.notifications.push(action.payload);
    },
  },
});

export const { setLoading, setNotifications, addNotification } = slice.actions;
export default slice.reducer;
