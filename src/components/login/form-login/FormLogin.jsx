import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import useAuth from "../../../redux/hooks/useAuth";

function FormLogin() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [remember, setRemember] = React.useState(true);

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

  const handleRememberChange = () => {
    setRemember(!remember);
    if (!remember) {
      // If we are checking the box (remember is becoming true)
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("password", password);
    } else {
      // If we are unchecking the box (remember is becoming false)
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("password");
    }
  };

  return (
    <div className="form-login">
      <h1>Welcome back👋</h1>
      <p>Log in to your account</p>
      <form onSubmit={handleSubmit}>
        <div className="email">
          <input
            type="email"
            placeholder="Email"
            required={true}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="password">
          <input
            type="password"
            placeholder="Password"
            required={true}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="checkbox">
          <label style={{ flexDirection: "row" }}>
            <input
              type="checkbox"
              checked={remember}
              onChange={handleRememberChange}
            />
            Remember me
          </label>
        </div>
        <button type="submit" disabled={isLoading}>
          Log in
        </button>
        <div className="forgot-pw">
          <Link to={"/#"}>Forgot password?</Link>
        </div>
      </form>
    </div>
  );
}

export default FormLogin;
