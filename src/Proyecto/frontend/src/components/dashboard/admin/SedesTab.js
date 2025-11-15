import React from 'react';

const SedesTab = ({ sedes, onEdit, onDelete, onToggleEstado, onCreate }) => {
  return (
    <div className="dashboard-section">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px'}}>
        <h2>Gestión de Sedes</h2>
        <button className="btn-primary" onClick={() => onCreate()}>Nueva Sede</button>
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
                      onClick={() => onEdit(sede)}>Editar</button>
                    <button className="btn-secondary" style={{marginRight: '8px', fontSize: '12px', padding: '6px 12px'}}
                      onClick={() => onToggleEstado(sede.idSede, sede.activa)}>
                      {sede.activa ? 'Desactivar' : 'Activar'}
                    </button>
                    <button className="btn-secondary" style={{fontSize: '12px', padding: '6px 12px'}}
                      onClick={() => onDelete(sede.idSede)}>Eliminar</button>
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
  );
};

export default SedesTab;

