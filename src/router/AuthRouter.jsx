import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Login from "../pages/authentication/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
]);

function AuthRouter() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default AuthRouter;
