import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import StaffLayout from "../layout/StaffLayout";
import StaffDashboard from "../pages/staff/StaffDashboard";
import ManageTutors from "../pages/staff/ManageTutors";
import ManageStudents from "../pages/staff/ManageStudents";
import Allocations from "../pages/staff/Allocations";

const router = createBrowserRouter([
  {
    path: "/",
    element: <StaffLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/staff/dashboard" replace />,
      },
      {
        path: "staff/dashboard",
        element: <StaffDashboard />,
      },
      {
        path: "staff/tutors",
        element: <ManageTutors />,
      },
      {
        path: "staff/students",
        element: <ManageStudents />,
      },
      {
        path: "staff/allocations",
        element: <Allocations />,
      },
      {
        path: "*",
        element: <div>Page Not Found</div>,
      },
    ],
  },
]);

function StaffRouter() {
  return <RouterProvider router={router} />;
}

export default StaffRouter;
