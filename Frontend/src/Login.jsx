import axios from "./Component/AxiosConfig";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const times=new Date().toLocaleTimeString()
  const [user, setuser] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
      const fetchDate = ()=>{
        // const res= await axios.get("")
        // console.log(res)
        const saveduser = localStorage.getItem("rememberuser");
        const savedPassword = localStorage.getItem("rememberPassword");
        if (saveduser && savedPassword) {
          setuser(saveduser);
          setPassword(savedPassword);
        }
    }
    fetchDate()
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!user.trim()) newErrors.user = "user is required";
    if (!password.trim()) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleLogin = () => {
    if (!validate()) return;

    if (user === "govind@123" && password === "1234") {
      localStorage.setItem("isLoggedIn", true);
      setLoginError("");

      // if (remember) {
      //   localStorage.setItem('rememberuser', user);
      //   localStorage.setItem('rememberPassword', password);
      // } else {
      //   localStorage.removeItem('rememberuser');
      //   localStorage.removeItem('rememberPassword');
      // }

      navigate("/app");
    } else {
      setLoginError("Invalid user or Password");
      setuser("");
      setPassword("");
    }
  };
  const handleForgotPassword = (e) => {
    e.preventDefault();
    navigate("/forgetpassword");
  };

  return (
    <div className="container-fluid vh-100 d-flex flex-column  justify-content-center align-items-center bg-light">
      <div>
        <img src="https://lpg.sbinnovative.com/backend/images/s_logo.png" />
      </div>
      <div
        className="card shadow-lg p-5 bg-dark rounded"
        style={{ width: "400px" }}
      >
        <h3 className="text-center mb-4 text-primary">Admin Login</h3>

        {loginError && (
          <div className="alert alert-danger text-center" role="alert">
            {loginError}
          </div>
        )}

        <div className="mb-3">
          <label className="form-label fw-semibold text-white">User Name</label>
          <input
            type="text"
            name="user"
            className={`form-control ${errors.user ? "is-invalid" : ""}`}
            placeholder="Enter UserName"
            value={user}
            onChange={(e) => {setuser(e.target.value);
            setErrors("");setLoginError("");}}
            title="UserName"
          />
          {errors.user && (
            <div className="invalid-feedback">{errors.user}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold text-white">Password</label>
          <input
            type="password"
            title="Password"
            name="password"
            value={password}
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            placeholder="Enter Password"
            onChange={((e) => {setPassword(e.target.value); setErrors("");setLoginError("");
})}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
        </div>

        <button onClick={handleLogin} className="btn btn-primary w-100 mb-2">
          Login
        </button>
        <div className="text-center">
          <a
            href="#"
            onClick={handleForgotPassword}
            className="text-decoration-none text-light"
          >
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
