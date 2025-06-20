import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderKanban,
  Bug,
  UserCircle,
  LogOut
} from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { path: '/projects', label: 'Projects', icon: <FolderKanban size={18} /> },
    { path: '/tickets', label: 'Tickets', icon: <Bug size={18} /> },
    { path: '/profile', label: 'Profile', icon: <UserCircle size={18} /> },
  ];

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="w-64 h-screen bg-white shadow-md p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold mb-6 text-blue-700">🐞 BugTrackPro</h2>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-2 px-3 py-2 rounded-md transition-colors duration-200 hover:bg-blue-100 ${
                  isActive ? 'bg-blue-200 text-blue-900 font-semibold' : 'text-gray-700'
                }`
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <button
        onClick={logout}
        className="flex items-center space-x-2 mt-6 text-red-600 hover:text-red-800 transition-colors"
      >
        <LogOut size={18} />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;
