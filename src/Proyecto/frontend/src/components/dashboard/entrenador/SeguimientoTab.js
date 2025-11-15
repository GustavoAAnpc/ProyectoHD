import React from 'react';

const SeguimientoTab = ({ seguimientos, onEdit, onCreate }) => {
  return (
    <div className="dashboard-section">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px'}}>
        <h2>Seguimiento Físico de Clientes</h2>
        <button className="btn-primary" onClick={() => onCreate()}>Nuevo Registro</button>
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
                      onClick={() => onEdit(seg)}>Editar</button>
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
  );
};

export default SeguimientoTab;

