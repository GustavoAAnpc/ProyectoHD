import React from 'react';

const PerfilTab = ({ alumno, onEdit, onChangePassword }) => {
  if (!alumno) return <p>Cargando...</p>;

  const peso = alumno.pesoActual;
  const alturaCm = alumno.altura;

  let imc = null;
  if (peso && alturaCm) {
    const alturaM = alturaCm / 100;
    imc = (peso / (alturaM * alturaM)).toFixed(2);
  }

  return (
    <div className="dashboard-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <h2>Mi Perfil</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn-secondary" onClick={onChangePassword}>Cambiar Contraseña</button>
          <button className="btn-primary" onClick={onEdit}>Editar Perfil</button>
        </div>
      </div>

      <div className="profile-info">
        <p><strong>Nombre Completo:</strong> {alumno.nameAlumno} {alumno.apellidosAlumno}</p>
        <p><strong>Teléfono:</strong> {alumno.telefono}</p>
        <p><strong>Email:</strong> {alumno.email}</p>
        <p><strong>Dirección:</strong> {alumno.direccion || 'No especificada'}</p>
        <p><strong>Género:</strong> {alumno.genero || 'No especificado'}</p>
        <p><strong>Peso Actual:</strong> {peso || 'N/A'} kg</p>
        <p><strong>Altura:</strong> {alturaCm || 'N/A'} cm</p>

        {imc && <p><strong>IMC:</strong> {imc}</p>}

        <p><strong>Fecha de Inscripción:</strong> {new Date(alumno.fechaInscripcion).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default PerfilTab;
