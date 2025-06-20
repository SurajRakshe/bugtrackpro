import API from '../api';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER"
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
     await API.post("/api/auth/register", form); 
      navigate("/login");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Registration failed.");
      }
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3 className="text-center mb-3">Register</h3>
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label>Name</label>
          <input type="text" className="form-control" name="name"
            value={form.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" name="email"
            value={form.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control" name="password"
            value={form.password} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Role</label>
          <select name="role" className="form-control" value={form.role}
            onChange={handleChange}>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-success w-100">Register</button>
      </form>
    </div>
  );
}

export default Register;
