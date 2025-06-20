import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from '../api';

const Dashboard = () => {
  const [stats, setStats] = useState({ projects: 0, tickets: 0, users: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('/dashboard/stats', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // attach token if needed
          },
        });

        setStats(res.data);
      } catch (err) {
        console.error('Failed to fetch dashboard stats', err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Welcome to BugTrackPro 🐛</h1>
        <p className="mb-6 text-gray-700">Track your bugs, projects, and tickets in one place.</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white shadow-md rounded-xl p-4 border-l-4 border-blue-500">
            <h3 className="text-xl font-semibold text-blue-600">Projects</h3>
            <p className="text-3xl">{stats.projects}</p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-4 border-l-4 border-green-500">
            <h3 className="text-xl font-semibold text-green-600">Tickets</h3>
            <p className="text-3xl">{stats.tickets}</p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-4 border-l-4 border-purple-500">
            <h3 className="text-xl font-semibold text-purple-600">Users</h3>
            <p className="text-3xl">{stats.users}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
