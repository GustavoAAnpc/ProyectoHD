import React from 'react';

const RutinasTab = ({ rutinas, onViewRutina, onEdit, onDelete, onCreate }) => {
  return (
    <div className="dashboard-section">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px'}}>
        <h2>Rutinas de Entrenamiento</h2>
        <button className="btn-primary" onClick={() => onCreate()}>Nueva Rutina</button>
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
                  onClick={() => onViewRutina(rutina)}>Ver Ejercicios</button>
                <button className="btn-secondary" style={{marginRight: '10px'}}
                  onClick={() => onEdit(rutina)}>Editar</button>
                <button className="btn-secondary" onClick={() => onDelete(rutina.idRutina)}>Eliminar</button>
              </div>
            </div>
          ))
        ) : (
          <p>No hay rutinas creadas</p>
        )}
      </div>
    </div>
  );
};

export default RutinasTab;

