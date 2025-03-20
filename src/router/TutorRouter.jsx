import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navigation from "../components/Navbar/Navigation";
import HomePage from "../pages/tutor/home/HomePage";
import Message from "../pages/message/Message";
import Notification from "../pages/notification/Notification";
import { useLocation } from "react-router-dom";
import ViewSchedules from "../pages/tutor/schedule/ViewSchedules";
import BlogRequest from "../pages/tutor/Blog/BlogRequest";

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
      { path: "/", element: <HomePage /> },
      { path: "/tutor-messages", element: <Message /> },
      { path: "/notifications", element: <Notification /> },
      { path: "/view-tutor-schedules", element: <ViewSchedules /> },
      { path: "/view-blog-request", element: <BlogRequest /> },
      { path: "*", element: <p>Page Not Found</p> },
    ],
  },
]);

function TutorRouter() {
  return <RouterProvider router={router} />;
}

export default TutorRouter;
