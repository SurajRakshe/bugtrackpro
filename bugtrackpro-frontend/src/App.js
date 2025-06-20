import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProjectTable from './pages/ProjectTable';
import TicketTable from './pages/TicketTable';
import ProfilePage from './pages/ProfilePage';
import TicketDetails from './pages/TicketDetails';
import KanbanBoard from './components/kanban/KanbanBoard';
import FileUpload from './components/FileUpload'; // ✅ Added this

import ProtectedRoute from './utils/ProtectedRoute';//

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <ProjectTable />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tickets"
          element={
            <ProtectedRoute>
              <TicketTable />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tickets/:id"
          element={
            <ProtectedRoute>
              <TicketDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/kanban"
          element={
            <ProtectedRoute>
              <KanbanBoard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <FileUpload />
            </ProtectedRoute>
          }
        />

        {/* Optional: Catch-all route */}
        {/* <Route path="*" element={<Navigate to="/login" />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
