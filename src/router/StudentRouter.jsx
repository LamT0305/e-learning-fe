import { createBrowserRouter, RouterProvider } from "react-router-dom";
import StudentLayout from "../layout/StudentLayout";
import HomePage from "../pages/student/home/HomePage";
import ViewAllSchedule from "../pages/student/schedule/all-schedule/ViewAllSchedule";
import BookNewSchedule from "../pages/student/schedule/book-schedule/BookNewSchedule";
import CreateBlog from "../pages/student/create-blog/CreateBlog";
import BlogManagement from "../pages/student/blog-management/BlogManagement";
import Message from "../pages/message/Message";
import Notification from "../pages/notification/Notification";
import ReadBlog from "../pages/ReadBlog";
import Tutor from "../pages/student/Tutor";
import Profile from "../pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <StudentLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/view-tutor",
        element: <Tutor />,
      },
      {
        path: "/student-messages",
        element: <Message />,
      },
      {
        path: "/notifications",
        element: <Notification />,
      },
      {
        path: "/view-student-schedules",
        element: <ViewAllSchedule />,
      },
      {
        path: "/book-new-schedule",
        element: <BookNewSchedule />,
      },
      {
        path: "/create-blog",
        element: <CreateBlog />,
      },
      {
        path: "/update-blog/:id",
        element: <CreateBlog />,
      },
      {
        path: "/blog-management",
        element: <BlogManagement />,
      },
      {
        path: "/blog/:id",
        element: <ReadBlog />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);

function StudentRouter() {
  return <RouterProvider router={router} />;
}

export default StudentRouter;
