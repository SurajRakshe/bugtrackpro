import React, { useEffect, useState } from 'react';
import axios from '../api';

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('/users') // You can filter by JWT later
      .then(res => setUser(res.data[0])) // TEMP: display the first user
      .catch(err => console.error(err));
  }, []);

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">👤 My Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
    </div>
  );
};

export default ProfilePage;
