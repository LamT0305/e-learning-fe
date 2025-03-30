import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  tutors: [],
  students: [],
  allocations: [],
  dashboardStats: {
    totalStudents: 0,
    totalTutors: 0,
    activeAllocations: 0,
  },
};

const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    // Tutor reducers
    setTutors: (state, action) => {
      state.tutors = action.payload;
    },
    addTutor: (state, action) => {
      state.tutors.unshift(action.payload);
      state.dashboardStats.totalTutors += 1;
    },
    updateTutor: (state, action) => {
      const index = state.tutors.findIndex(
        (tutor) => tutor._id === action.payload._id
      );
      if (index !== -1) {
        state.tutors[index] = action.payload;
      }
    },
    removeTutor: (state, action) => {
      state.tutors = state.tutors.filter(
        (tutor) => tutor._id !== action.payload
      );
      state.dashboardStats.totalTutors -= 1;
    },

    // Student reducers
    setStudents: (state, action) => {
      state.students = action.payload;
    },
    addStudent: (state, action) => {
      state.students.unshift(action.payload);
      state.dashboardStats.totalStudents += 1;
    },
    updateStudent: (state, action) => {
      const index = state.students.findIndex(
        (student) => student._id === action.payload._id
      );
      if (index !== -1) {
        state.students[index] = action.payload;
      }
    },
    removeStudent: (state, action) => {
      state.students = state.students.filter(
        (student) => student._id !== action.payload
      );
      state.dashboardStats.totalStudents -= 1;
    },

    // Existing allocation reducers
    setAllocations: (state, action) => {
      state.allocations = action.payload;
    },
    setDashboardStats: (state, action) => {
      state.dashboardStats = {
        ...state.dashboardStats,
        ...action.payload,
      };
    },
    addAllocation: (state, action) => {
      state.allocations.unshift(action.payload);
      state.dashboardStats.activeAllocations += 1;
    },
    removeAllocation: (state, action) => {
      state.allocations = state.allocations.filter(
        (allocation) => allocation._id !== action.payload
      );
      state.dashboardStats.activeAllocations -= 1;
    },
    updateAllocation: (state, action) => {
      const index = state.allocations.findIndex(
        (allocation) => allocation._id === action.payload._id
      );
      if (index !== -1) {
        state.allocations[index] = action.payload;
      }
    },
  },
});

export const {
  setLoading,
  setTutors,
  addTutor,
  updateTutor,
  removeTutor,
  setStudents,
  addStudent,
  updateStudent,
  removeStudent,
  setAllocations,
  setDashboardStats,
  addAllocation,
  removeAllocation,
  updateAllocation,
} = staffSlice.actions;

export default staffSlice.reducer;
