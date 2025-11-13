import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  alumnoService, planNutricionalService, reservaClaseService, 
  incidenciaService, rutinaService, membresiaService,
  pagoService, claseService, foodDataService, mensajeService
} from '../services/api';
import './Dashboard.css';

const DashboardUsuario = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [alumno, setAlumno] = useState(null);
  const [planes, setPlanes] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [incidencias, setIncidencias] = useState([]);
  const [rutinas, setRutinas] = useState([]);
  const [membresias, setMembresias] = useState([]);
  const [pagos, setPagos] = useState([]);
  const [clases, setClases] = useState([]);
  const [mensajes, setMensajes] = useState([]);
  const [foodSearch, setFoodSearch] = useState('');
  const [foodResults, setFoodResults] = useState([]);
  const [showFoodModal, setShowFoodModal] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const alumnoRes = await alumnoService.getByUsuario(user.idUsuario);
      const alumnoData = alumnoRes.data;
      setAlumno(alumnoData);

      if (alumnoData?.idAlumno) {
        const [planesRes, reservasRes, incidenciasRes, rutinasRes, membresiasRes, pagosRes, clasesRes, mensajesRes] = await Promise.all([
          planNutricionalService.getByAlumno(alumnoData.idAlumno),
          reservaClaseService.getByAlumno(alumnoData.idAlumno),
          incidenciaService.getByAlumno(alumnoData.idAlumno),
          rutinaService.getByAlumno(alumnoData.idAlumno),
          membresiaService.getByAlumno(alumnoData.idAlumno),
          pagoService.getAll(),
          claseService.getAll(),
          mensajeService.getByDestinatario(user.idUsuario)
        ]);

        setPlanes(planesRes.data);
        setReservas(reservasRes.data);
        setIncidencias(incidenciasRes.data);
        setRutinas(rutinasRes.data);
        setMembresias(membresiasRes.data);
        setPagos(pagosRes.data.filter(p => p.membresia?.alumno?.idAlumno === alumnoData.idAlumno));
        setClases(clasesRes.data);
        setMensajes(mensajesRes.data);
      }
    } catch (error) {
      console.error('Error cargando datos:', error);
    }
  };

  const handleFoodSearch = async () => {
    if (!foodSearch.trim()) return;
    try {
      const response = await foodDataService.search(foodSearch);
      setFoodResults(response.data?.foods || []);
      setShowFoodModal(true);
    } catch (error) {
      console.error('Error buscando alimento:', error);
    }
  };

  const membresiaActiva = membresias.find(m => m.estado === 'Activa');

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>💪 Dashboard - Usuario</h1>
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
          <button className={`tab ${activeTab === 'perfil' ? 'active' : ''}`} onClick={() => setActiveTab('perfil')}>
            Mi Perfil
          </button>
          <button className={`tab ${activeTab === 'rutinas' ? 'active' : ''}`} onClick={() => setActiveTab('rutinas')}>
            Rutinas
          </button>
          <button className={`tab ${activeTab === 'nutricion' ? 'active' : ''}`} onClick={() => setActiveTab('nutricion')}>
            Nutrición
          </button>
          <button className={`tab ${activeTab === 'clases' ? 'active' : ''}`} onClick={() => setActiveTab('clases')}>
            Clases
          </button>
          <button className={`tab ${activeTab === 'membresia' ? 'active' : ''}`} onClick={() => setActiveTab('membresia')}>
            Membresía
          </button>
          <button className={`tab ${activeTab === 'mensajes' ? 'active' : ''}`} onClick={() => setActiveTab('mensajes')}>
            Mensajes
          </button>
        </div>

        {activeTab === 'overview' && (
          <>
            {alumno && (
              <div className="profile-section">
                <h2>Mi Perfil</h2>
                <div className="profile-info">
                  <p><strong>Nombre:</strong> {alumno.nameAlumno} {alumno.apellidosAlumno}</p>
                  <p><strong>DNI:</strong> {alumno.dni}</p>
                  <p><strong>Teléfono:</strong> {alumno.telefono}</p>
                  <p><strong>Peso Actual:</strong> {alumno.pesoActual} kg</p>
                  <p><strong>Altura:</strong> {alumno.altura} cm</p>
                  <p><strong>Estado Membresía:</strong> {membresiaActiva ? `Activa hasta ${new Date(membresiaActiva.fechaFin).toLocaleDateString()}` : 'Sin membresía activa'}</p>
                </div>
              </div>
            )}

            <div className="stats-grid">
              <div className="stat-card">
                <h3>Rutinas Activas</h3>
                <p className="stat-number">{rutinas.filter(r => r.activa).length}</p>
              </div>
              <div className="stat-card">
                <h3>Planes Nutricionales</h3>
                <p className="stat-number">{planes.length}</p>
              </div>
              <div className="stat-card">
                <h3>Clases Reservadas</h3>
                <p className="stat-number">{reservas.filter(r => r.estado === 'Reservada' || r.estado === 'Confirmada').length}</p>
              </div>
              <div className="stat-card">
                <h3>Mensajes</h3>
                <p className="stat-number">{mensajes.filter(m => !m.leido).length}</p>
              </div>
            </div>
          </>
        )}

        {activeTab === 'perfil' && alumno && (
          <div className="dashboard-section">
            <h2>Información Personal</h2>
            <div className="profile-info">
              <p><strong>Nombre Completo:</strong> {alumno.nameAlumno} {alumno.apellidosAlumno}</p>
              <p><strong>DNI:</strong> {alumno.dni}</p>
              <p><strong>Teléfono:</strong> {alumno.telefono}</p>
              <p><strong>Dirección:</strong> {alumno.direccion}</p>
              <p><strong>Género:</strong> {alumno.genero}</p>
              <p><strong>Peso Actual:</strong> {alumno.pesoActual} kg</p>
              <p><strong>Altura:</strong> {alumno.altura} cm</p>
              <p><strong>Fecha de Inscripción:</strong> {new Date(alumno.fechaInscripcion).toLocaleDateString()}</p>
            </div>
            <button className="btn-primary" style={{marginTop: '20px'}}>Editar Perfil</button>
          </div>
        )}

        {activeTab === 'rutinas' && (
          <div className="dashboard-section">
            <h2>Mis Rutinas de Entrenamiento</h2>
            <div className="data-list">
              {rutinas.length > 0 ? (
                rutinas.map(rutina => (
                  <div key={rutina.idRutina} className="data-item">
                    <h4>{rutina.nombre}</h4>
                    <p><strong>Objetivo:</strong> {rutina.objetivo}</p>
                    <p>{rutina.descripcion}</p>
                    <span>Fecha inicio: {new Date(rutina.fechaInicio).toLocaleDateString()}</span>
                    <span>Estado: {rutina.activa ? 'Activa' : 'Inactiva'}</span>
                    <button className="btn-secondary" style={{marginTop: '10px'}}>Ver Ejercicios</button>
                  </div>
                ))
              ) : (
                <p>No tienes rutinas asignadas</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'nutricion' && (
          <div className="dashboard-section">
            <h2>Plan Nutricional</h2>
            <div className="data-list">
              {planes.length > 0 ? (
                planes.map(plan => (
                  <div key={plan.idPlan} className="data-item">
                    <h4>{plan.namePlan}</h4>
                    <p><strong>Objetivo:</strong> {plan.objetivo}</p>
                    <p><strong>Calorías diarias:</strong> {plan.caloriasDiarias}</p>
                    <p className="plan-desc">{plan.descripcion}</p>
                    {plan.notasPersonalizacion && (
                      <p><strong>Notas:</strong> {plan.notasPersonalizacion}</p>
                    )}
                  </div>
                ))
              ) : (
                <p>No tienes planes nutricionales asignados</p>
              )}
            </div>

            <div style={{marginTop: '40px', padding: '20px', background: '#1a1a1a', borderRadius: '10px', border: '2px solid #dc2626'}}>
              <h3 style={{color: '#fbbf24', marginBottom: '15px'}}>🔍 Consultar Información Nutricional</h3>
              <p style={{color: '#e5e5e5', marginBottom: '15px'}}>Busca información nutricional de alimentos usando la API de FoodData Central</p>
              <div style={{display: 'flex', gap: '10px'}}>
                <input
                  type="text"
                  value={foodSearch}
                  onChange={(e) => setFoodSearch(e.target.value)}
                  placeholder="Buscar alimento (ej: apple, chicken, rice)"
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: '#2a2a2a',
                    border: '2px solid #2a2a2a',
                    borderRadius: '5px',
                    color: '#e5e5e5'
                  }}
                  onKeyPress={(e) => e.key === 'Enter' && handleFoodSearch()}
                />
                <button className="btn-primary" onClick={handleFoodSearch}>Buscar</button>
              </div>
            </div>

            {showFoodModal && foodResults.length > 0 && (
              <div className="modal" onClick={() => setShowFoodModal(false)}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                  <div className="modal-header">
                    <h3>Resultados de Búsqueda</h3>
                    <button className="close-button" onClick={() => setShowFoodModal(false)}>✕</button>
                  </div>
                  <div className="data-list">
                    {foodResults.slice(0, 10).map((food, index) => (
                      <div key={index} className="data-item">
                        <h4>{food.description}</h4>
                        {food.foodNutrients && (
                          <div>
                            {food.foodNutrients.slice(0, 5).map((nutrient, idx) => (
                              <p key={idx} style={{fontSize: '14px'}}>
                                {nutrient.nutrientName}: {nutrient.value} {nutrient.unitName}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'clases' && (
          <div className="dashboard-section">
            <h2>Clases Disponibles</h2>
            <div className="data-list">
              {clases.map(clase => (
                <div key={clase.idClase} className="data-item">
                  <h4>{clase.nameClase}</h4>
                  <p>{clase.descripcion}</p>
                  <span>{clase.diaSemana} - {clase.horaInicio} a {clase.horaFin}</span>
                  <span>Duración: {clase.duracionMinutos} min</span>
                  <button className="btn-primary" style={{marginTop: '10px'}}>Reservar</button>
                </div>
              ))}
            </div>

            <h3 style={{marginTop: '40px', color: '#fbbf24'}}>Mis Reservas</h3>
            <div className="data-list">
              {reservas.map(reserva => (
                <div key={reserva.idReserva} className="data-item">
                  <h4>{reserva.clase?.nameClase}</h4>
                  <span>Fecha: {new Date(reserva.fechaReserva).toLocaleDateString()}</span>
                  <span>Estado: {reserva.estado}</span>
                  {reserva.estado === 'Reservada' && (
                    <button className="btn-secondary" style={{marginTop: '10px'}}>Cancelar</button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'membresia' && (
          <div className="dashboard-section">
            <h2>Mi Membresía</h2>
            {membresiaActiva ? (
              <div className="data-item">
                <h4>{membresiaActiva.tipoMembresia?.nombre}</h4>
                <p><strong>Fecha Inicio:</strong> {new Date(membresiaActiva.fechaInicio).toLocaleDateString()}</p>
                <p><strong>Fecha Fin:</strong> {new Date(membresiaActiva.fechaFin).toLocaleDateString()}</p>
                <p><strong>Estado:</strong> {membresiaActiva.estado}</p>
              </div>
            ) : (
              <p>No tienes una membresía activa</p>
            )}

            <h3 style={{marginTop: '40px', color: '#fbbf24'}}>Historial de Pagos</h3>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Monto</th>
                    <th>Método</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {pagos.map(pago => (
                    <tr key={pago.idPago}>
                      <td>{new Date(pago.fechaPago).toLocaleDateString()}</td>
                      <td>S/ {pago.monto}</td>
                      <td>{pago.metodoPago}</td>
                      <td>{pago.estado}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'mensajes' && (
          <div className="dashboard-section">
            <h2>Mensajes</h2>
            <div className="data-list">
              {mensajes.length > 0 ? (
                mensajes.map(mensaje => (
                  <div key={mensaje.idMensaje} className="data-item" style={{opacity: mensaje.leido ? 0.7 : 1}}>
                    <h4>{mensaje.asunto || 'Sin asunto'}</h4>
                    <p>{mensaje.contenido}</p>
                    <span>De: {mensaje.remitente?.nameUsuario}</span>
                    <span>Fecha: {new Date(mensaje.fechaEnvio).toLocaleDateString()}</span>
                    {!mensaje.leido && <span style={{color: '#fbbf24'}}>● Nuevo</span>}
                  </div>
                ))
              ) : (
                <p>No tienes mensajes</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardUsuario;
