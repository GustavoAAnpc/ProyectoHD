import React, { useState, useEffect } from 'react';
import { claseService, reservaClaseService, noticiaService } from '../../../services/api';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';

moment.locale('es');
const localizer = momentLocalizer(moment);

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

  // Convertir clases a eventos del calendario
  const getCalendarEvents = () => {
    const diasSemana = {
      'Lunes': 1,
      'Martes': 2,
      'Miércoles': 3,
      'Jueves': 4,
      'Viernes': 5,
      'Sábado': 6,
      'Domingo': 0
    };

    return clases.map(clase => {
      const diaNumero = diasSemana[clase.diaSemana];
      const hoy = moment();
      const proximoDia = moment().day(diaNumero);

      // Si el día ya pasó esta semana, tomar el de la próxima semana
      if (proximoDia.isBefore(hoy, 'day')) {
        proximoDia.add(7, 'days');
      }

      const [horaInicio, minInicio] = clase.horaInicio.split(':');
      const [horaFin, minFin] = clase.horaFin.split(':');

      const start = proximoDia.clone().hour(parseInt(horaInicio)).minute(parseInt(minInicio));
      const end = proximoDia.clone().hour(parseInt(horaFin)).minute(parseInt(minFin));

      return {
        id: clase.idClase,
        title: `${clase.nameClase} - ${clase.instructor?.namaInstructor || ''} ${clase.instructor?.apellidosInstructor || ''}`,
        start: start.toDate(),
        end: end.toDate(),
        resource: clase
      };
    });
  };

  const handleSelectEvent = (event) => {
    onEditClase(event.resource);
  };

  return (
    <div className="dashboard-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <h2>Gestión del Gimnasio</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn-secondary" onClick={() => setActiveSection('horarios')}>Horarios</button>
          <button className="btn-secondary" onClick={() => setActiveSection('reservas')}>Reservas</button>
          <button className="btn-secondary" onClick={() => setActiveSection('noticias')}>Noticias</button>
        </div>
      </div>

      {activeSection === 'horarios' && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3>Horarios de Clases Grupales</h3>
            <button className="btn-primary" onClick={() => onCreateClase()}>Nueva Clase</button>
          </div>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Clase</th>
                  <th>Instructor</th>
                  <th>Sede</th>
                  <th>Día</th>
                  <th>Hora Inicio</th>
                  <th>Hora Fin</th>
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
                      <td>{clase.sede?.nombre || 'N/A'}</td>
                      <td>{clase.diaSemana}</td>
                      <td>{clase.horaInicio}</td>
                      <td>{clase.horaFin}</td>
                      <td>{calcularAforo(clase)}</td>
                      <td>
                        <button className="btn-secondary" style={{ fontSize: '12px', padding: '6px 12px' }}
                          onClick={() => onEditClase(clase)}>Editar</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '30px' }}>No hay clases registradas</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Calendario de clases */}
          <div style={{ marginTop: '40px' }}>
            <h3 style={{ marginBottom: '20px' }}>Calendario de Clases</h3>
            <div style={{ height: '600px', background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <Calendar
                localizer={localizer}
                events={getCalendarEvents()}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '100%' }}
                onSelectEvent={handleSelectEvent}
                views={['month', 'week', 'day']}
                defaultView="week"
                messages={{
                  next: 'Siguiente',
                  previous: 'Anterior',
                  today: 'Hoy',
                  month: 'Mes',
                  week: 'Semana',
                  day: 'Día',
                  agenda: 'Agenda',
                  date: 'Fecha',
                  time: 'Hora',
                  event: 'Clase',
                  noEventsInRange: 'No hay clases en este rango',
                  showMore: (total) => `+ Ver más (${total})`
                }}
                eventPropGetter={(event) => ({
                  style: {
                    backgroundColor: '#4a90e2',
                    borderRadius: '5px',
                    opacity: 0.8,
                    color: 'white',
                    border: '0px',
                    display: 'block',
                    cursor: 'pointer'
                  }
                })}
              />
            </div>
          </div>
        </>
      )}

      {activeSection === 'reservas' && (
        <>
          <h3 style={{ marginBottom: '20px' }}>Reservas de Clases</h3>
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
                        <button className="btn-secondary" style={{ fontSize: '12px', padding: '6px 12px' }}
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
                    <td colSpan="5" style={{ textAlign: 'center', padding: '30px' }}>No hay reservas registradas</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {activeSection === 'noticias' && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
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
                        <div style={{ display: 'flex', gap: '5px' }}>
                          <button className="btn-secondary" style={{ fontSize: '12px', padding: '6px 12px' }}
                            onClick={() => onEditNoticia(noticia)}>Editar</button>
                          <button className="btn-secondary" style={{ fontSize: '12px', padding: '6px 12px' }}
                            onClick={() => onDeleteNoticia(noticia.idNoticia)}>Eliminar</button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '30px' }}>No hay noticias registradas</td>
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
