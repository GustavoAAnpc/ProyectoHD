import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';
import PrivateRoute from './components/PrivateRoute';
import Inicio from './pages/Inicio';
import Servicios from './pages/Servicios';
import Planes from './pages/Planes';
import Contacto from './pages/Contacto';
import DashboardAdmin from './pages/DashboardAdmin';
import DashboardEntrenador from './pages/DashboardEntrenador';
import DashboardUsuario from './pages/DashboardUsuario';
import './App.css';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={
        <PublicLayout>
          <Inicio />
        </PublicLayout>
      } />
      <Route path="/servicios" element={
        <PublicLayout>
          <Servicios />
        </PublicLayout>
      } />
      <Route path="/planes" element={
        <PublicLayout>
          <Planes />
        </PublicLayout>
      } />
      <Route path="/contacto" element={
        <PublicLayout>
          <Contacto />
        </PublicLayout>
      } />

      {/* Rutas del dashboard */}
      <Route
        path="/dashboard/administrador"
        element={
          <PrivateRoute allowedRoles={['Administrador']}>
            <DashboardLayout>
              <DashboardAdmin />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/entrenador"
        element={
          <PrivateRoute allowedRoles={['Entrenador']}>
            <DashboardLayout>
              <DashboardEntrenador />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/usuario"
        element={
          <PrivateRoute allowedRoles={['Usuario']}>
            <DashboardLayout>
              <DashboardUsuario />
            </DashboardLayout>
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
