import React, { useState } from 'react';
import { rutinaService, seguimientoFisicoService } from '../../../services/api';

const ClientesTab = ({ clientesAsignados, onNuevoRegistro, onViewCliente }) => {
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [rutinas, setRutinas] = useState([]);
  const [seguimientos, setSeguimientos] = useState([]);

  const handleViewCliente = async (cliente) => {
    setSelectedCliente(cliente);
    try {
      const [rutinasRes, seguimientosRes] = await Promise.all([
        rutinaService.getByAlumno(cliente.alumno.idAlumno),
        seguimientoFisicoService.getByAlumno(cliente.alumno.idAlumno)
      ]);
      setRutinas(rutinasRes.data);
      setSeguimientos(seguimientosRes.data);
      if (onViewCliente) onViewCliente(cliente);
    } catch (error) {
      console.error('Error cargando datos del cliente:', error);
    }
  };

  return (
    <div className="dashboard-section">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px'}}>
        <h2>Mis Clientes</h2>
      </div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>DNI</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Fecha Asignación</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientesAsignados.length > 0 ? (
              clientesAsignados.map(cliente => (
                <tr key={cliente.idAlumnoInstructor}>
                  <td>{cliente.alumno.nameAlumno} {cliente.alumno.apellidosAlumno}</td>
                  <td>{cliente.alumno.dni}</td>
                  <td>{cliente.alumno.telefono}</td>
                  <td>{cliente.alumno.email}</td>
                  <td>{new Date(cliente.fechaAsignacion).toLocaleDateString()}</td>
                  <td>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '500',
                      background: cliente.estado === 'Activo' ? '#d4edda' : '#f8d7da',
                      color: cliente.estado === 'Activo' ? '#155724' : '#721c24'
                    }}>
                      {cliente.estado || 'Activo'}
                    </span>
                  </td>
                  <td>
                    <button className="btn-secondary" style={{marginRight: '8px', fontSize: '12px', padding: '6px 12px'}}
                      onClick={() => handleViewCliente(cliente)}>Ver Historial</button>
                    <button className="btn-secondary" style={{fontSize: '12px', padding: '6px 12px'}}
                      onClick={() => onNuevoRegistro(cliente.alumno.idAlumno)}>Nuevo Registro</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{textAlign: 'center', padding: '30px'}}>No tienes clientes asignados</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedCliente && (
        <div style={{marginTop: '40px'}}>
          <h3>Historial de {selectedCliente.alumno.nameAlumno}</h3>
          
          <div style={{marginTop: '25px'}}>
            <h4>Rutinas Asignadas</h4>
            <div className="data-list">
              {rutinas.length > 0 ? (
                rutinas.map(rutina => (
                  <div key={rutina.idRutina} className="data-item">
                    <h4>{rutina.nombre}</h4>
                    <p><strong>Objetivo:</strong> {rutina.objetivo}</p>
                    <p>{rutina.descripcion}</p>
                    <span>Fecha inicio: {new Date(rutina.fechaInicio).toLocaleDateString()}</span>
                    <span>Estado: {rutina.activa ? 'Activa' : 'Inactiva'}</span>
                  </div>
                ))
              ) : (
                <p>No hay rutinas asignadas</p>
              )}
            </div>
          </div>

          <div style={{marginTop: '25px'}}>
            <h4>Progreso Físico</h4>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Peso (kg)</th>
                    <th>Grasa (%)</th>
                    <th>Músculo (kg)</th>
                    <th>Cintura (cm)</th>
                    <th>Notas</th>
                  </tr>
                </thead>
                <tbody>
                  {seguimientos.length > 0 ? (
                    seguimientos.map(seg => (
                      <tr key={seg.idSeguimiento}>
                        <td>{new Date(seg.fechaRegistro).toLocaleDateString()}</td>
                        <td>{seg.peso || 'N/A'}</td>
                        <td>{seg.grasaCorporal || 'N/A'}</td>
                        <td>{seg.musculo || 'N/A'}</td>
                        <td>{seg.medidaCintura || 'N/A'}</td>
                        <td>{seg.notas || 'N/A'}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" style={{textAlign: 'center', padding: '30px'}}>No hay registros de seguimiento</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientesTab;

