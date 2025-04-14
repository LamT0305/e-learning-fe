import { createSlice } from "@reduxjs/toolkit";

const initState = {
  isLoading: false,
  schedules: [],
  filteredSchedules: [],
  currentPage: 1,
  itemsPerPage: 10,
  totalPages: 0,
  currentSchedule: null,
  feedback: null,
  filter: "all",
};

const slice = createSlice({
  name: "schedule",
  initialState: initState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setSchedules: (state, action) => {
      state.schedules = action.payload || [];
      state.filteredSchedules = action.payload || [];
      state.totalPages = Math.ceil(
        (state.filteredSchedules?.length || 0) / state.itemsPerPage
      );
    },

    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },

    setFilter: (state, action) => {
      state.filter = action.payload;
      state.filteredSchedules =
        action.payload === "all"
          ? state.schedules
          : state.schedules.filter(
              (schedule) => schedule.status === action.payload
            );
      state.totalPages = Math.ceil(
        state.filteredSchedules.length / state.itemsPerPage
      );
      state.currentPage = 1;
    },

    setCurrentSchedule: (state, action) => {
      state.currentSchedule = action.payload;
    },

    setUpdateSchedule: (state, action) => {
      const { id, status } = action.payload;
      state.schedules = state.schedules.map((schedule) =>
        schedule._id === id
          ? {
              ...schedule,
              status,
            }
          : schedule
      );

      state.filteredSchedules = state.schedules;

      state.totalPages = Math.ceil(
        state.filteredSchedules.length / state.itemsPerPage
      );
    },

    setFeedback: (state, action) => {
      const { scheduleId, rating, comment } = action.payload;
      state.schedules = state.schedules.map((schedule) =>
        schedule._id === scheduleId
          ? {
              ...schedule,
              feedback: {
                rating,
                comment,
                createdAt: new Date().toISOString(),
              },
            }
          : schedule
      );

      state.filteredSchedules =
        state.filter === "all"
          ? state.schedules
          : state.schedules.filter(
              (schedule) => schedule.status === state.filter
            );

      if (state.currentSchedule?._id === scheduleId) {
        state.currentSchedule = {
          ...state.currentSchedule,
          feedback: {
            rating,
            comment,
            createdAt: new Date().toISOString(),
          },
        };
      }
    },

    cancelSchedule: (state, action) => {
      const { id, reason } = action.payload;
      state.schedules = state.schedules.map((schedule) =>
        schedule._id === id
          ? { ...schedule, status: "cancelled", notes: reason }
          : schedule
      );

      state.filteredSchedules =
        state.filter === "all"
          ? state.schedules
          : state.schedules.filter(
              (schedule) => schedule.status === state.filter
            );

      state.totalPages = Math.ceil(
        state.filteredSchedules.length / state.itemsPerPage
      );
    },

    searchScheduleBySubject: (state, action) => {
      const text = action.payload;

      if(!text){
        state.filteredSchedules = state.schedules;
      }
      console.log(text)

      state.filteredSchedules = state.schedules.filter((schedule) =>
        schedule.subject.toLowerCase().includes(text.toLowerCase())
      );

      state.totalPages = Math.ceil(
        state.filteredSchedules.length / state.itemsPerPage
      );
      state.currentPage = 1;
    },
  },
});

const { actions, reducer } = slice;
export const {
  setLoading,
  setSchedules,
  setCurrentPage,
  setFilter,
  setUpdateSchedule,
  setCurrentSchedule,
  setFeedback,
  cancelSchedule,
  searchScheduleBySubject
} = actions;
export default reducer;
