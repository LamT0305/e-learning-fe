import { configureStore } from "@reduxjs/toolkit";
import blog from "./slice/BlogSlice";
import comment from "./slice/CommentSlice";
import auth from "./slice/AuthSlice";
import message from "./slice/MessageSlice";
import schedule from "./slice/ScheduleSlice";
import notification from "./slice/NotificationSlice";
import staff from "./slice/StaffSlice";
import user from "./slice/UserSlice";
import allocation from "./slice/AllocationSlice";
import analytic from "./slice/AnalyticSlice";
import student from "./slice/StudentSlice";

const store = configureStore({
  reducer: {
    auth: auth,
    blog: blog,
    comment: comment,
    message: message,
    schedule: schedule,
    notification: notification,
    staff: staff,
    user: user,
    allocation: allocation,
    analytic: analytic,
    student: student,
  },
});

export default store;
