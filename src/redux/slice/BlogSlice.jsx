import { createSlice } from "@reduxjs/toolkit";

const initState = {
  isLoading: false,
  blogs: [],
  blog: {},
  totalPages: 0,
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
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setApproval: (state, action) => {
      state.blogs = state.blogs.filter((blog) => blog._id !== action.payload);
    },
  },
});

export const {
  setLoading,
  setBlogs,
  deleteBlog,
  setBlogById,
  setTotalPages,
  setApproval,
} = slice.actions;

export default slice.reducer;
