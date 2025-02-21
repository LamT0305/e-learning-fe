import "./App.css";
import AuthRouter from "./router/AuthRouter";
import StudentRouter from "./router/StudentRouter";

function App() {
  const isAuthenticated = sessionStorage.getItem("isAuthenticated");
  return (
    <>
      {isAuthenticated ? <StudentRouter /> : <AuthRouter />}
    </>
  );
}

export default App;
