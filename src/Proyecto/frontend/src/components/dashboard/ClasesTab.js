import React from 'react';

const ClasesTab = ({ clases, reservas, onReservar, onCancelar }) => {
  return (
    <div className="dashboard-section">
      <h2>Clases Disponibles</h2>
      <div className="data-list">
        {clases && clases.length > 0 ? (
          clases.map(clase => {
            const yaReservada = reservas && reservas.some(r =>
              r.clase?.idClase === clase.idClase &&
              r.estado !== 'Cancelada'
            );
            return (
              <div key={clase.idClase} className="data-item">
                <h4>{clase.nameClase}</h4>
                <p>{clase.descripcion}</p>
                <p><strong>Entrenador:</strong> {clase.instructor?.namaInstructor} {clase.instructor?.apellidosInstructor}</p>
                <p><strong>Sede:</strong> {clase.sede?.nombre || 'No especificada'}</p>
                <span>{clase.diaSemana} - {clase.horaInicio} a {clase.horaFin}</span>
                {yaReservada ? (
                  <span style={{ color: '#4caf50', fontWeight: 'bold', display: 'block', marginTop: '10px' }}>✓ Ya reservada</span>
                ) : (
                  <button className="btn-primary" style={{ marginTop: '10px' }}
                    onClick={() => onReservar(clase)}>Reservar Clase</button>
                )}
              </div>
            );
          })
        ) : (
          <p>No hay clases disponibles</p>
        )}
      </div>

      <h3 style={{ marginTop: '40px', marginBottom: '20px' }}>Mis Reservas</h3>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Clase</th>
              <th>Día</th>
              <th>Hora</th>
              <th>Fecha Reserva</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reservas && reservas.length > 0 ? (
              reservas.map(reserva => (
                <tr key={reserva.idReserva}>
                  <td>{reserva.clase?.nameClase}</td>
                  <td>{reserva.clase?.diaSemana}</td>
                  <td>{reserva.clase?.horaInicio} - {reserva.clase?.horaFin}</td>
                  <td>{new Date(reserva.fechaReserva).toLocaleDateString()}</td>
                  <td>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '500',
                      background: reserva.estado === 'Asistida' ? '#d4edda' :
                        reserva.estado === 'Reservada' ? '#d1ecf1' :
                          reserva.estado === 'Cancelada' ? '#f8d7da' : '#fff3cd',
                      color: reserva.estado === 'Asistida' ? '#155724' :
                        reserva.estado === 'Reservada' ? '#0c5460' :
                          reserva.estado === 'Cancelada' ? '#721c24' : '#856404'
                    }}>
                      {reserva.estado}
                    </span>
                  </td>
                  <td>
                    {(reserva.estado === 'Reservada' || reserva.estado === 'Confirmada') && (
                      <button className="btn-secondary" style={{ fontSize: '12px', padding: '6px 12px' }}
                        onClick={() => onCancelar(reserva)}>Cancelar</button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '30px' }}>No tienes reservas</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClasesTab;
