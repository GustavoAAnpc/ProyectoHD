import React from 'react';

const MembresiasTab = ({ tiposMembresia, membresias, alumnos, tiposActivos, onEdit, onDelete, onCreateTipo, onCreate }) => {
  return (
    <div className="dashboard-section">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px'}}>
        <h2>Tipos de Membresía</h2>
        <button className="btn-primary" onClick={() => onCreateTipo()}>Nuevo Tipo</button>
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
                      onClick={() => onEdit('tipoMembresia', tipo)}>Editar</button>
                    <button className="btn-secondary" style={{fontSize: '12px', padding: '6px 12px'}}
                      onClick={() => onDelete('tipoMembresia', tipo.idTipoMembresia)}>Eliminar</button>
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
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
        <span></span>
        <button className="btn-primary" onClick={() => onCreate()}>Asignar Membresía</button>
      </div>
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
                      onClick={() => onEdit('membresia', membresia)}>Editar</button>
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
  );
};

export default MembresiasTab;

