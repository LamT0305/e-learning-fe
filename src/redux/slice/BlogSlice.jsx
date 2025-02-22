import { createSlice } from "@reduxjs/toolkit";

const initState = {
  isLoading: false,
  blogs: [],
  blog: {},
};

const slice = createSlice({
  name: "blog",
  initialState: initState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setBlogs: (state, action) => {
      state.blogs = action.payload;
    },
    deleteBlog: (state, action) => {
      state.blogs = state.blogs.filter((blog) => blog._id !== action.payload);
    },
    setBlogById: (state, action) => {
      state.blog = action.payload;
    },
  },
});

export const { setLoading, setBlogs, deleteBlog, setBlogById } = slice.actions;

export default slice.reducer;
