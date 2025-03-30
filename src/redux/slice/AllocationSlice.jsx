import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  allocations: [],
  allocatedStudents: [],
  allocatedTutors: [],
  error: null,
};

const allocationSlice = createSlice({
  name: "allocation",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    setAllocations: (state, action) => {
      state.allocations = action.payload;
      state.error = null;
    },
    setAllocatedStudents: (state, action) => {
      state.allocatedStudents = action.payload;
      state.error = null;
    },
    setAllocatedTutors: (state, action) => {
      state.allocatedTutors = action.payload;
      state.error = null;
    },
    addAllocation: (state, action) => {
      state.allocations.unshift(action.payload);
      state.error = null;
    },
    removeAllocation: (state, action) => {
      state.allocations = state.allocations.filter(
        (allocation) => allocation._id !== action.payload
      );
      state.error = null;
    },
    updateAllocation: (state, action) => {
      const index = state.allocations.findIndex(
        (allocation) => allocation._id === action.payload._id
      );
      if (index !== -1) {
        state.allocations[index] = action.payload;
      }
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setError,
  setAllocations,
  setAllocatedStudents,
  setAllocatedTutors,
  addAllocation,
  removeAllocation,
  updateAllocation,
  clearError,
} = allocationSlice.actions;

export default allocationSlice.reducer;
