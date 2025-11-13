import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { alumnoService, claseService, inscripcionClaseService } from '../services/api';
import './Dashboard.css';

const DashboardRecepcionista = () => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({
    alumnos: 0,
    clases: 0,
    inscripciones: 0
  });
  const [alumnos, setAlumnos] = useState([]);
  const [clases, setClases] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [alumnosRes, clasesRes, inscripcionesRes] = await Promise.all([
        alumnoService.getAll(),
        claseService.getAll(),
        inscripcionClaseService.getAll()
      ]);

      setAlumnos(alumnosRes.data);
      setClases(clasesRes.data);
      setStats({
        alumnos: alumnosRes.data.length,
        clases: clasesRes.data.length,
        inscripciones: inscripcionesRes.data.length
      });
    } catch (error) {
      console.error('Error cargando datos:', error);
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Dashboard - Recepcionista</h1>
        <div className="user-info">
          <span>Bienvenido, {user?.nombreCompleto || user?.username}</span>
          <button onClick={logout} className="logout-button">Cerrar Sesión</button>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Alumnos</h3>
            <p className="stat-number">{stats.alumnos}</p>
          </div>
          <div className="stat-card">
            <h3>Clases Disponibles</h3>
            <p className="stat-number">{stats.clases}</p>
          </div>
          <div className="stat-card">
            <h3>Inscripciones</h3>
            <p className="stat-number">{stats.inscripciones}</p>
          </div>
        </div>

        <div className="dashboard-sections">
          <section className="dashboard-section">
            <h2>Gestión de Alumnos</h2>
            <p>Registra y gestiona alumnos del gimnasio.</p>
          </section>
          <section className="dashboard-section">
            <h2>Inscripciones a Clases</h2>
            <p>Gestiona las inscripciones de alumnos a clases.</p>
          </section>
          <section className="dashboard-section">
            <h2>Horarios de Clases</h2>
            <div className="data-list">
              {clases.length > 0 ? (
                clases.map(clase => (
                  <div key={clase.idClase} className="data-item">
                    <h4>{clase.nameClase}</h4>
                    <p>{clase.diaSemana} - {clase.horaInicio} a {clase.horaFin}</p>
                  </div>
                ))
              ) : (
                <p>No hay clases disponibles</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DashboardRecepcionista;

