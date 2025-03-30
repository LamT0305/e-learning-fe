import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  studentAnalytics: null,
  overallAnalytics: [],
  error: null,
};

const analyticSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setStudentAnalytics: (state, action) => {
      state.studentAnalytics = action.payload;
      state.error = null;
    },
    setOverallAnalytics: (state, action) => {
      state.overallAnalytics = action.payload;
      state.error = null;
    },
    updateStudentAnalytics: (state, action) => {
      if (
        state.studentAnalytics &&
        state.studentAnalytics.student_id === action.payload.student_id
      ) {
        state.studentAnalytics = {
          ...state.studentAnalytics,
          ...action.payload,
        };
      }
    },
    clearAnalytics: (state) => {
      state.studentAnalytics = null;
      state.overallAnalytics = [];
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setError,
  setStudentAnalytics,
  setOverallAnalytics,
  updateStudentAnalytics,
  clearAnalytics,
} = analyticSlice.actions;

export default analyticSlice.reducer;
