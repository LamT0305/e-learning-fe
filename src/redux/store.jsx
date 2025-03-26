import { configureStore } from "@reduxjs/toolkit";
import blog from "./slice/BlogSlice";
import comment from "./slice/CommentSlice";
import auth from "./slice/AuthSlice";
import message from "./slice/MessageSlice";
import schedule from "./slice/ScheduleSlice";
import notification from "./slice/NotificationSlice";
import staff from "./slice/StaffSlice";

const store = configureStore({
  reducer: {
    auth: auth,
    blog: blog,
    comment: comment,
    message: message,
    schedule: schedule,
    notification: notification,
    staff: staff,
  },
});

export default store;
