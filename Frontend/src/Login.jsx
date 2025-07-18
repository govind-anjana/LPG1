import axios from "./Component/AxiosConfig";
import logo from './Component/Images/s-favican.png'
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const times=new Date().toLocaleTimeString()
  const [user, setuser] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [current,setCurrent]=useState([])
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
      const fetchDate =async ()=>{
          const res = await axios.get("/admin"); 
      setCurrent(res.data[0]);
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
    const users=current.user ? current.user :"govind@123";
    const passwords=current.password? current.password : "1234";
    if (user === users && password === passwords) {
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
    <div className="container-fluid vh-100 d-flex flex-column  justify-content-center align-items-center bg-light p-2">
      <div>
        <img src={logo} className="mb-2"/>
      </div>
      <div
        className="loginpage card shadow-lg p-4 bg-dark rounded"
       
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
