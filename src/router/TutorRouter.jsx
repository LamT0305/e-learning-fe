import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import TutorLayout from "../layout/TutorLayout";
import HomePage from "../pages/tutor/home/HomePage";
import Message from "../pages/message/Message";
import Notification from "../pages/notification/Notification";
import ViewSchedules from "../pages/tutor/schedule/ViewSchedules";
import BlogRequest from "../pages/tutor/Blog/BlogRequest";
import ReadBlog from "../pages/ReadBlog";
import AnalyticDashBoard from "../pages/tutor/AnalyticDashBoard";
import Profile from "../pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/tutor" replace />,
  },
  {
    path: "/tutor",
    element: <TutorLayout />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "schedule", element: <ViewSchedules /> },
      { path: "blogs", element: <BlogRequest /> },
      { path: "messages", element: <Message /> },
      { path: "profile", element: <Profile /> },
      { path: "notifications", element: <Notification /> },
      { path: "blog/:id", element: <ReadBlog /> },
      { path: "analytic-dashboard", element: <AnalyticDashBoard /> },
      { path: "profile", element: <Profile /> },
      { path: "*", element: <Navigate to="/tutor" replace /> },
    ],
  },
]);

function TutorRouter() {
  return <RouterProvider router={router} />;
}

export default TutorRouter;
