import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgetPass() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");

  const validate = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } 
    // else if (!/\S+@\S+\.\S+/.test(email)) {
    //   newErrors.email = "Enter a valid email";
    // }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (!validate()) return;
    // TODO: Send email to backend for password reset
    console.log("Submit email:", email);
    alert("Password reset link sent to your email!");
    setEmail("");
    navigate("/")
  };

  return (
    <div className="container-fluid vh-100 d-flex flex-column justify-content-center align-items-center bg-light">
      <div>
        <img
          src="https://lpg.sbinnovative.com/backend/images/s_logo.png"
          alt="Logo"
          className="mb-4"
        />
      </div>
      <div className="card shadow-lg p-5 bg-dark rounded" style={{ width: "400px" }}>
        <h3 className="text-center mb-4 text-primary">Forget Password</h3>

        <div className="mb-3">
          <label className="form-label fw-semibold text-white">
            Email Address
          </label>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            title="Email"
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>

        {loginError && <div className="alert alert-danger">{loginError}</div>}

        <button onClick={handleLogin} className="btn btn-primary w-100 mb-2">
          Submit
        </button>

        <div className="text-center">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
            className="text-decoration-none text-light"
          >
           Admin Login
          </a>
        </div>
      </div>
    </div>
  );
}

export default ForgetPass;
