import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  instructorService, claseService, planNutricionalService, 
  alumnoService, rutinaService, ejercicioService, 
  seguimientoFisicoService, alumnoInstructorService,
  rutinaEjercicioService, mensajeService, foodDataService
} from '../services/api';
import './Dashboard.css';

const DashboardEntrenador = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [instructorId, setInstructorId] = useState(null);
  const [stats, setStats] = useState({
    clases: 0,
    planes: 0,
    alumnos: 0,
    rutinas: 0,
    seguimientos: 0
  });
  const [clases, setClases] = useState([]);
  const [planes, setPlanes] = useState([]);
  const [alumnos, setAlumnos] = useState([]);
  const [clientesAsignados, setClientesAsignados] = useState([]);
  const [rutinas, setRutinas] = useState([]);
  const [ejercicios, setEjercicios] = useState([]);
  const [ejerciciosRutina, setEjerciciosRutina] = useState([]);
  const [seguimientos, setSeguimientos] = useState([]);
  const [mensajes, setMensajes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [selectedRutina, setSelectedRutina] = useState(null);
  const [foodSearch, setFoodSearch] = useState('');
  const [foodResults, setFoodResults] = useState([]);
  const [filterGrupoMuscular, setFilterGrupoMuscular] = useState('');
  const [filterNivel, setFilterNivel] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const instructorRes = await instructorService.getByUsuario(user.idUsuario);
      const instructor = instructorRes.data;
      if (instructor?.idInstructor) {
        setInstructorId(instructor.idInstructor);
        
        const [
          clasesRes, planesRes, clientesRes, rutinasRes, 
          ejerciciosRes, seguimientosRes, mensajesRes
        ] = await Promise.all([
          claseService.getByInstructor(instructor.idInstructor),
          planNutricionalService.getByInstructor(instructor.idInstructor),
          alumnoInstructorService.getByInstructor(instructor.idInstructor),
          rutinaService.getByInstructor(instructor.idInstructor),
          ejercicioService.getAll(),
          seguimientoFisicoService.getByInstructor(instructor.idInstructor),
          mensajeService.getByDestinatario(user.idUsuario)
        ]);

        setClases(clasesRes.data);
        setPlanes(planesRes.data);
        setClientesAsignados(clientesRes.data);
        setRutinas(rutinasRes.data);
        setEjercicios(ejerciciosRes.data);
        setSeguimientos(seguimientosRes.data);
        setMensajes(mensajesRes.data);
        
        // Cargar alumnos asignados
        const alumnosIds = clientesRes.data.map(c => c.alumno.idAlumno);
        const alumnosData = await Promise.all(
          alumnosIds.map(id => alumnoService.getById(id).then(r => r.data))
        );
        setAlumnos(alumnosData);
        
        setStats({
          clases: clasesRes.data.length,
          planes: planesRes.data.length,
          alumnos: clientesRes.data.length,
          rutinas: rutinasRes.data.length,
          seguimientos: seguimientosRes.data.length
        });
      }
    } catch (error) {
      console.error('Error cargando datos:', error);
    }
  };

  const handleCreate = (type, clienteId = null) => {
    setModalType(type);
    setEditingItem(null);
    const initialData = {};
    if (clienteId) {
      initialData.alumno = { idAlumno: clienteId };
    }
    if (instructorId) {
      initialData.instructor = { idInstructor: instructorId };
    }
    setFormData(initialData);
    setShowModal(true);
  };

  const handleEdit = (type, item) => {
    setModalType(type);
    setEditingItem(item);
    setFormData(item);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      switch(modalType) {
        case 'seguimiento':
          if (editingItem) {
            await seguimientoFisicoService.update(editingItem.idSeguimiento, formData);
          } else {
            await seguimientoFisicoService.create(formData);
          }
          break;
        case 'rutina':
          if (editingItem) {
            await rutinaService.update(editingItem.idRutina, formData);
          } else {
            const rutinaRes = await rutinaService.create(formData);
            if (formData.ejercicios && formData.ejercicios.length > 0) {
              // Crear ejercicios de la rutina
              await Promise.all(
                formData.ejercicios.map(ej => 
                  rutinaEjercicioService.create({
                    ...ej,
                    rutina: { idRutina: rutinaRes.data.idRutina }
                  })
                )
              );
            }
          }
          break;
        case 'ejercicio':
          if (editingItem) {
            await ejercicioService.update(editingItem.idEjercicio, formData);
          } else {
            await ejercicioService.create(formData);
          }
          break;
        case 'planNutricional':
          if (editingItem) {
            await planNutricionalService.update(editingItem.idPlan, formData);
          } else {
            await planNutricionalService.create(formData);
          }
          break;
        case 'mensaje':
          await mensajeService.create({
            ...formData,
            remitente: { idUsuario: user.idUsuario }
          });
          break;
      }
      setShowModal(false);
      loadData();
    } catch (error) {
      console.error('Error guardando:', error);
      alert('Error al guardar los datos');
    }
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm('¿Está seguro de eliminar este elemento?')) return;
    
    try {
      switch(type) {
        case 'rutina':
          await rutinaService.delete(id);
          break;
        case 'ejercicio':
          await ejercicioService.delete(id);
          break;
        case 'rutinaEjercicio':
          await rutinaEjercicioService.delete(id);
          break;
      }
      loadData();
    } catch (error) {
      console.error('Error eliminando:', error);
      alert('Error al eliminar el elemento');
    }
  };

  const handleViewCliente = async (cliente) => {
    setSelectedCliente(cliente);
    try {
      const [rutinasCliente, seguimientosCliente] = await Promise.all([
        rutinaService.getByAlumno(cliente.alumno.idAlumno),
        seguimientoFisicoService.getByAlumno(cliente.alumno.idAlumno)
      ]);
      setRutinas(rutinasCliente.data);
      setSeguimientos(seguimientosCliente.data);
      setActiveTab('clientes');
    } catch (error) {
      console.error('Error cargando datos del cliente:', error);
    }
  };

  const handleViewRutina = async (rutina) => {
    setSelectedRutina(rutina);
    try {
      const ejerciciosRes = await rutinaEjercicioService.getByRutina(rutina.idRutina);
      setEjerciciosRutina(ejerciciosRes.data);
      setShowModal(true);
      setModalType('verRutina');
    } catch (error) {
      console.error('Error cargando ejercicios de la rutina:', error);
    }
  };

  const handleFoodSearch = async () => {
    try {
      const response = await foodDataService.search(foodSearch);
      setFoodResults(response.data.foods || []);
    } catch (error) {
      console.error('Error buscando alimentos:', error);
      alert('Error al buscar alimentos');
    }
  };

  const ejerciciosFiltrados = ejercicios.filter(ej => {
    return (!filterGrupoMuscular || ej.grupoMuscular === filterGrupoMuscular) &&
           (!filterNivel || ej.nivel === filterNivel);
  });

  const gruposMusculares = [...new Set(ejercicios.map(e => e.grupoMuscular).filter(Boolean))];
  const niveles = [...new Set(ejercicios.map(e => e.nivel).filter(Boolean))];

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>💪 FORCA & FITNESS - Dashboard Entrenador</h1>
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
          <button className={`tab ${activeTab === 'nutricion' ? 'active' : ''}`} onClick={() => setActiveTab('nutricion')}>
            Nutrición
          </button>
          <button className={`tab ${activeTab === 'seguimiento' ? 'active' : ''}`} onClick={() => setActiveTab('seguimiento')}>
            Seguimiento
          </button>
          <button className={`tab ${activeTab === 'comunicacion' ? 'active' : ''}`} onClick={() => setActiveTab('comunicacion')}>
            Comunicación
          </button>
        </div>

        {activeTab === 'overview' && (
          <>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Mis Clientes</h3>
                <p className="stat-number">{stats.alumnos}</p>
              </div>
              <div className="stat-card">
                <h3>Rutinas Activas</h3>
                <p className="stat-number">{stats.rutinas}</p>
              </div>
              <div className="stat-card">
                <h3>Mis Clases</h3>
                <p className="stat-number">{stats.clases}</p>
              </div>
              <div className="stat-card">
                <h3>Planes Nutricionales</h3>
                <p className="stat-number">{stats.planes}</p>
              </div>
              <div className="stat-card">
                <h3>Registros de Seguimiento</h3>
                <p className="stat-number">{stats.seguimientos}</p>
              </div>
              <div className="stat-card">
                <h3>Mensajes</h3>
                <p className="stat-number">{mensajes.filter(m => !m.leido).length}</p>
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
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px'}}>
              <h2>Mis Clientes</h2>
            </div>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>DNI</th>
                    <th>Teléfono</th>
                    <th>Email</th>
                    <th>Fecha Asignación</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {clientesAsignados.length > 0 ? (
                    clientesAsignados.map(cliente => (
                      <tr key={cliente.idAlumnoInstructor}>
                        <td>{cliente.alumno.nameAlumno} {cliente.alumno.apellidosAlumno}</td>
                        <td>{cliente.alumno.dni}</td>
                        <td>{cliente.alumno.telefono}</td>
                        <td>{cliente.alumno.email}</td>
                        <td>{new Date(cliente.fechaAsignacion).toLocaleDateString()}</td>
                        <td>
                          <span style={{
                            padding: '4px 10px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: '500',
                            background: cliente.estado === 'Activo' ? '#d4edda' : '#f8d7da',
                            color: cliente.estado === 'Activo' ? '#155724' : '#721c24'
                          }}>
                            {cliente.estado || 'Activo'}
                          </span>
                        </td>
                        <td>
                          <button className="btn-secondary" style={{marginRight: '8px', fontSize: '12px', padding: '6px 12px'}}
                            onClick={() => handleViewCliente(cliente)}>Ver Historial</button>
                          <button className="btn-secondary" style={{fontSize: '12px', padding: '6px 12px'}}
                            onClick={() => handleCreate('seguimiento', cliente.alumno.idAlumno)}>Nuevo Registro</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" style={{textAlign: 'center', padding: '30px'}}>No tienes clientes asignados</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {selectedCliente && (
              <div style={{marginTop: '40px'}}>
                <h3>Historial de {selectedCliente.alumno.nameAlumno}</h3>
                
                <div style={{marginTop: '25px'}}>
                  <h4>Rutinas Asignadas</h4>
                  <div className="data-list">
                    {rutinas.length > 0 ? (
                      rutinas.map(rutina => (
                        <div key={rutina.idRutina} className="data-item">
                          <h4>{rutina.nombre}</h4>
                          <p><strong>Objetivo:</strong> {rutina.objetivo}</p>
                          <p>{rutina.descripcion}</p>
                          <span>Fecha inicio: {new Date(rutina.fechaInicio).toLocaleDateString()}</span>
                          <span>Estado: {rutina.activa ? 'Activa' : 'Inactiva'}</span>
                          <div style={{marginTop: '10px'}}>
                            <button className="btn-secondary" style={{marginRight: '10px'}}
                              onClick={() => handleViewRutina(rutina)}>Ver Ejercicios</button>
                            <button className="btn-secondary" onClick={() => handleEdit('rutina', rutina)}>Editar</button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>No hay rutinas asignadas</p>
                    )}
                  </div>
                </div>

                <div style={{marginTop: '25px'}}>
                  <h4>Progreso Físico</h4>
                  <div className="table-container">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Fecha</th>
                          <th>Peso (kg)</th>
                          <th>Grasa (%)</th>
                          <th>Músculo (kg)</th>
                          <th>Cintura (cm)</th>
                          <th>Notas</th>
                        </tr>
                      </thead>
                      <tbody>
                        {seguimientos.length > 0 ? (
                          seguimientos.map(seg => (
                            <tr key={seg.idSeguimiento}>
                              <td>{new Date(seg.fechaRegistro).toLocaleDateString()}</td>
                              <td>{seg.peso || 'N/A'}</td>
                              <td>{seg.grasaCorporal || 'N/A'}</td>
                              <td>{seg.musculo || 'N/A'}</td>
                              <td>{seg.medidaCintura || 'N/A'}</td>
                              <td>{seg.notas || 'N/A'}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6" style={{textAlign: 'center', padding: '30px'}}>No hay registros de seguimiento</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'rutinas' && (
          <div className="dashboard-section">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px'}}>
              <h2>Rutinas de Entrenamiento</h2>
              <button className="btn-primary" onClick={() => handleCreate('rutina')}>Nueva Rutina</button>
            </div>
            <div className="data-list">
              {rutinas.length > 0 ? (
                rutinas.map(rutina => (
                  <div key={rutina.idRutina} className="data-item">
                    <h4>{rutina.nombre} - {rutina.alumno?.nameAlumno} {rutina.alumno?.apellidosAlumno}</h4>
                    <p><strong>Objetivo:</strong> {rutina.objetivo}</p>
                    <p>{rutina.descripcion}</p>
                    <span>Fecha inicio: {new Date(rutina.fechaInicio).toLocaleDateString()}</span>
                    <span>Estado: {rutina.activa ? 'Activa' : 'Inactiva'}</span>
                    <div style={{marginTop: '10px'}}>
                      <button className="btn-secondary" style={{marginRight: '10px'}}
                        onClick={() => handleViewRutina(rutina)}>Ver Ejercicios</button>
                      <button className="btn-secondary" style={{marginRight: '10px'}}
                        onClick={() => handleEdit('rutina', rutina)}>Editar</button>
                      <button className="btn-secondary" onClick={() => handleDelete('rutina', rutina.idRutina)}>Eliminar</button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No hay rutinas creadas</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'ejercicios' && (
          <div className="dashboard-section">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px'}}>
              <h2>Base de Datos de Ejercicios</h2>
              <button className="btn-primary" onClick={() => handleCreate('ejercicio')}>Nuevo Ejercicio</button>
            </div>
            
            <div style={{display: 'flex', gap: '15px', marginBottom: '25px'}}>
              <div className="form-group" style={{flex: 1}}>
                <label>Filtrar por Grupo Muscular</label>
                <select value={filterGrupoMuscular} onChange={(e) => setFilterGrupoMuscular(e.target.value)}>
                  <option value="">Todos</option>
                  {gruposMusculares.map(g => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>
              <div className="form-group" style={{flex: 1}}>
                <label>Filtrar por Nivel</label>
                <select value={filterNivel} onChange={(e) => setFilterNivel(e.target.value)}>
                  <option value="">Todos</option>
                  {niveles.map(n => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Grupo Muscular</th>
                    <th>Nivel</th>
                    <th>Descripción</th>
                    <th>Video</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {ejerciciosFiltrados.length > 0 ? (
                    ejerciciosFiltrados.map(ejercicio => (
                      <tr key={ejercicio.idEjercicio}>
                        <td>{ejercicio.nombre}</td>
                        <td>{ejercicio.grupoMuscular}</td>
                        <td>{ejercicio.nivel}</td>
                        <td>{ejercicio.descripcion?.substring(0, 50)}...</td>
                        <td>
                          {ejercicio.videoUrl ? (
                            <a href={ejercicio.videoUrl} target="_blank" rel="noopener noreferrer">Ver Video</a>
                          ) : 'N/A'}
                        </td>
                        <td>
                          <button className="btn-secondary" style={{marginRight: '8px', fontSize: '12px', padding: '6px 12px'}}
                            onClick={() => handleEdit('ejercicio', ejercicio)}>Editar</button>
                          <button className="btn-secondary" style={{fontSize: '12px', padding: '6px 12px'}}
                            onClick={() => handleDelete('ejercicio', ejercicio.idEjercicio)}>Eliminar</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" style={{textAlign: 'center', padding: '30px'}}>No hay ejercicios registrados</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'nutricion' && (
          <div className="dashboard-section">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px'}}>
              <h2>Planes Nutricionales</h2>
              <button className="btn-primary" onClick={() => handleCreate('planNutricional')}>Nuevo Plan</button>
            </div>
            
            <div className="data-list">
              {planes.length > 0 ? (
                planes.map(plan => (
                  <div key={plan.idPlan} className="data-item">
                    <h4>{plan.namePlan} - {plan.alumno?.nameAlumno} {plan.alumno?.apellidosAlumno}</h4>
                    <p><strong>Objetivo:</strong> {plan.objetivo}</p>
                    <p><strong>Calorías diarias:</strong> {plan.caloriasDiarias}</p>
                    <p>{plan.descripcion}</p>
                    <p><strong>Notas:</strong> {plan.notasPersonalizacion}</p>
                    <span>Estado: {plan.estado}</span>
                    <div style={{marginTop: '10px'}}>
                      <button className="btn-secondary" onClick={() => handleEdit('planNutricional', plan)}>Editar</button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No hay planes nutricionales creados</p>
              )}
            </div>

            <div style={{marginTop: '40px', padding: '25px', background: '#fafafa', borderRadius: '12px'}}>
              <h3>Búsqueda de Alimentos - FoodData Central</h3>
              <div style={{display: 'flex', gap: '10px', marginTop: '15px'}}>
                <input 
                  type="text" 
                  value={foodSearch} 
                  onChange={(e) => setFoodSearch(e.target.value)}
                  placeholder="Buscar alimento..."
                  style={{flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #e8e8e8'}}
                />
                <button className="btn-primary" onClick={handleFoodSearch}>Buscar</button>
              </div>
              
              {foodResults.length > 0 && (
                <div style={{marginTop: '20px'}}>
                  <h4>Resultados:</h4>
                  <div className="table-container" style={{marginTop: '15px'}}>
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Descripción</th>
                          <th>Marca</th>
                          <th>Calorías</th>
                        </tr>
                      </thead>
                      <tbody>
                        {foodResults.slice(0, 10).map((food, idx) => (
                          <tr key={idx}>
                            <td>{food.description}</td>
                            <td>{food.brandOwner || 'N/A'}</td>
                            <td>
                              {food.foodNutrients?.find(n => n.nutrientId === 1008)?.value || 'N/A'} kcal
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'seguimiento' && (
          <div className="dashboard-section">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px'}}>
              <h2>Seguimiento Físico de Clientes</h2>
              <button className="btn-primary" onClick={() => handleCreate('seguimiento')}>Nuevo Registro</button>
            </div>
            
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Fecha</th>
                    <th>Peso (kg)</th>
                    <th>Altura (cm)</th>
                    <th>Grasa (%)</th>
                    <th>Músculo (kg)</th>
                    <th>Pecho (cm)</th>
                    <th>Cintura (cm)</th>
                    <th>Cadera (cm)</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {seguimientos.length > 0 ? (
                    seguimientos.map(seg => (
                      <tr key={seg.idSeguimiento}>
                        <td>{seg.alumno?.nameAlumno} {seg.alumno?.apellidosAlumno}</td>
                        <td>{new Date(seg.fechaRegistro).toLocaleDateString()}</td>
                        <td>{seg.peso || 'N/A'}</td>
                        <td>{seg.altura || 'N/A'}</td>
                        <td>{seg.grasaCorporal || 'N/A'}</td>
                        <td>{seg.musculo || 'N/A'}</td>
                        <td>{seg.medidaPecho || 'N/A'}</td>
                        <td>{seg.medidaCintura || 'N/A'}</td>
                        <td>{seg.medidaCadera || 'N/A'}</td>
                        <td>
                          <button className="btn-secondary" style={{fontSize: '12px', padding: '6px 12px'}}
                            onClick={() => handleEdit('seguimiento', seg)}>Editar</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="10" style={{textAlign: 'center', padding: '30px'}}>No hay registros de seguimiento</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'comunicacion' && (
          <div className="dashboard-section">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px'}}>
              <h2>Comunicación con Clientes</h2>
              <button className="btn-primary" onClick={() => handleCreate('mensaje')}>Nuevo Mensaje</button>
            </div>
            
            <div className="data-list">
              {mensajes.length > 0 ? (
                mensajes.map(mensaje => (
                  <div key={mensaje.idMensaje} className="data-item">
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start'}}>
                      <div>
                        <h4>De: {mensaje.remitente?.nameUsuario}</h4>
                        <p>{mensaje.contenido}</p>
                        <span>{new Date(mensaje.fechaEnvio).toLocaleDateString()} {new Date(mensaje.fechaEnvio).toLocaleTimeString()}</span>
                      </div>
                      {!mensaje.leido && (
                        <span style={{
                          padding: '4px 10px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          background: '#ff8787',
                          color: 'white'
                        }}>Nuevo</span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p>No hay mensajes</p>
              )}
            </div>
          </div>
        )}

        {showModal && (
          <div className="modal" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>
                  {modalType === 'verRutina' ? 'Ejercicios de la Rutina' :
                   editingItem ? 'Editar' : 'Nuevo'} {
                    modalType === 'seguimiento' ? 'Registro de Seguimiento' :
                    modalType === 'rutina' ? 'Rutina' :
                    modalType === 'ejercicio' ? 'Ejercicio' :
                    modalType === 'planNutricional' ? 'Plan Nutricional' :
                    modalType === 'mensaje' ? 'Mensaje' : ''
                  }
                </h3>
                <button className="close-button" onClick={() => setShowModal(false)}>✕</button>
              </div>

              {modalType === 'verRutina' ? (
                <div>
                  <h4>{selectedRutina?.nombre}</h4>
                  <div className="table-container" style={{marginTop: '20px'}}>
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Ejercicio</th>
                          <th>Día</th>
                          <th>Series</th>
                          <th>Repeticiones</th>
                          <th>Peso</th>
                          <th>Descanso</th>
                          <th>Orden</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ejerciciosRutina.length > 0 ? (
                          ejerciciosRutina.map(ej => (
                            <tr key={ej.idRutinaEjercicio}>
                              <td>{ej.ejercicio?.nombre}</td>
                              <td>{ej.diaSemana}</td>
                              <td>{ej.series}</td>
                              <td>{ej.repeticiones}</td>
                              <td>{ej.peso}</td>
                              <td>{ej.tiempoDescanso}</td>
                              <td>{ej.orden}</td>
                              <td>
                                <button className="btn-secondary" style={{fontSize: '12px', padding: '6px 12px'}}
                                  onClick={() => handleEdit('rutinaEjercicio', ej)}>Editar</button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="8" style={{textAlign: 'center', padding: '20px'}}>No hay ejercicios asignados</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <button className="btn-secondary" onClick={() => setShowModal(false)} style={{marginTop: '20px'}}>Cerrar</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {modalType === 'seguimiento' && (
                    <>
                      <div className="form-group">
                        <label>Cliente</label>
                        <select value={formData.alumno?.idAlumno || ''} 
                          onChange={(e) => setFormData({...formData, alumno: {idAlumno: parseInt(e.target.value)}})} required>
                          <option value="">Seleccionar cliente</option>
                          {clientesAsignados.map(c => (
                            <option key={c.alumno.idAlumno} value={c.alumno.idAlumno}>
                              {c.alumno.nameAlumno} {c.alumno.apellidosAlumno}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Fecha de Registro</label>
                        <input type="date" value={formData.fechaRegistro || ''} 
                          onChange={(e) => setFormData({...formData, fechaRegistro: e.target.value})} required />
                      </div>
                      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
                        <div className="form-group">
                          <label>Peso (kg)</label>
                          <input type="number" step="0.1" value={formData.peso || ''} 
                            onChange={(e) => setFormData({...formData, peso: parseFloat(e.target.value)})} />
                        </div>
                        <div className="form-group">
                          <label>Altura (cm)</label>
                          <input type="number" step="0.1" value={formData.altura || ''} 
                            onChange={(e) => setFormData({...formData, altura: parseFloat(e.target.value)})} />
                        </div>
                        <div className="form-group">
                          <label>Grasa Corporal (%)</label>
                          <input type="number" step="0.1" value={formData.grasaCorporal || ''} 
                            onChange={(e) => setFormData({...formData, grasaCorporal: parseFloat(e.target.value)})} />
                        </div>
                        <div className="form-group">
                          <label>Músculo (kg)</label>
                          <input type="number" step="0.1" value={formData.musculo || ''} 
                            onChange={(e) => setFormData({...formData, musculo: parseFloat(e.target.value)})} />
                        </div>
                        <div className="form-group">
                          <label>Pecho (cm)</label>
                          <input type="number" step="0.1" value={formData.medidaPecho || ''} 
                            onChange={(e) => setFormData({...formData, medidaPecho: parseFloat(e.target.value)})} />
                        </div>
                        <div className="form-group">
                          <label>Cintura (cm)</label>
                          <input type="number" step="0.1" value={formData.medidaCintura || ''} 
                            onChange={(e) => setFormData({...formData, medidaCintura: parseFloat(e.target.value)})} />
                        </div>
                        <div className="form-group">
                          <label>Cadera (cm)</label>
                          <input type="number" step="0.1" value={formData.medidaCadera || ''} 
                            onChange={(e) => setFormData({...formData, medidaCadera: parseFloat(e.target.value)})} />
                        </div>
                        <div className="form-group">
                          <label>Brazo (cm)</label>
                          <input type="number" step="0.1" value={formData.medidaBrazo || ''} 
                            onChange={(e) => setFormData({...formData, medidaBrazo: parseFloat(e.target.value)})} />
                        </div>
                        <div className="form-group">
                          <label>Pierna (cm)</label>
                          <input type="number" step="0.1" value={formData.medidaPierna || ''} 
                            onChange={(e) => setFormData({...formData, medidaPierna: parseFloat(e.target.value)})} />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Rendimiento</label>
                        <textarea value={formData.rendimiento || ''} 
                          onChange={(e) => setFormData({...formData, rendimiento: e.target.value})} rows="3" />
                      </div>
                      <div className="form-group">
                        <label>Notas/Comentarios</label>
                        <textarea value={formData.notas || ''} 
                          onChange={(e) => setFormData({...formData, notas: e.target.value})} rows="4" />
                      </div>
                    </>
                  )}

                  {modalType === 'rutina' && (
                    <>
                      <div className="form-group">
                        <label>Cliente</label>
                        <select value={formData.alumno?.idAlumno || ''} 
                          onChange={(e) => setFormData({...formData, alumno: {idAlumno: parseInt(e.target.value)}})} required>
                          <option value="">Seleccionar cliente</option>
                          {clientesAsignados.map(c => (
                            <option key={c.alumno.idAlumno} value={c.alumno.idAlumno}>
                              {c.alumno.nameAlumno} {c.alumno.apellidosAlumno}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Nombre de la Rutina</label>
                        <input type="text" value={formData.nombre || ''} 
                          onChange={(e) => setFormData({...formData, nombre: e.target.value})} required />
                      </div>
                      <div className="form-group">
                        <label>Descripción</label>
                        <textarea value={formData.descripcion || ''} 
                          onChange={(e) => setFormData({...formData, descripcion: e.target.value})} rows="3" />
                      </div>
                      <div className="form-group">
                        <label>Objetivo</label>
                        <select value={formData.objetivo || ''} 
                          onChange={(e) => setFormData({...formData, objetivo: e.target.value})}>
                          <option value="">Seleccionar objetivo</option>
                          <option value="Ganar masa">Ganar masa</option>
                          <option value="Bajar grasa">Bajar grasa</option>
                          <option value="Mantenimiento">Mantenimiento</option>
                          <option value="Mejora cardiovascular">Mejora cardiovascular</option>
                          <option value="Fuerza">Fuerza</option>
                        </select>
                      </div>
                      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
                        <div className="form-group">
                          <label>Fecha Inicio</label>
                          <input type="date" value={formData.fechaInicio || ''} 
                            onChange={(e) => setFormData({...formData, fechaInicio: e.target.value})} required />
                        </div>
                        <div className="form-group">
                          <label>Fecha Fin</label>
                          <input type="date" value={formData.fechaFin || ''} 
                            onChange={(e) => setFormData({...formData, fechaFin: e.target.value})} />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>
                          <input type="checkbox" checked={formData.activa !== false} 
                            onChange={(e) => setFormData({...formData, activa: e.target.checked})} />
                          Activa
                        </label>
                      </div>
                      <p style={{marginTop: '20px', color: '#666', fontSize: '14px'}}>
                        Nota: Los ejercicios de la rutina se pueden agregar después de crear la rutina.
                      </p>
                    </>
                  )}

                  {modalType === 'ejercicio' && (
                    <>
                      <div className="form-group">
                        <label>Nombre del Ejercicio</label>
                        <input type="text" value={formData.nombre || ''} 
                          onChange={(e) => setFormData({...formData, nombre: e.target.value})} required />
                      </div>
                      <div className="form-group">
                        <label>Descripción</label>
                        <textarea value={formData.descripcion || ''} 
                          onChange={(e) => setFormData({...formData, descripcion: e.target.value})} rows="4" />
                      </div>
                      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
                        <div className="form-group">
                          <label>Grupo Muscular</label>
                          <select value={formData.grupoMuscular || ''} 
                            onChange={(e) => setFormData({...formData, grupoMuscular: e.target.value})}>
                            <option value="">Seleccionar</option>
                            <option value="Pecho">Pecho</option>
                            <option value="Espalda">Espalda</option>
                            <option value="Hombros">Hombros</option>
                            <option value="Brazos">Brazos</option>
                            <option value="Piernas">Piernas</option>
                            <option value="Core">Core</option>
                            <option value="Cardio">Cardio</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label>Nivel</label>
                          <select value={formData.nivel || ''} 
                            onChange={(e) => setFormData({...formData, nivel: e.target.value})}>
                            <option value="">Seleccionar</option>
                            <option value="Principiante">Principiante</option>
                            <option value="Intermedio">Intermedio</option>
                            <option value="Avanzado">Avanzado</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-group">
                        <label>URL del Video</label>
                        <input type="url" value={formData.videoUrl || ''} 
                          onChange={(e) => setFormData({...formData, videoUrl: e.target.value})} 
                          placeholder="https://..." />
                      </div>
                      <div className="form-group">
                        <label>URL de la Imagen</label>
                        <input type="url" value={formData.imagenUrl || ''} 
                          onChange={(e) => setFormData({...formData, imagenUrl: e.target.value})} 
                          placeholder="https://..." />
                      </div>
                    </>
                  )}

                  {modalType === 'planNutricional' && (
                    <>
                      <div className="form-group">
                        <label>Cliente</label>
                        <select value={formData.alumno?.idAlumno || ''} 
                          onChange={(e) => setFormData({...formData, alumno: {idAlumno: parseInt(e.target.value)}})} required>
                          <option value="">Seleccionar cliente</option>
                          {clientesAsignados.map(c => (
                            <option key={c.alumno.idAlumno} value={c.alumno.idAlumno}>
                              {c.alumno.nameAlumno} {c.alumno.apellidosAlumno}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Nombre del Plan</label>
                        <input type="text" value={formData.namePlan || ''} 
                          onChange={(e) => setFormData({...formData, namePlan: e.target.value})} required />
                      </div>
                      <div className="form-group">
                        <label>Descripción</label>
                        <textarea value={formData.descripcion || ''} 
                          onChange={(e) => setFormData({...formData, descripcion: e.target.value})} rows="3" />
                      </div>
                      <div className="form-group">
                        <label>Objetivo</label>
                        <select value={formData.objetivo || ''} 
                          onChange={(e) => setFormData({...formData, objetivo: e.target.value})}>
                          <option value="">Seleccionar objetivo</option>
                          <option value="Ganar masa">Ganar masa</option>
                          <option value="Bajar grasa">Bajar grasa</option>
                          <option value="Mantenimiento">Mantenimiento</option>
                          <option value="Definición">Definición</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Calorías Diarias</label>
                        <input type="number" value={formData.caloriasDiarias || ''} 
                          onChange={(e) => setFormData({...formData, caloriasDiarias: parseInt(e.target.value)})} />
                      </div>
                      <div className="form-group">
                        <label>Notas de Personalización</label>
                        <textarea value={formData.notasPersonalizacion || ''} 
                          onChange={(e) => setFormData({...formData, notasPersonalizacion: e.target.value})} rows="3" />
                      </div>
                      <div className="form-group">
                        <label>Estado</label>
                        <select value={formData.estado || 'Activo'} 
                          onChange={(e) => setFormData({...formData, estado: e.target.value})}>
                          <option value="Activo">Activo</option>
                          <option value="Inactivo">Inactivo</option>
                        </select>
                      </div>
                    </>
                  )}

                  {modalType === 'mensaje' && (
                    <>
                      <div className="form-group">
                        <label>Destinatario</label>
                        <select value={formData.destinatario?.idUsuario || ''} 
                          onChange={(e) => setFormData({...formData, destinatario: {idUsuario: parseInt(e.target.value)}})} required>
                          <option value="">Seleccionar destinatario</option>
                          {clientesAsignados.map(c => (
                            <option key={c.alumno.idAlumno} value={c.alumno.usuario?.idUsuario}>
                              {c.alumno.nameAlumno} {c.alumno.apellidosAlumno}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Asunto</label>
                        <input type="text" value={formData.asunto || ''} 
                          onChange={(e) => setFormData({...formData, asunto: e.target.value})} />
                      </div>
                      <div className="form-group">
                        <label>Mensaje</label>
                        <textarea value={formData.contenido || ''} 
                          onChange={(e) => setFormData({...formData, contenido: e.target.value})} rows="6" required />
                      </div>
                    </>
                  )}

                  <div style={{display: 'flex', gap: '10px', marginTop: '25px'}}>
                    <button type="submit" className="btn-primary">Guardar</button>
                    <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardEntrenador;
