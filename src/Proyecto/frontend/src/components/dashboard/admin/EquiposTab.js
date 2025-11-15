import React from 'react';

const EquiposTab = ({ equipos, sedes, onEdit, onMantenimiento, onCreate }) => {
  return (
    <div className="dashboard-section">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px'}}>
        <h2>Gestión de Equipos</h2>
        <button className="btn-primary" onClick={() => onCreate()}>Nuevo Equipo</button>
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
                      onClick={() => onEdit(equipo)}>Editar</button>
                    <button className="btn-secondary" style={{fontSize: '12px', padding: '6px 12px'}}
                      onClick={() => onMantenimiento(equipo)}>Mantenimiento</button>
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
  );
};

export default EquiposTab;

