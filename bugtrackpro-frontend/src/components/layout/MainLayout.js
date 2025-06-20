// src/components/layout/MainLayout.js
import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 bg-gray-100 p-4 overflow-x-auto">
        <Outlet /> {/* This will render child routes */}
      </div>
    </div>
  );
};

export default MainLayout;
