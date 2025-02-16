import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navigation from "../components/Navbar/Navigation";
import HomePage from "../pages/student/home/HomePage";
import Notification from "../pages/student/notification/Notification";
import StudentMessage from "../pages/message/StudentMessage";
import ViewAllSchedule from "../pages/student/schedule/all-schedule/ViewAllSchedule";
import BookNewSchedule from "../pages/student/schedule/book-schedule/BookNewSchedule";
import ScheduleHistory from "../pages/student/schedule/schedule-history/ScheduleHistory";

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
        element: <StudentMessage />,
      },
      {
        path: "/notifications",
        element: <Notification />,
      },
      {
        path: "/view-schedules",
        element: <ViewAllSchedule />,
      },
      {
        path: "/book-new-schedule",
        element: <BookNewSchedule />,
      },
      {
        path: "/schedule-history",
        element: <ScheduleHistory />,
      },
    ],
  },
]);

function StudentRouter() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default StudentRouter;
