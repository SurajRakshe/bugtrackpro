import React, { useEffect, useState } from 'react';
import axios from '../api';

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('/users/me')
      .then(res => setUser(res.data))
      .catch(err => {
        console.error(err);
        alert('Failed to fetch user profile');
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">👤 User Profile</h2>
      {user ? (
        <div className="card shadow-sm p-4">
          <h5>Name: {user.name}</h5>
          <h6>Email: {user.email}</h6>
          <span className={`badge bg-${user.role === 'ADMIN' ? 'success' : 'primary'}`}>
            {user.role}
          </span>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserProfile;
