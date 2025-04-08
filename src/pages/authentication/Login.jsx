import React from "react";
import FormLogin from "../../components/login/form-login/FormLogin";
import imgBG from "../../assets/img-bg.jpg";

function Login() {
  return (
    <div className="relative w-screen h-screen">
      <img src={imgBG} alt="" className="w-full h-full object-fit" />
      <FormLogin />
    </div>
  );
}

export default Login;
