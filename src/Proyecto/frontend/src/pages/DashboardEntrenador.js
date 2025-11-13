import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  instructorService, claseService, planNutricionalService, 
  incidenciaService, alumnoService, rutinaService,
  ejercicioService, seguimientoFisicoService
} from '../services/api';
import './Dashboard.css';

const DashboardEntrenador = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [instructorId, setInstructorId] = useState(null);
  const [stats, setStats] = useState({
    clases: 0,
    planes: 0,
    incidencias: 0,
    alumnos: 0,
    rutinas: 0
  });
  const [clases, setClases] = useState([]);
  const [planes, setPlanes] = useState([]);
  const [alumnos, setAlumnos] = useState([]);
  const [rutinas, setRutinas] = useState([]);
  const [ejercicios, setEjercicios] = useState([]);
  const [seguimientos, setSeguimientos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const instructorRes = await instructorService.getByUsuario(user.idUsuario);
      const instructor = instructorRes.data;
      if (instructor?.idInstructor) {
        setInstructorId(instructor.idInstructor);
        
        const [clasesRes, planesRes, incidenciasRes, rutinasRes, ejerciciosRes] = await Promise.all([
          claseService.getByInstructor(instructor.idInstructor),
          planNutricionalService.getByInstructor(instructor.idInstructor),
          incidenciaService.getByInstructor(instructor.idInstructor),
          rutinaService.getByInstructor(instructor.idInstructor),
          ejercicioService.getAll()
        ]);

        setClases(clasesRes.data);
        setPlanes(planesRes.data);
        setRutinas(rutinasRes.data);
        setEjercicios(ejerciciosRes.data);
        
        setStats({
          clases: clasesRes.data.length,
          planes: planesRes.data.length,
          incidencias: incidenciasRes.data.length,
          alumnos: 0,
          rutinas: rutinasRes.data.length
        });
      }
    } catch (error) {
      console.error('Error cargando datos:', error);
    }
  };

  const handleCreate = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>💪 Dashboard - Entrenador</h1>
        <div className="user-info">
          <span>Bienvenido, {user?.nombreCompleto || user?.username}</span>
          <button onClick={logout} className="logout-button">Cerrar Sesión</button>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="tabs">
          <button className={`tab ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
            Resumen
          </button>
          <button className={`tab ${activeTab === 'clientes' ? 'active' : ''}`} onClick={() => setActiveTab('clientes')}>
            Mis Clientes
          </button>
          <button className={`tab ${activeTab === 'rutinas' ? 'active' : ''}`} onClick={() => setActiveTab('rutinas')}>
            Rutinas
          </button>
          <button className={`tab ${activeTab === 'ejercicios' ? 'active' : ''}`} onClick={() => setActiveTab('ejercicios')}>
            Ejercicios
          </button>
          <button className={`tab ${activeTab === 'clases' ? 'active' : ''}`} onClick={() => setActiveTab('clases')}>
            Clases
          </button>
          <button className={`tab ${activeTab === 'nutricion' ? 'active' : ''}`} onClick={() => setActiveTab('nutricion')}>
            Nutrición
          </button>
          <button className={`tab ${activeTab === 'seguimiento' ? 'active' : ''}`} onClick={() => setActiveTab('seguimiento')}>
            Seguimiento
          </button>
        </div>

        {activeTab === 'overview' && (
          <>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Mis Clases</h3>
                <p className="stat-number">{stats.clases}</p>
              </div>
              <div className="stat-card">
                <h3>Planes Nutricionales</h3>
                <p className="stat-number">{stats.planes}</p>
              </div>
              <div className="stat-card">
                <h3>Rutinas Creadas</h3>
                <p className="stat-number">{stats.rutinas}</p>
              </div>
              <div className="stat-card">
                <h3>Incidencias</h3>
                <p className="stat-number">{stats.incidencias}</p>
              </div>
            </div>

            <div className="dashboard-sections">
              <section className="dashboard-section">
                <h2>Gestión de Clientes</h2>
                <p>Ver lista de usuarios asignados y su historial de entrenamientos.</p>
                <button className="btn-primary" onClick={() => setActiveTab('clientes')} style={{marginTop: '15px'}}>
                  Ver Clientes
                </button>
              </section>
              <section className="dashboard-section">
                <h2>Planificación y Rutinas</h2>
                <p>Crear y asignar rutinas personalizadas con ejercicios específicos.</p>
                <button className="btn-primary" onClick={() => handleCreate('rutina')} style={{marginTop: '15px'}}>
                  Nueva Rutina
                </button>
              </section>
              <section className="dashboard-section">
                <h2>Seguimiento Nutricional</h2>
                <p>Crear planes alimenticios y ajustar dietas según objetivos.</p>
                <button className="btn-primary" onClick={() => handleCreate('planNutricional')} style={{marginTop: '15px'}}>
                  Nuevo Plan
                </button>
              </section>
            </div>
          </>
        )}

        {activeTab === 'clientes' && (
          <div className="dashboard-section">
            <h2>Mis Clientes</h2>
            <div className="data-list">
              {alumnos.length > 0 ? (
                alumnos.map(alumno => (
                  <div key={alumno.idAlumno} className="data-item">
                    <h4>{alumno.nameAlumno} {alumno.apellidosAlumno}</h4>
                    <p><strong>DNI:</strong> {alumno.dni}</p>
                    <p><strong>Teléfono:</strong> {alumno.telefono}</p>
                    <p><strong>Peso:</strong> {alumno.pesoActual} kg | <strong>Altura:</strong> {alumno.altura} cm</p>
                    <button className="btn-secondary" style={{marginTop: '10px'}}>Ver Historial</button>
                  </div>
                ))
              ) : (
                <p>No tienes clientes asignados</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'rutinas' && (
          <div className="dashboard-section">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
              <h2>Rutinas de Entrenamiento</h2>
              <button className="btn-primary" onClick={() => handleCreate('rutina')}>Nueva Rutina</button>
            </div>
            <div className="data-list">
              {rutinas.map(rutina => (
                <div key={rutina.idRutina} className="data-item">
                  <h4>{rutina.nombre}</h4>
                  <p><strong>Objetivo:</strong> {rutina.objetivo}</p>
                  <p>{rutina.descripcion}</p>
                  <span>Fecha inicio: {new Date(rutina.fechaInicio).toLocaleDateString()}</span>
                  <span>Estado: {rutina.activa ? 'Activa' : 'Inactiva'}</span>
                  <div style={{marginTop: '10px'}}>
                    <button className="btn-secondary" style={{marginRight: '10px'}}>Editar</button>
                    <button className="btn-secondary">Ver Ejercicios</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'ejercicios' && (
          <div className="dashboard-section">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
              <h2>Base de Datos de Ejercicios</h2>
              <button className="btn-primary" onClick={() => handleCreate('ejercicio')}>Nuevo Ejercicio</button>
            </div>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Grupo Muscular</th>
                    <th>Nivel</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {ejercicios.map(ejercicio => (
                    <tr key={ejercicio.idEjercicio}>
                      <td>{ejercicio.nombre}</td>
                      <td>{ejercicio.grupoMuscular}</td>
                      <td>{ejercicio.nivel}</td>
                      <td>
                        <button className="btn-secondary">Ver Detalles</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'clases' && (
          <div className="dashboard-section">
            <h2>Mis Clases</h2>
            <div className="data-list">
              {clases.map(clase => (
                <div key={clase.idClase} className="data-item">
                  <h4>{clase.nameClase}</h4>
                  <p>{clase.descripcion}</p>
                  <span>{clase.diaSemana} - {clase.horaInicio} a {clase.horaFin}</span>
                  <span>Duración: {clase.duracionMinutos} min</span>
                  <button className="btn-secondary" style={{marginTop: '10px'}}>Ver Inscritos</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'nutricion' && (
          <div className="dashboard-section">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
              <h2>Planes Nutricionales</h2>
              <button className="btn-primary" onClick={() => handleCreate('planNutricional')}>Nuevo Plan</button>
            </div>
            <div className="data-list">
              {planes.map(plan => (
                <div key={plan.idPlan} className="data-item">
                  <h4>{plan.namePlan}</h4>
                  <p><strong>Objetivo:</strong> {plan.objetivo}</p>
                  <p><strong>Calorías diarias:</strong> {plan.caloriasDiarias}</p>
                  <p>{plan.descripcion}</p>
                  <button className="btn-secondary" style={{marginTop: '10px'}}>Editar</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'seguimiento' && (
          <div className="dashboard-section">
            <h2>Seguimiento Físico de Clientes</h2>
            <p>Registra peso, medidas, grasa corporal y rendimiento de tus clientes.</p>
            <button className="btn-primary" onClick={() => handleCreate('seguimiento')} style={{marginTop: '15px'}}>
              Nuevo Registro
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardEntrenador;
