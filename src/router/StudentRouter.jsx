import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navigation from "../components/Navbar/Navigation";
import HomePage from "../pages/student/home/HomePage";
import ViewAllSchedule from "../pages/student/schedule/all-schedule/ViewAllSchedule";
import BookNewSchedule from "../pages/student/schedule/book-schedule/BookNewSchedule";
import CreateBlog from "../pages/student/create-blog/CreateBlog";
import BlogManagement from "../pages/student/blog-management/BlogManagement";
import Message from "../pages/message/Message";
import Notification from "../pages/notification/Notification";

const Layout = () => {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/student-messages",
        element: <Message />,
      },
      {
        path: "/student-notifications",
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
    ],
  },
]);

function StudentRouter() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default StudentRouter;
