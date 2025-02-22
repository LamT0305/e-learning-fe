import { useEffect, useState } from "react";
import "./App.css";
import AuthRouter from "./router/AuthRouter";
import StudentRouter from "./router/StudentRouter";
import TutorRouter from "./router/TutorRouter";
import { jwtDecode } from "jwt-decode";
import { ToastContainer } from "react-toastify";
import useNotification from "./redux/hooks/useNotification";

function App() {
  const token = sessionStorage.getItem("token");
  const isAuthenticated = sessionStorage.getItem("isAuthenticated");
  const [role, setRole] = useState(null);

  useNotification();
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRole(decoded.role_name);
        sessionStorage.setItem("role_name", decoded.role_name);
      } catch (error) {
        console.error("Invalid token:", error);
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("isAuthenticated");
      }
    }
  }, [token]);

  if (!isAuthenticated) {
    return <AuthRouter />;
  }

  return (
    <>
      <ToastContainer />
      {role === "Student" && <StudentRouter />}
      {role === "Tutor" && <TutorRouter />}
    </>
  );
}

export default App;
