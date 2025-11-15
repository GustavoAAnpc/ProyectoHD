import React from 'react';

const PerfilTab = ({ alumno, onEdit }) => {
  if (!alumno) return <p>Cargando...</p>;

  return (
    <div className="dashboard-section">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px'}}>
        <h2>Mi Perfil</h2>
        <button className="btn-primary" onClick={onEdit}>Editar Perfil</button>
      </div>
      <div className="profile-info">
        <p><strong>Nombre Completo:</strong> {alumno.nameAlumno} {alumno.apellidosAlumno}</p>
        <p><strong>DNI:</strong> {alumno.dni}</p>
        <p><strong>Teléfono:</strong> {alumno.telefono}</p>
        <p><strong>Email:</strong> {alumno.email}</p>
        <p><strong>Dirección:</strong> {alumno.direccion || 'No especificada'}</p>
        <p><strong>Género:</strong> {alumno.genero || 'No especificado'}</p>
        <p><strong>Peso Actual:</strong> {alumno.pesoActual || 'N/A'} kg</p>
        <p><strong>Altura:</strong> {alumno.altura || 'N/A'} cm</p>
        <p><strong>Fecha de Inscripción:</strong> {new Date(alumno.fechaInscripcion).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default PerfilTab;

