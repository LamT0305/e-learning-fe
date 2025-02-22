import { createSlice } from "@reduxjs/toolkit";
const initState = {
  isLoading: false,
  schedules: [],
  totalPages: 0,
};

const slice = createSlice({
  name: "schedule",
  initialState: initState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setSchedules: (state, action) => {
      state.schedules = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
  },
});

const { actions, reducer } = slice;
export const { setLoading, setSchedules, setTotalPages } = actions;
export default reducer;
