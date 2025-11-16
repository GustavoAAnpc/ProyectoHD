import React, { useState, useEffect } from 'react';
import { claseService, reservaClaseService, noticiaService } from '../../../services/api';

const GimnasioTab = ({ clases, sedes, onCreateClase, onEditClase, onCreateNoticia, onEditNoticia, onDeleteNoticia }) => {
  const [reservas, setReservas] = useState([]);
  const [noticias, setNoticias] = useState([]);
  const [activeSection, setActiveSection] = useState('horarios');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [reservasRes, noticiasRes] = await Promise.all([
        reservaClaseService.getAll(),
        noticiaService.getAll()
      ]);
      setReservas(reservasRes.data);
      setNoticias(noticiasRes.data);
    } catch (error) {
      console.error('Error cargando datos:', error);
    }
  };

  const calcularAforo = (clase) => {
    const inscripciones = reservas.filter(r => 
      r.clase?.idClase === clase.idClase && 
      (r.estado === 'Reservada' || r.estado === 'Confirmada')
    );
    return inscripciones.length;
  };

  return (
    <div className="dashboard-section">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px'}}>
        <h2>Gestión del Gimnasio</h2>
        <div style={{display: 'flex', gap: '10px'}}>
          <button className="btn-secondary" onClick={() => setActiveSection('horarios')}>Horarios</button>
          <button className="btn-secondary" onClick={() => setActiveSection('reservas')}>Reservas</button>
          <button className="btn-secondary" onClick={() => setActiveSection('noticias')}>Noticias</button>
        </div>
      </div>

      {activeSection === 'horarios' && (
        <>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
            <h3>Horarios de Clases Grupales</h3>
            <button className="btn-primary" onClick={() => onCreateClase()}>Nueva Clase</button>
          </div>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Clase</th>
                  <th>Instructor</th>
                  <th>Día</th>
                  <th>Hora Inicio</th>
                  <th>Hora Fin</th>
                  <th>Duración</th>
                  <th>Aforo Actual</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {clases.length > 0 ? (
                  clases.map(clase => (
                    <tr key={clase.idClase}>
                      <td>{clase.nameClase}</td>
                      <td>{clase.instructor?.namaInstructor} {clase.instructor?.apellidosInstructor}</td>
                      <td>{clase.diaSemana}</td>
                      <td>{clase.horaInicio}</td>
                      <td>{clase.horaFin}</td>
                      <td>{clase.duracionMinutos} min</td>
                      <td>{calcularAforo(clase)}</td>
                      <td>
                        <button className="btn-secondary" style={{fontSize: '12px', padding: '6px 12px'}}
                          onClick={() => onEditClase(clase)}>Editar</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" style={{textAlign: 'center', padding: '30px'}}>No hay clases registradas</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {activeSection === 'reservas' && (
        <>
          <h3 style={{marginBottom: '20px'}}>Reservas de Clases</h3>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Clase</th>
                  <th>Fecha Reserva</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {reservas.length > 0 ? (
                  reservas.map(reserva => (
                    <tr key={reserva.idReserva}>
                      <td>{reserva.alumno?.nameAlumno} {reserva.alumno?.apellidosAlumno}</td>
                      <td>{reserva.clase?.nameClase}</td>
                      <td>{new Date(reserva.fechaReserva).toLocaleDateString()}</td>
                      <td>
                        <span style={{
                          padding: '4px 10px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: '500',
                          background: reserva.estado === 'Confirmada' ? '#d4edda' : 
                                     reserva.estado === 'Cancelada' ? '#f8d7da' : '#fff3cd',
                          color: reserva.estado === 'Confirmada' ? '#155724' : 
                                 reserva.estado === 'Cancelada' ? '#721c24' : '#856404'
                        }}>
                          {reserva.estado}
                        </span>
                      </td>
                      <td>
                        <button className="btn-secondary" style={{fontSize: '12px', padding: '6px 12px'}}
                          onClick={() => {
                            // Aquí se podría implementar cambiar estado de reserva
                            alert('Funcionalidad de cambio de estado próximamente');
                          }}>
                          Cambiar Estado
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{textAlign: 'center', padding: '30px'}}>No hay reservas registradas</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {activeSection === 'noticias' && (
        <>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
            <h3>Noticias, Eventos y Comunicados</h3>
            <button className="btn-primary" onClick={() => onCreateNoticia()}>Nueva Noticia</button>
          </div>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Tipo</th>
                  <th>Fecha Publicación</th>
                  <th>Fecha Evento</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {noticias.length > 0 ? (
                  noticias.map(noticia => (
                    <tr key={noticia.idNoticia}>
                      <td>{noticia.titulo}</td>
                      <td>{noticia.tipo}</td>
                      <td>{new Date(noticia.fechaPublicacion).toLocaleDateString()}</td>
                      <td>{noticia.fechaEvento ? new Date(noticia.fechaEvento).toLocaleDateString() : 'N/A'}</td>
                      <td>
                        <span style={{
                          padding: '4px 10px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: '500',
                          background: noticia.activa ? '#d4edda' : '#f8d7da',
                          color: noticia.activa ? '#155724' : '#721c24'
                        }}>
                          {noticia.activa ? 'Activa' : 'Inactiva'}
                        </span>
                      </td>
                      <td>
                        <div style={{display: 'flex', gap: '5px'}}>
                          <button className="btn-secondary" style={{fontSize: '12px', padding: '6px 12px'}}
                            onClick={() => onEditNoticia(noticia)}>Editar</button>
                          <button className="btn-secondary" style={{fontSize: '12px', padding: '6px 12px'}}
                            onClick={() => onDeleteNoticia(noticia.idNoticia)}>Eliminar</button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{textAlign: 'center', padding: '30px'}}>No hay noticias registradas</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default GimnasioTab;

