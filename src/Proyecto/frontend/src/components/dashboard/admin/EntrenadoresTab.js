import React, { useState, useEffect } from 'react';
import { instructorService, alumnoInstructorService, rutinaService, seguimientoFisicoService } from '../../../services/api';

const EntrenadoresTab = ({ instructores, alumnos, onCreate }) => {
  const [reportes, setReportes] = useState([]);
  const [asignaciones, setAsignaciones] = useState([]);
  const [rutinas, setRutinas] = useState([]);
  const [seguimientos, setSeguimientos] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [asignacionesRes, rutinasRes, seguimientosRes] = await Promise.all([
        alumnoInstructorService.getAll(),
        rutinaService.getAll(),
        seguimientoFisicoService.getAll()
      ]);
      
      setAsignaciones(asignacionesRes.data);
      setRutinas(rutinasRes.data);
      setSeguimientos(seguimientosRes.data);
      
      // Calcular reportes por entrenador
      const reportesData = instructores.map(instructor => {
        const alumnosAsignados = asignacionesRes.data.filter(a => 
          a.instructor?.idInstructor === instructor.idInstructor && a.estado === 'Activo'
        );
        const rutinasAsignadas = rutinasRes.data.filter(r => 
          r.instructor?.idInstructor === instructor.idInstructor
        );
        const seguimientosRealizados = seguimientosRes.data.filter(s => 
          s.instructor?.idInstructor === instructor.idInstructor
        );
        
        return {
          instructor,
          usuariosActivos: alumnosAsignados.length,
          rutinasAsignadas: rutinasAsignadas.length,
          seguimientosRealizados: seguimientosRealizados.length,
          alumnos: alumnosAsignados.map(a => a.alumno)
        };
      });
      
      setReportes(reportesData);
    } catch (error) {
      console.error('Error cargando datos:', error);
    }
  };

  return (
    <div className="dashboard-section">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px'}}>
        <h2>Gestión de Entrenadores</h2>
        <button className="btn-primary" onClick={() => onCreate()}>Registrar Entrenador</button>
      </div>

      <h3 style={{marginBottom: '20px'}}>Reportes de Desempeño</h3>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Entrenador</th>
              <th>Usuarios Activos</th>
              <th>Rutinas Asignadas</th>
              <th>Seguimientos Realizados</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reportes.length > 0 ? (
              reportes.map((reporte, index) => (
                <tr key={reporte.instructor.idInstructor || index}>
                  <td>
                    {reporte.instructor.namaInstructor} {reporte.instructor.apellidosInstructor}
                    <br />
                    <small style={{color: '#666'}}>{reporte.instructor.especialidad || 'Sin especialidad'}</small>
                  </td>
                  <td>{reporte.usuariosActivos}</td>
                  <td>{reporte.rutinasAsignadas}</td>
                  <td>{reporte.seguimientosRealizados}</td>
                  <td>
                    <button className="btn-secondary" style={{fontSize: '12px', padding: '6px 12px'}}
                      onClick={() => {
                        const alumnosList = reporte.alumnos.map(a => 
                          `${a.nameAlumno} ${a.apellidosAlumno}`
                        ).join(', ');
                        alert(`Alumnos asignados:\n${alumnosList || 'Ninguno'}`);
                      }}>
                      Ver Alumnos
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{textAlign: 'center', padding: '30px'}}>No hay entrenadores registrados</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <h3 style={{marginTop: '40px', marginBottom: '20px'}}>Lista de Entrenadores</h3>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>DNI</th>
              <th>Teléfono</th>
              <th>Especialidad</th>
              <th>Fecha Contratación</th>
            </tr>
          </thead>
          <tbody>
            {instructores.length > 0 ? (
              instructores.map(instructor => (
                <tr key={instructor.idInstructor}>
                  <td>{instructor.namaInstructor} {instructor.apellidosInstructor}</td>
                  <td>{instructor.dni}</td>
                  <td>{instructor.telefono || 'N/A'}</td>
                  <td>{instructor.especialidad || 'N/A'}</td>
                  <td>{new Date(instructor.fechaContratacion).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{textAlign: 'center', padding: '30px'}}>No hay entrenadores registrados</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EntrenadoresTab;

