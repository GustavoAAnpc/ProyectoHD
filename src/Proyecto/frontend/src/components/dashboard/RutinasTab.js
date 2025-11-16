import React from 'react';

const RutinasTab = ({ rutinas, onViewRutina }) => {
  return (
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
              <span>Entrenador: {rutina.instructor?.namaInstructor} {rutina.instructor?.apellidosInstructor}</span>
              <span>Estado: {rutina.activa ? 'Activa' : 'Inactiva'}</span>
              {rutina.activa && (
                <button className="btn-primary" style={{marginTop: '10px'}} 
                  onClick={() => onViewRutina(rutina)}>Ver Rutina Diaria</button>
              )}
            </div>
          ))
        ) : (
          <p>No tienes rutinas asignadas</p>
        )}
      </div>
    </div>
  );
};

export default RutinasTab;

