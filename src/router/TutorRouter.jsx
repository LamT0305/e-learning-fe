import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navigation from "../components/Navbar/Navigation";
import HomePage from "../pages/tutor/home/HomePage";
import Message from "../pages/message/Message";
import Notification from "../pages/notification/Notification";
import ViewAllSchedule from "../pages/student/schedule/all-schedule/ViewAllSchedule";
import { useLocation } from "react-router-dom";

const DebugRoute = () => {
  const location = useLocation();
  return <p>Current Route: {location.pathname}</p>;
};

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
      { path: "/", element: <HomePage /> }, // 👈 Explicitly define root
      { path: "/tutor-messages", element: <Message /> }, // 👈 Add leading `/`
      { path: "/tutor-notifications", element: <Notification /> },
      { path: "/view-tutor-schedules", element: <ViewAllSchedule /> },
      { path: "*", element: <p>Page Not Found</p> },
    ],
  },
]);

function TutorRouter() {
  return <RouterProvider router={router} />;
}

export default TutorRouter;
