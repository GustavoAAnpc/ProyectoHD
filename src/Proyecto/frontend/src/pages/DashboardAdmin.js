import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  alumnoService, instructorService, claseService, 
  sedeService, equipoService, tipoMembresiaService,
  membresiaService, pagoService
} from '../services/api';
import './Dashboard.css';

const DashboardAdmin = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    alumnos: 0,
    entrenadores: 0,
    clases: 0,
    sedes: 0,
    equipos: 0,
    membresias: 0,
    ingresos: 0
  });
  const [sedes, setSedes] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const [tiposMembresia, setTiposMembresia] = useState([]);
  const [membresias, setMembresias] = useState([]);
  const [pagos, setPagos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [alumnos, entrenadores, clases, sedesRes, equiposRes, tiposRes, membresiasRes, pagosRes] = await Promise.all([
        alumnoService.getAll(),
        instructorService.getAll(),
        claseService.getAll(),
        sedeService.getAll(),
        equipoService.getAll(),
        tipoMembresiaService.getAll(),
        membresiaService.getAll(),
        pagoService.getAll()
      ]);
      
      setSedes(sedesRes.data);
      setEquipos(equiposRes.data);
      setTiposMembresia(tiposRes.data);
      setMembresias(membresiasRes.data);
      setPagos(pagosRes.data);
      
      const totalIngresos = pagosRes.data.reduce((sum, pago) => sum + parseFloat(pago.monto || 0), 0);
      
      setStats({
        alumnos: alumnos.data.length,
        entrenadores: entrenadores.data.length,
        clases: clases.data.length,
        sedes: sedesRes.data.length,
        equipos: equiposRes.data.length,
        membresias: membresiasRes.data.length,
        ingresos: totalIngresos
      });
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
        <h1>💪 Dashboard - Administrador</h1>
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
          <button className={`tab ${activeTab === 'sedes' ? 'active' : ''}`} onClick={() => setActiveTab('sedes')}>
            Sedes
          </button>
          <button className={`tab ${activeTab === 'equipos' ? 'active' : ''}`} onClick={() => setActiveTab('equipos')}>
            Equipos
          </button>
          <button className={`tab ${activeTab === 'membresias' ? 'active' : ''}`} onClick={() => setActiveTab('membresias')}>
            Membresías
          </button>
          <button className={`tab ${activeTab === 'pagos' ? 'active' : ''}`} onClick={() => setActiveTab('pagos')}>
            Pagos
          </button>
          <button className={`tab ${activeTab === 'usuarios' ? 'active' : ''}`} onClick={() => setActiveTab('usuarios')}>
            Usuarios
          </button>
        </div>

        {activeTab === 'overview' && (
          <>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Usuarios Activos</h3>
                <p className="stat-number">{stats.alumnos}</p>
              </div>
              <div className="stat-card">
                <h3>Entrenadores</h3>
                <p className="stat-number">{stats.entrenadores}</p>
              </div>
              <div className="stat-card">
                <h3>Clases</h3>
                <p className="stat-number">{stats.clases}</p>
              </div>
              <div className="stat-card">
                <h3>Sedes</h3>
                <p className="stat-number">{stats.sedes}</p>
              </div>
              <div className="stat-card">
                <h3>Equipos</h3>
                <p className="stat-number">{stats.equipos}</p>
              </div>
              <div className="stat-card">
                <h3>Membresías</h3>
                <p className="stat-number">{stats.membresias}</p>
              </div>
              <div className="stat-card">
                <h3>Ingresos Totales</h3>
                <p className="stat-number">S/ {stats.ingresos.toFixed(2)}</p>
              </div>
            </div>

            <div className="dashboard-sections">
              <section className="dashboard-section">
                <h2>Gestión del Gimnasio</h2>
                <p>Administra sedes, equipos y horarios del gimnasio.</p>
                <button className="btn-primary" onClick={() => handleCreate('sede')} style={{marginTop: '15px'}}>
                  Nueva Sede
                </button>
              </section>
              <section className="dashboard-section">
                <h2>Gestión de Usuarios</h2>
                <p>Crear y gestionar cuentas de entrenadores y usuarios. Asignar roles y permisos.</p>
                <button className="btn-primary" onClick={() => handleCreate('usuario')} style={{marginTop: '15px'}}>
                  Nuevo Usuario
                </button>
              </section>
              <section className="dashboard-section">
                <h2>Membresías y Pagos</h2>
                <p>Crear tipos de membresía, asignar membresías y registrar pagos.</p>
                <button className="btn-primary" onClick={() => handleCreate('membresia')} style={{marginTop: '15px'}}>
                  Nueva Membresía
                </button>
              </section>
              <section className="dashboard-section">
                <h2>Reportes</h2>
                <p>Genera reportes de ingresos, asistencia y desempeño.</p>
                <button className="btn-secondary" style={{marginTop: '15px'}}>
                  Generar Reporte
                </button>
              </section>
            </div>
          </>
        )}

        {activeTab === 'sedes' && (
          <div className="dashboard-section">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
              <h2>Gestión de Sedes</h2>
              <button className="btn-primary" onClick={() => handleCreate('sede')}>Nueva Sede</button>
            </div>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Dirección</th>
                    <th>Teléfono</th>
                    <th>Horario</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {sedes.map(sede => (
                    <tr key={sede.idSede}>
                      <td>{sede.nombre}</td>
                      <td>{sede.direccion}</td>
                      <td>{sede.telefono}</td>
                      <td>{sede.horarioApertura} - {sede.horarioCierre}</td>
                      <td>{sede.activa ? 'Activa' : 'Inactiva'}</td>
                      <td>
                        <button className="btn-secondary" style={{marginRight: '10px'}}>Editar</button>
                        <button className="btn-secondary">Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'equipos' && (
          <div className="dashboard-section">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
              <h2>Gestión de Equipos</h2>
              <button className="btn-primary" onClick={() => handleCreate('equipo')}>Nuevo Equipo</button>
            </div>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Tipo</th>
                    <th>Marca</th>
                    <th>Estado</th>
                    <th>Ubicación</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {equipos.map(equipo => (
                    <tr key={equipo.idEquipo}>
                      <td>{equipo.nombre}</td>
                      <td>{equipo.tipo}</td>
                      <td>{equipo.marca}</td>
                      <td>{equipo.estado}</td>
                      <td>{equipo.ubicacion}</td>
                      <td>
                        <button className="btn-secondary" style={{marginRight: '10px'}}>Editar</button>
                        <button className="btn-secondary">Mantenimiento</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'membresias' && (
          <div className="dashboard-section">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
              <h2>Tipos de Membresía</h2>
              <button className="btn-primary" onClick={() => handleCreate('tipoMembresia')}>Nuevo Tipo</button>
            </div>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Duración (días)</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {tiposMembresia.map(tipo => (
                    <tr key={tipo.idTipoMembresia}>
                      <td>{tipo.nombre}</td>
                      <td>S/ {tipo.precio}</td>
                      <td>{tipo.duracionDias}</td>
                      <td>{tipo.activa ? 'Activa' : 'Inactiva'}</td>
                      <td>
                        <button className="btn-secondary" style={{marginRight: '10px'}}>Editar</button>
                        <button className="btn-secondary">Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'pagos' && (
          <div className="dashboard-section">
            <h2>Registro de Pagos</h2>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Monto</th>
                    <th>Método</th>
                    <th>Estado</th>
                    <th>Comprobante</th>
                  </tr>
                </thead>
                <tbody>
                  {pagos.map(pago => (
                    <tr key={pago.idPago}>
                      <td>{new Date(pago.fechaPago).toLocaleDateString()}</td>
                      <td>S/ {pago.monto}</td>
                      <td>{pago.metodoPago}</td>
                      <td>{pago.estado}</td>
                      <td>{pago.comprobante || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'usuarios' && (
          <div className="dashboard-section">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
              <h2>Gestión de Usuarios</h2>
              <button className="btn-primary" onClick={() => handleCreate('usuario')}>Nuevo Usuario</button>
            </div>
            <p>Funcionalidad de gestión de usuarios en desarrollo...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardAdmin;
