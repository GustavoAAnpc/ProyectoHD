import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';
import DashboardAdmin from './pages/DashboardAdmin';
import DashboardEntrenador from './pages/DashboardEntrenador';
import DashboardUsuario from './pages/DashboardUsuario';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/dashboard/administrador"
        element={
          <PrivateRoute allowedRoles={['Administrador']}>
            <DashboardAdmin />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/entrenador"
        element={
          <PrivateRoute allowedRoles={['Entrenador']}>
            <DashboardEntrenador />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/usuario"
        element={
          <PrivateRoute allowedRoles={['Usuario']}>
            <DashboardUsuario />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
