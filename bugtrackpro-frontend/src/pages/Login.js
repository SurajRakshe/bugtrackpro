import API from '../api';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { saveToken } from '../utils/auth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // clear previous error
    try {
      const res = await API.post('/api/auth/login', { email, password });
      
      // Save token
      saveToken(res.data.token); // Assuming backend returns: { token: "..." }

      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      console.error("Login error:", err);
      if (err.response?.data?.message) {
        setError(err.response.data.message); // from backend (like Invalid password)
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3 className="text-center mb-3">Login</h3>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>

      <p className="mt-3 text-center">
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

export default Login;
