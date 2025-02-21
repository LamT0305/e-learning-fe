import React from "react";
import FormLogin from "../../components/login/form-login/FormLogin";
import "./style.css";
import imgBG from "../../assets/img-bg.jpg";

function Login() {
  return (
    <div className="login">
      <img src={imgBG} alt="" className="img-bg" />
      <FormLogin />
    </div>
  );
}

export default Login;
