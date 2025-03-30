import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  user: {},
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setLoading, setUser } = slice.actions;
export default slice.reducer;
