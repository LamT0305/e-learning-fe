import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function FormLogin() {
  return (
    <div className="form-login">
      <h1>Welcome back👋</h1>
      <p>Log in your account</p>
      <form>
        <div className="email">
          <input type="text" placeholder="Email" />
        </div>
        <div className="password">
          <input type="password" placeholder="Password" />
        </div>
        <div className="checkbox">
          <label>
            <input type="checkbox" />
            Remember me
          </label>
        </div>
        <button type="submit">Log in</button>
        <div className="forgot-pw">
          <Link to={"/#"}>Forgot password?</Link>
        </div>
      </form>
    </div>
  );
}

export default FormLogin;
