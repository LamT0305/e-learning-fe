import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  students: [],
  totalPages: 0,
  currentPage: 1,
  totalStudent: 0,
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
  },
});

export const {
  setLoading,
  setStudents,
  setTotalPages,
  setCurrentPage,
  setTotalStudent,
} = slice.actions;
export default slice.reducer;
