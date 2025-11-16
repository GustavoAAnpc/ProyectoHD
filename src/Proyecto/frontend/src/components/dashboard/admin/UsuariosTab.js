import React, { useState } from 'react';
import { alumnoInstructorService, alumnoService, instructorService } from '../../../services/api';

const UsuariosTab = ({ usuarios, alumnos, instructores, onEdit, onToggleEstado, onResetPassword, onCreate }) => {
  const [showAsignarModal, setShowAsignarModal] = useState(false);
  const [selectedAlumno, setSelectedAlumno] = useState(null);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [asignaciones, setAsignaciones] = useState([]);

  React.useEffect(() => {
    loadAsignaciones();
  }, []);

  const loadAsignaciones = async () => {
    try {
      const res = await alumnoInstructorService.getAll();
      setAsignaciones(res.data);
    } catch (error) {
      console.error('Error cargando asignaciones:', error);
    }
  };

  const handleAsignarAlumno = async () => {
    if (!selectedAlumno || !selectedInstructor) {
      alert('Seleccione un alumno y un entrenador');
      return;
    }

    try {
      await alumnoInstructorService.create({
        alumno: { idAlumno: selectedAlumno },
        instructor: { idInstructor: selectedInstructor },
        estado: 'Activo'
      });
      alert('Alumno asignado correctamente');
      setShowAsignarModal(false);
      setSelectedAlumno(null);
      setSelectedInstructor(null);
      loadAsignaciones();
    } catch (error) {
      console.error('Error asignando:', error);
      alert('Error al asignar alumno');
    }
  };

  const handleEliminarAsignacion = async (id) => {
    if (!window.confirm('¿Está seguro de eliminar esta asignación?')) return;
    try {
      await alumnoInstructorService.delete(id);
      loadAsignaciones();
    } catch (error) {
      console.error('Error eliminando asignación:', error);
      alert('Error al eliminar asignación');
    }
  };

  return (
    <div className="dashboard-section">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px'}}>
        <h2>Gestión de Usuarios</h2>
        <div style={{display: 'flex', gap: '10px'}}>
          <button className="btn-secondary" onClick={() => setShowAsignarModal(true)}>Asignar Alumno a Entrenador</button>
          <button className="btn-primary" onClick={() => onCreate()}>Nuevo Usuario</button>
        </div>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Fecha Registro</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length > 0 ? (
              usuarios.map(usuario => (
                <tr key={usuario.idUsuario}>
                  <td>{usuario.nameUsuario}</td>
                  <td>{usuario.email}</td>
                  <td>{usuario.rol?.nombreRol || 'N/A'}</td>
                  <td>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '500',
                      background: usuario.estado ? '#d4edda' : '#f8d7da',
                      color: usuario.estado ? '#155724' : '#721c24'
                    }}>
                      {usuario.estado ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td>{new Date(usuario.fechaRegistro).toLocaleDateString()}</td>
                  <td>
                    <button className="btn-secondary" style={{marginRight: '8px', fontSize: '12px', padding: '6px 12px'}}
                      onClick={() => onEdit(usuario)}>Editar</button>
                    <button className="btn-secondary" style={{marginRight: '8px', fontSize: '12px', padding: '6px 12px'}}
                      onClick={() => onToggleEstado(usuario.idUsuario, usuario.estado)}>
                      {usuario.estado ? 'Suspender' : 'Activar'}
                    </button>
                    <button className="btn-secondary" style={{fontSize: '12px', padding: '6px 12px'}}
                      onClick={() => onResetPassword(usuario.idUsuario)}>Reset Password</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{textAlign: 'center', padding: '30px'}}>No hay usuarios registrados</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <h3 style={{marginTop: '40px', marginBottom: '20px'}}>Asignaciones Alumno-Entrenador</h3>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Alumno</th>
              <th>Entrenador</th>
              <th>Fecha Asignación</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {asignaciones.length > 0 ? (
              asignaciones.map(asignacion => (
                <tr key={asignacion.idAlumnoInstructor}>
                  <td>{asignacion.alumno?.nameAlumno} {asignacion.alumno?.apellidosAlumno}</td>
                  <td>{asignacion.instructor?.namaInstructor} {asignacion.instructor?.apellidosInstructor}</td>
                  <td>{new Date(asignacion.fechaAsignacion).toLocaleDateString()}</td>
                  <td>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '500',
                      background: asignacion.estado === 'Activo' ? '#d4edda' : '#f8d7da',
                      color: asignacion.estado === 'Activo' ? '#155724' : '#721c24'
                    }}>
                      {asignacion.estado || 'Activo'}
                    </span>
                  </td>
                  <td>
                    <button className="btn-secondary" style={{fontSize: '12px', padding: '6px 12px'}}
                      onClick={() => handleEliminarAsignacion(asignacion.idAlumnoInstructor)}>Eliminar</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{textAlign: 'center', padding: '30px'}}>No hay asignaciones registradas</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showAsignarModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'var(--bg-color)',
            padding: '30px',
            borderRadius: '12px',
            maxWidth: '500px',
            width: '90%',
            border: '2px solid var(--border-color)'
          }}>
            <h3 style={{marginBottom: '20px'}}>Asignar Alumno a Entrenador</h3>
            <div className="form-group">
              <label>Alumno *</label>
              <select value={selectedAlumno || ''} onChange={(e) => setSelectedAlumno(parseInt(e.target.value))} required>
                <option value="">Seleccionar alumno</option>
                {alumnos.map(a => (
                  <option key={a.idAlumno} value={a.idAlumno}>
                    {a.nameAlumno} {a.apellidosAlumno}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Entrenador *</label>
              <select value={selectedInstructor || ''} onChange={(e) => setSelectedInstructor(parseInt(e.target.value))} required>
                <option value="">Seleccionar entrenador</option>
                {instructores.map(i => (
                  <option key={i.idInstructor} value={i.idInstructor}>
                    {i.namaInstructor} {i.apellidosInstructor}
                  </option>
                ))}
              </select>
            </div>
            <div style={{display: 'flex', gap: '10px', marginTop: '25px'}}>
              <button className="btn-primary" onClick={handleAsignarAlumno} style={{flex: 1}}>Asignar</button>
              <button className="btn-secondary" onClick={() => setShowAsignarModal(false)} style={{flex: 1}}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsuariosTab;
