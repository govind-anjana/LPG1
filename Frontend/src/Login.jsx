import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberEmail');
    const savedPassword = localStorage.getItem('rememberPassword');
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
    }
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = 'Email is required';
    if (!password.trim()) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (!validate()) return;

    if (email === 'govind@123' && password === '1234') {
      localStorage.setItem('isLoggedIn', true);
      setLoginError(''); // Clear any old error

      // if (remember) {
      //   localStorage.setItem('rememberEmail', email);
      //   localStorage.setItem('rememberPassword', password);
      // } else {
      //   localStorage.removeItem('rememberEmail');
      //   localStorage.removeItem('rememberPassword');
      // }

      navigate('/app');
    } else {
      setLoginError('Invalid Email or Password');
      setEmail("")
      setPassword("")
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card shadow-lg p-5 bg-dark rounded" style={{ width: '400px' }}>
        <h3 className="text-center mb-4 text-primary">Admin Login</h3>

    
        {loginError && (
          <div className="alert alert-danger text-center" role="alert">
            {loginError}
          </div>
        )}

        <div className="mb-3">
          <label className="form-label fw-semibold text-white">Email address</label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            title="Email"
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold text-white">Password</label>
          <input
            type="password"
            title='Password'
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            placeholder="Enter Password"
            
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>

      

        <button onClick={handleLogin} className="btn btn-primary w-100 mb-2">
          Login
        </button>

        <div className="text-center">
          <a href="#" onClick={(e) => e.preventDefault()} className="text-decoration-none">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
