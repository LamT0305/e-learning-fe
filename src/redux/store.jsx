import { configureStore } from "@reduxjs/toolkit";
import blog from "./slice/BlogSlice";
import comment from "./slice/CommentSlice";
import auth from "./slice/AuthSlice";
import message from "./slice/MessageSlice";
import schedule from "./slice/ScheduleSlice";


const store = configureStore({
  reducer: {
    auth: auth,
    blog: blog,
    comment: comment,
    message: message,
    schedule: schedule,  
  },
});

export default store;
