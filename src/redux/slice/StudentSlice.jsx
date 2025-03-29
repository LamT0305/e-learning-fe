import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  students: [],
  totalPages: 0,
  currentPage: 1,
  totalStudent: 0,
  assignedTutors: [], // New state for assigned tutors
};

const slice = createSlice({
  name: "student",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setStudents: (state, action) => {
      state.students = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalStudent: (state, action) => {
      state.totalStudent = action.payload;
    },
    setAssignedTutors: (state, action) => {
      // New reducer for assigned tutors
      state.assignedTutors = action.payload;
    },
  },
});

export const {
  setLoading,
  setStudents,
  setTotalPages,
  setCurrentPage,
  setTotalStudent,
  setAssignedTutors, // Export new action
} = slice.actions;
export default slice.reducer;
