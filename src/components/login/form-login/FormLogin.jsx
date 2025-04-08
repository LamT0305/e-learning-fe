import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../redux/hooks/useAuth";

function FormLogin() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { isLoading, handleLogin } = useAuth();

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("email");
    const storedPassword = sessionStorage.getItem("password");

    if (storedEmail) {
      setEmail(storedEmail);
    }
    if (storedPassword) {
      setPassword(storedPassword);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    handleLogin(formData);
  };


  return (
    <div className="absolute top-6/8 left-1/2 transform -translate-x-1/2 -translate-y-5/8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back👋
          </h1>
          <p className="text-gray-600">Log in to your account</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600! hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {isLoading ? "Logging in..." : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormLogin;
