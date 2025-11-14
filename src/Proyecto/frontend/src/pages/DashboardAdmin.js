import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  alumnoService, instructorService, claseService, 
  sedeService, equipoService, tipoMembresiaService,
  membresiaService, pagoService, usuarioService
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
    ingresos: 0,
    usuariosActivos: 0
  });
  const [sedes, setSedes] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const [tiposMembresia, setTiposMembresia] = useState([]);
  const [membresias, setMembresias] = useState([]);
  const [pagos, setPagos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [alumnos, setAlumnos] = useState([]);
  const [instructores, setInstructores] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [
        alumnosRes, entrenadoresRes, clasesRes, sedesRes, 
        equiposRes, tiposRes, membresiasRes, pagosRes, usuariosRes
      ] = await Promise.all([
        alumnoService.getAll(),
        instructorService.getAll(),
        claseService.getAll(),
        sedeService.getAll(),
        equipoService.getAll(),
        tipoMembresiaService.getAll(),
        membresiaService.getAll(),
        pagoService.getAll(),
        usuarioService.getAll()
      ]);
      
      setSedes(sedesRes.data);
      setEquipos(equiposRes.data);
      setTiposMembresia(tiposRes.data);
      setMembresias(membresiasRes.data);
      setPagos(pagosRes.data);
      setUsuarios(usuariosRes.data);
      setAlumnos(alumnosRes.data);
      setInstructores(entrenadoresRes.data);
      
      const totalIngresos = pagosRes.data.reduce((sum, pago) => sum + parseFloat(pago.monto || 0), 0);
      const usuariosActivos = usuariosRes.data.filter(u => u.estado).length;
      
      setStats({
        alumnos: alumnosRes.data.length,
        entrenadores: entrenadoresRes.data.length,
        clases: clasesRes.data.length,
        sedes: sedesRes.data.length,
        equipos: equiposRes.data.length,
        membresias: membresiasRes.data.length,
        ingresos: totalIngresos,
        usuariosActivos: usuariosActivos
      });
    } catch (error) {
      console.error('Error cargando datos:', error);
    }
  };

  const handleCreate = (type) => {
    setModalType(type);
    setEditingItem(null);
    setFormData({});
    setShowModal(true);
  };

  const handleEdit = (type, item) => {
    setModalType(type);
    setEditingItem(item);
    setFormData(item);
    setShowModal(true);
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm('¿Está seguro de eliminar este elemento?')) return;
    
    try {
      switch(type) {
        case 'sede':
          await sedeService.delete(id);
          break;
        case 'equipo':
          await equipoService.delete(id);
          break;
        case 'tipoMembresia':
          await tipoMembresiaService.delete(id);
          break;
        case 'usuario':
          await usuarioService.delete(id);
          break;
      }
      loadData();
    } catch (error) {
      console.error('Error eliminando:', error);
      alert('Error al eliminar el elemento');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      switch(modalType) {
        case 'sede':
          if (editingItem) {
            await sedeService.update(editingItem.idSede, formData);
          } else {
            await sedeService.create(formData);
          }
          break;
        case 'equipo':
          if (editingItem) {
            await equipoService.update(editingItem.idEquipo, formData);
          } else {
            await equipoService.create(formData);
          }
          break;
        case 'tipoMembresia':
          if (editingItem) {
            await tipoMembresiaService.update(editingItem.idTipoMembresia, formData);
          } else {
            await tipoMembresiaService.create(formData);
          }
          break;
        case 'membresia':
          if (editingItem) {
            await membresiaService.update(editingItem.idMembresia, formData);
          } else {
            await membresiaService.create(formData);
          }
          break;
        case 'pago':
          await pagoService.create(formData);
          break;
        case 'usuario':
          if (editingItem) {
            await usuarioService.update(editingItem.idUsuario, formData);
          } else {
            await usuarioService.create(formData);
          }
          break;
      }
      setShowModal(false);
      loadData();
    } catch (error) {
      console.error('Error guardando:', error);
      alert('Error al guardar los datos');
    }
  };

  const handleToggleEstado = async (type, id, estado) => {
    try {
      switch(type) {
        case 'usuario':
          await usuarioService.cambiarEstado(id, !estado);
          break;
        case 'sede':
          const sede = sedes.find(s => s.idSede === id);
          if (sede) {
            sede.activa = !estado;
            await sedeService.update(id, sede);
          }
          break;
      }
      loadData();
    } catch (error) {
      console.error('Error cambiando estado:', error);
    }
  };

  const handleResetPassword = async (id) => {
    const nuevaPassword = prompt('Ingrese la nueva contraseña:');
    if (!nuevaPassword) return;
    
    try {
      await usuarioService.resetPassword(id, nuevaPassword);
      alert('Contraseña restablecida correctamente');
    } catch (error) {
      console.error('Error restableciendo contraseña:', error);
      alert('Error al restablecer la contraseña');
    }
  };

  const handleExportReport = (type) => {
    // Función para exportar reportes (implementación básica)
    alert(`Exportando reporte de ${type}...`);
    // Aquí se implementaría la lógica de exportación a PDF/Excel
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>💪 FORCA & FITNESS - Dashboard Administrador</h1>
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
          <button className={`tab ${activeTab === 'usuarios' ? 'active' : ''}`} onClick={() => setActiveTab('usuarios')}>
            Usuarios
          </button>
          <button className={`tab ${activeTab === 'membresias' ? 'active' : ''}`} onClick={() => setActiveTab('membresias')}>
            Membresías
          </button>
          <button className={`tab ${activeTab === 'pagos' ? 'active' : ''}`} onClick={() => setActiveTab('pagos')}>
            Pagos
          </button>
          <button className={`tab ${activeTab === 'reportes' ? 'active' : ''}`} onClick={() => setActiveTab('reportes')}>
            Reportes
          </button>
        </div>

        {activeTab === 'overview' && (
          <>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Usuarios Activos</h3>
                <p className="stat-number">{stats.usuariosActivos}</p>
              </div>
              <div className="stat-card">
                <h3>Clientes</h3>
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
                <h3>Membresías Activas</h3>
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
                <div style={{display: 'flex', gap: '10px', marginTop: '15px'}}>
                  <button className="btn-primary" onClick={() => handleCreate('sede')}>
                    Nueva Sede
                  </button>
                  <button className="btn-secondary" onClick={() => setActiveTab('equipos')}>
                    Ver Equipos
                  </button>
                </div>
              </section>
              <section className="dashboard-section">
                <h2>Gestión de Usuarios</h2>
                <p>Crear y gestionar cuentas de entrenadores y usuarios. Asignar roles y permisos.</p>
                <div style={{display: 'flex', gap: '10px', marginTop: '15px'}}>
                  <button className="btn-primary" onClick={() => handleCreate('usuario')}>
                    Nuevo Usuario
                  </button>
                  <button className="btn-secondary" onClick={() => setActiveTab('usuarios')}>
                    Ver Usuarios
                  </button>
                </div>
              </section>
              <section className="dashboard-section">
                <h2>Membresías y Pagos</h2>
                <p>Crear tipos de membresía, asignar membresías y registrar pagos.</p>
                <div style={{display: 'flex', gap: '10px', marginTop: '15px'}}>
                  <button className="btn-primary" onClick={() => handleCreate('tipoMembresia')}>
                    Nuevo Tipo
                  </button>
                  <button className="btn-primary" onClick={() => handleCreate('membresia')}>
                    Asignar Membresía
                  </button>
                </div>
              </section>
              <section className="dashboard-section">
                <h2>Reportes y Estadísticas</h2>
                <p>Genera reportes de ingresos, asistencia y desempeño.</p>
                <div style={{display: 'flex', gap: '10px', marginTop: '15px'}}>
                  <button className="btn-secondary" onClick={() => setActiveTab('reportes')}>
                    Ver Reportes
                  </button>
                  <button className="btn-secondary" onClick={() => handleExportReport('ingresos')}>
                    Exportar PDF
                  </button>
                </div>
              </section>
            </div>
          </>
        )}

        {activeTab === 'sedes' && (
          <div className="dashboard-section">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px'}}>
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
                  {sedes.length > 0 ? (
                    sedes.map(sede => (
                      <tr key={sede.idSede}>
                        <td>{sede.nombre}</td>
                        <td>{sede.direccion}</td>
                        <td>{sede.telefono}</td>
                        <td>{sede.horarioApertura} - {sede.horarioCierre}</td>
                        <td>
                          <span style={{
                            padding: '4px 10px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: '500',
                            background: sede.activa ? '#d4edda' : '#f8d7da',
                            color: sede.activa ? '#155724' : '#721c24'
                          }}>
                            {sede.activa ? 'Activa' : 'Inactiva'}
                          </span>
                        </td>
                        <td>
                          <button className="btn-secondary" style={{marginRight: '8px', fontSize: '12px', padding: '6px 12px'}} 
                            onClick={() => handleEdit('sede', sede)}>Editar</button>
                          <button className="btn-secondary" style={{marginRight: '8px', fontSize: '12px', padding: '6px 12px'}}
                            onClick={() => handleToggleEstado('sede', sede.idSede, sede.activa)}>
                            {sede.activa ? 'Desactivar' : 'Activar'}
                          </button>
                          <button className="btn-secondary" style={{fontSize: '12px', padding: '6px 12px'}}
                            onClick={() => handleDelete('sede', sede.idSede)}>Eliminar</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" style={{textAlign: 'center', padding: '30px'}}>No hay sedes registradas</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'equipos' && (
          <div className="dashboard-section">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px'}}>
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
                    <th>Último Mantenimiento</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {equipos.length > 0 ? (
                    equipos.map(equipo => (
                      <tr key={equipo.idEquipo}>
                        <td>{equipo.nombre}</td>
                        <td>{equipo.tipo}</td>
                        <td>{equipo.marca}</td>
                        <td>
                          <span style={{
                            padding: '4px 10px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: '500',
                            background: equipo.estado === 'Disponible' ? '#d4edda' : 
                                       equipo.estado === 'En Mantenimiento' ? '#fff3cd' : '#f8d7da',
                            color: equipo.estado === 'Disponible' ? '#155724' : 
                                   equipo.estado === 'En Mantenimiento' ? '#856404' : '#721c24'
                          }}>
                            {equipo.estado || 'N/A'}
                          </span>
                        </td>
                        <td>{equipo.ubicacion || 'N/A'}</td>
                        <td>{equipo.fechaUltimoMantenimiento ? 
                          new Date(equipo.fechaUltimoMantenimiento).toLocaleDateString() : 'N/A'}</td>
                        <td>
                          <button className="btn-secondary" style={{marginRight: '8px', fontSize: '12px', padding: '6px 12px'}}
                            onClick={() => handleEdit('equipo', equipo)}>Editar</button>
                          <button className="btn-secondary" style={{fontSize: '12px', padding: '6px 12px'}}
                            onClick={() => {
                              const equipoEdit = {...equipo, estado: 'En Mantenimiento'};
                              handleEdit('equipo', equipoEdit);
                            }}>Mantenimiento</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" style={{textAlign: 'center', padding: '30px'}}>No hay equipos registrados</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'usuarios' && (
          <div className="dashboard-section">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px'}}>
              <h2>Gestión de Usuarios</h2>
              <button className="btn-primary" onClick={() => handleCreate('usuario')}>Nuevo Usuario</button>
            </div>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Usuario</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>Estado</th>
                    <th>Fecha Registro</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.length > 0 ? (
                    usuarios.map(usuario => (
                      <tr key={usuario.idUsuario}>
                        <td>{usuario.nameUsuario}</td>
                        <td>{usuario.email}</td>
                        <td>{usuario.rol?.nombreRol || 'N/A'}</td>
                        <td>
                          <span style={{
                            padding: '4px 10px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: '500',
                            background: usuario.estado ? '#d4edda' : '#f8d7da',
                            color: usuario.estado ? '#155724' : '#721c24'
                          }}>
                            {usuario.estado ? 'Activo' : 'Inactivo'}
                          </span>
                        </td>
                        <td>{new Date(usuario.fechaRegistro).toLocaleDateString()}</td>
                        <td>
                          <button className="btn-secondary" style={{marginRight: '8px', fontSize: '12px', padding: '6px 12px'}}
                            onClick={() => handleEdit('usuario', usuario)}>Editar</button>
                          <button className="btn-secondary" style={{marginRight: '8px', fontSize: '12px', padding: '6px 12px'}}
                            onClick={() => handleToggleEstado('usuario', usuario.idUsuario, usuario.estado)}>
                            {usuario.estado ? 'Suspender' : 'Activar'}
                          </button>
                          <button className="btn-secondary" style={{fontSize: '12px', padding: '6px 12px'}}
                            onClick={() => handleResetPassword(usuario.idUsuario)}>Reset Password</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" style={{textAlign: 'center', padding: '30px'}}>No hay usuarios registrados</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'membresias' && (
          <div className="dashboard-section">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px'}}>
              <h2>Tipos de Membresía</h2>
              <button className="btn-primary" onClick={() => handleCreate('tipoMembresia')}>Nuevo Tipo</button>
            </div>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Precio</th>
                    <th>Duración (días)</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {tiposMembresia.length > 0 ? (
                    tiposMembresia.map(tipo => (
                      <tr key={tipo.idTipoMembresia}>
                        <td>{tipo.nombre}</td>
                        <td>{tipo.descripcion || 'N/A'}</td>
                        <td>S/ {parseFloat(tipo.precio).toFixed(2)}</td>
                        <td>{tipo.duracionDias}</td>
                        <td>
                          <span style={{
                            padding: '4px 10px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: '500',
                            background: tipo.activa ? '#d4edda' : '#f8d7da',
                            color: tipo.activa ? '#155724' : '#721c24'
                          }}>
                            {tipo.activa ? 'Activa' : 'Inactiva'}
                          </span>
                        </td>
                        <td>
                          <button className="btn-secondary" style={{marginRight: '8px', fontSize: '12px', padding: '6px 12px'}}
                            onClick={() => handleEdit('tipoMembresia', tipo)}>Editar</button>
                          <button className="btn-secondary" style={{fontSize: '12px', padding: '6px 12px'}}
                            onClick={() => handleDelete('tipoMembresia', tipo.idTipoMembresia)}>Eliminar</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" style={{textAlign: 'center', padding: '30px'}}>No hay tipos de membresía registrados</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <h3 style={{marginTop: '40px', marginBottom: '20px'}}>Membresías Asignadas</h3>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Tipo</th>
                    <th>Fecha Inicio</th>
                    <th>Fecha Fin</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {membresias.length > 0 ? (
                    membresias.map(membresia => (
                      <tr key={membresia.idMembresia}>
                        <td>{membresia.alumno?.nameAlumno} {membresia.alumno?.apellidosAlumno}</td>
                        <td>{membresia.tipoMembresia?.nombre}</td>
                        <td>{new Date(membresia.fechaInicio).toLocaleDateString()}</td>
                        <td>{new Date(membresia.fechaFin).toLocaleDateString()}</td>
                        <td>
                          <span style={{
                            padding: '4px 10px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: '500',
                            background: membresia.estado === 'Activa' ? '#d4edda' : '#f8d7da',
                            color: membresia.estado === 'Activa' ? '#155724' : '#721c24'
                          }}>
                            {membresia.estado}
                          </span>
                        </td>
                        <td>
                          <button className="btn-secondary" style={{marginRight: '8px', fontSize: '12px', padding: '6px 12px'}}
                            onClick={() => handleEdit('membresia', membresia)}>Editar</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" style={{textAlign: 'center', padding: '30px'}}>No hay membresías asignadas</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'pagos' && (
          <div className="dashboard-section">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px'}}>
              <h2>Registro de Pagos</h2>
              <button className="btn-primary" onClick={() => handleCreate('pago')}>Registrar Pago</button>
            </div>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Cliente</th>
                    <th>Membresía</th>
                    <th>Monto</th>
                    <th>Método</th>
                    <th>Estado</th>
                    <th>Comprobante</th>
                  </tr>
                </thead>
                <tbody>
                  {pagos.length > 0 ? (
                    pagos.map(pago => (
                      <tr key={pago.idPago}>
                        <td>{new Date(pago.fechaPago).toLocaleDateString()}</td>
                        <td>{pago.membresia?.alumno?.nameAlumno} {pago.membresia?.alumno?.apellidosAlumno}</td>
                        <td>{pago.membresia?.tipoMembresia?.nombre}</td>
                        <td>S/ {parseFloat(pago.monto).toFixed(2)}</td>
                        <td>{pago.metodoPago}</td>
                        <td>
                          <span style={{
                            padding: '4px 10px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: '500',
                            background: pago.estado === 'Pagado' ? '#d4edda' : '#f8d7da',
                            color: pago.estado === 'Pagado' ? '#155724' : '#721c24'
                          }}>
                            {pago.estado}
                          </span>
                        </td>
                        <td>{pago.comprobante || 'N/A'}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" style={{textAlign: 'center', padding: '30px'}}>No hay pagos registrados</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'reportes' && (
          <div className="dashboard-section">
            <h2>Reportes y Estadísticas</h2>
            <div className="dashboard-sections" style={{marginTop: '30px'}}>
              <section className="dashboard-section">
                <h3>Reporte de Ingresos</h3>
                <p>Ingresos totales: S/ {stats.ingresos.toFixed(2)}</p>
                <p>Total de pagos: {pagos.length}</p>
                <p>Pagos del mes: {pagos.filter(p => {
                  const fecha = new Date(p.fechaPago);
                  const ahora = new Date();
                  return fecha.getMonth() === ahora.getMonth() && fecha.getFullYear() === ahora.getFullYear();
                }).length}</p>
                <button className="btn-secondary" onClick={() => handleExportReport('ingresos')} style={{marginTop: '15px'}}>
                  Exportar a PDF
                </button>
              </section>
              <section className="dashboard-section">
                <h3>Reporte de Asistencia</h3>
                <p>Clientes activos: {stats.alumnos}</p>
                <p>Membresías activas: {membresias.filter(m => m.estado === 'Activa').length}</p>
                <p>Membresías vencidas: {membresias.filter(m => m.estado === 'Vencida').length}</p>
                <button className="btn-secondary" onClick={() => handleExportReport('asistencia')} style={{marginTop: '15px'}}>
                  Exportar a Excel
                </button>
              </section>
              <section className="dashboard-section">
                <h3>Desempeño de Entrenadores</h3>
                <p>Total entrenadores: {stats.entrenadores}</p>
                <p>Clases activas: {stats.clases}</p>
                <button className="btn-secondary" onClick={() => handleExportReport('entrenadores')} style={{marginTop: '15px'}}>
                  Ver Detalles
                </button>
              </section>
            </div>
          </div>
        )}

        {showModal && (
          <div className="modal" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>
                  {editingItem ? 'Editar' : 'Nuevo'} {
                    modalType === 'sede' ? 'Sede' :
                    modalType === 'equipo' ? 'Equipo' :
                    modalType === 'tipoMembresia' ? 'Tipo de Membresía' :
                    modalType === 'membresia' ? 'Membresía' :
                    modalType === 'pago' ? 'Pago' :
                    modalType === 'usuario' ? 'Usuario' : ''
                  }
                </h3>
                <button className="close-button" onClick={() => setShowModal(false)}>✕</button>
              </div>
              <form onSubmit={handleSubmit}>
                {modalType === 'sede' && (
                  <>
                    <div className="form-group">
                      <label>Nombre</label>
                      <input type="text" value={formData.nombre || ''} 
                        onChange={(e) => setFormData({...formData, nombre: e.target.value})} required />
                    </div>
                    <div className="form-group">
                      <label>Dirección</label>
                      <input type="text" value={formData.direccion || ''} 
                        onChange={(e) => setFormData({...formData, direccion: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label>Teléfono</label>
                      <input type="text" value={formData.telefono || ''} 
                        onChange={(e) => setFormData({...formData, telefono: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label>Horario Apertura</label>
                      <input type="text" value={formData.horarioApertura || ''} 
                        onChange={(e) => setFormData({...formData, horarioApertura: e.target.value})} 
                        placeholder="Ej: 06:00" />
                    </div>
                    <div className="form-group">
                      <label>Horario Cierre</label>
                      <input type="text" value={formData.horarioCierre || ''} 
                        onChange={(e) => setFormData({...formData, horarioCierre: e.target.value})} 
                        placeholder="Ej: 22:00" />
                    </div>
                    <div className="form-group">
                      <label>
                        <input type="checkbox" checked={formData.activa !== false} 
                          onChange={(e) => setFormData({...formData, activa: e.target.checked})} />
                        Activa
                      </label>
                    </div>
                  </>
                )}

                {modalType === 'equipo' && (
                  <>
                    <div className="form-group">
                      <label>Sede</label>
                      <select value={formData.sede?.idSede || ''} 
                        onChange={(e) => setFormData({...formData, sede: {idSede: parseInt(e.target.value)}})} required>
                        <option value="">Seleccionar sede</option>
                        {sedes.map(s => (
                          <option key={s.idSede} value={s.idSede}>{s.nombre}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Nombre</label>
                      <input type="text" value={formData.nombre || ''} 
                        onChange={(e) => setFormData({...formData, nombre: e.target.value})} required />
                    </div>
                    <div className="form-group">
                      <label>Tipo</label>
                      <input type="text" value={formData.tipo || ''} 
                        onChange={(e) => setFormData({...formData, tipo: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label>Marca</label>
                      <input type="text" value={formData.marca || ''} 
                        onChange={(e) => setFormData({...formData, marca: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label>Modelo</label>
                      <input type="text" value={formData.modelo || ''} 
                        onChange={(e) => setFormData({...formData, modelo: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label>Estado</label>
                      <select value={formData.estado || 'Disponible'} 
                        onChange={(e) => setFormData({...formData, estado: e.target.value})}>
                        <option value="Disponible">Disponible</option>
                        <option value="En Mantenimiento">En Mantenimiento</option>
                        <option value="Fuera de Servicio">Fuera de Servicio</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Ubicación</label>
                      <input type="text" value={formData.ubicacion || ''} 
                        onChange={(e) => setFormData({...formData, ubicacion: e.target.value})} />
                    </div>
                  </>
                )}

                {modalType === 'tipoMembresia' && (
                  <>
                    <div className="form-group">
                      <label>Nombre</label>
                      <input type="text" value={formData.nombre || ''} 
                        onChange={(e) => setFormData({...formData, nombre: e.target.value})} required />
                    </div>
                    <div className="form-group">
                      <label>Descripción</label>
                      <textarea value={formData.descripcion || ''} 
                        onChange={(e) => setFormData({...formData, descripcion: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label>Precio</label>
                      <input type="number" step="0.01" value={formData.precio || ''} 
                        onChange={(e) => setFormData({...formData, precio: parseFloat(e.target.value)})} required />
                    </div>
                    <div className="form-group">
                      <label>Duración (días)</label>
                      <input type="number" value={formData.duracionDias || ''} 
                        onChange={(e) => setFormData({...formData, duracionDias: parseInt(e.target.value)})} required />
                    </div>
                    <div className="form-group">
                      <label>
                        <input type="checkbox" checked={formData.activa !== false} 
                          onChange={(e) => setFormData({...formData, activa: e.target.checked})} />
                        Activa
                      </label>
                    </div>
                  </>
                )}

                {modalType === 'membresia' && (
                  <>
                    <div className="form-group">
                      <label>Cliente</label>
                      <select value={formData.alumno?.idAlumno || ''} 
                        onChange={(e) => setFormData({...formData, alumno: {idAlumno: parseInt(e.target.value)}})} required>
                        <option value="">Seleccionar cliente</option>
                        {alumnos.map(a => (
                          <option key={a.idAlumno} value={a.idAlumno}>
                            {a.nameAlumno} {a.apellidosAlumno}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Tipo de Membresía</label>
                      <select value={formData.tipoMembresia?.idTipoMembresia || ''} 
                        onChange={(e) => setFormData({...formData, tipoMembresia: {idTipoMembresia: parseInt(e.target.value)}})} required>
                        <option value="">Seleccionar tipo</option>
                        {tiposMembresia.filter(t => t.activa).map(t => (
                          <option key={t.idTipoMembresia} value={t.idTipoMembresia}>
                            {t.nombre} - S/ {parseFloat(t.precio).toFixed(2)}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Fecha Inicio</label>
                      <input type="date" value={formData.fechaInicio || ''} 
                        onChange={(e) => setFormData({...formData, fechaInicio: e.target.value})} required />
                    </div>
                    <div className="form-group">
                      <label>Fecha Fin</label>
                      <input type="date" value={formData.fechaFin || ''} 
                        onChange={(e) => setFormData({...formData, fechaFin: e.target.value})} required />
                    </div>
                    <div className="form-group">
                      <label>Estado</label>
                      <select value={formData.estado || 'Activa'} 
                        onChange={(e) => setFormData({...formData, estado: e.target.value})}>
                        <option value="Activa">Activa</option>
                        <option value="Vencida">Vencida</option>
                        <option value="Suspendida">Suspendida</option>
                      </select>
                    </div>
                  </>
                )}

                {modalType === 'pago' && (
                  <>
                    <div className="form-group">
                      <label>Membresía</label>
                      <select value={formData.membresia?.idMembresia || ''} 
                        onChange={(e) => setFormData({...formData, membresia: {idMembresia: parseInt(e.target.value)}})} required>
                        <option value="">Seleccionar membresía</option>
                        {membresias.map(m => (
                          <option key={m.idMembresia} value={m.idMembresia}>
                            {m.alumno?.nameAlumno} - {m.tipoMembresia?.nombre}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Monto</label>
                      <input type="number" step="0.01" value={formData.monto || ''} 
                        onChange={(e) => setFormData({...formData, monto: parseFloat(e.target.value)})} required />
                    </div>
                    <div className="form-group">
                      <label>Fecha de Pago</label>
                      <input type="date" value={formData.fechaPago || ''} 
                        onChange={(e) => setFormData({...formData, fechaPago: e.target.value})} required />
                    </div>
                    <div className="form-group">
                      <label>Método de Pago</label>
                      <select value={formData.metodoPago || ''} 
                        onChange={(e) => setFormData({...formData, metodoPago: e.target.value})} required>
                        <option value="">Seleccionar método</option>
                        <option value="Efectivo">Efectivo</option>
                        <option value="Tarjeta">Tarjeta</option>
                        <option value="Transferencia">Transferencia</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Comprobante</label>
                      <input type="text" value={formData.comprobante || ''} 
                        onChange={(e) => setFormData({...formData, comprobante: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label>Estado</label>
                      <select value={formData.estado || 'Pagado'} 
                        onChange={(e) => setFormData({...formData, estado: e.target.value})}>
                        <option value="Pagado">Pagado</option>
                        <option value="Pendiente">Pendiente</option>
                        <option value="Cancelado">Cancelado</option>
                      </select>
                    </div>
                  </>
                )}

                {modalType === 'usuario' && (
                  <>
                    <div className="form-group">
                      <label>Nombre de Usuario</label>
                      <input type="text" value={formData.nameUsuario || ''} 
                        onChange={(e) => setFormData({...formData, nameUsuario: e.target.value})} required />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input type="email" value={formData.email || ''} 
                        onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                    </div>
                    <div className="form-group">
                      <label>Contraseña</label>
                      <input type="password" value={formData.passwordUsuario || ''} 
                        onChange={(e) => setFormData({...formData, passwordUsuario: e.target.value})} 
                        required={!editingItem} />
                    </div>
                    <div className="form-group">
                      <label>Rol</label>
                      <select value={formData.rol?.idRol || ''} 
                        onChange={(e) => setFormData({...formData, rol: {idRol: parseInt(e.target.value)}})} required>
                        <option value="">Seleccionar rol</option>
                        <option value="1">Administrador</option>
                        <option value="2">Entrenador</option>
                        <option value="3">Usuario</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>
                        <input type="checkbox" checked={formData.estado !== false} 
                          onChange={(e) => setFormData({...formData, estado: e.target.checked})} />
                        Activo
                      </label>
                    </div>
                  </>
                )}

                <div style={{display: 'flex', gap: '10px', marginTop: '25px'}}>
                  <button type="submit" className="btn-primary">Guardar</button>
                  <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardAdmin;
