import { configureStore } from "@reduxjs/toolkit";
import blog from "./slice/BlogSlice";
import comment from "./slice/CommentSlice";
import auth from "./slice/AuthSlice";

const store = configureStore({
  reducer: {
    auth: auth,
    blog: blog,
    comment: comment,
  },
});

export default store;
