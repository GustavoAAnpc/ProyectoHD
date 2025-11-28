import React from 'react';

const PerfilEntrenadorTab = ({ usuario, instructor, onEditUsuario, onEditInstructor, onCambiarPassword }) => {
    if (!usuario || !instructor) return <p>Cargando...</p>;

    return (
        <div className="dashboard-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <h2>Mi Perfil</h2>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="btn-primary" onClick={onEditInstructor}>Editar Perfil</button>
                    <button className="btn-secondary" onClick={onCambiarPassword}>Cambiar Contraseña</button>
                </div>
            </div>

            <div className="profile-info">
                <h3 style={{ marginTop: '20px', marginBottom: '15px', color: '#4CAF50' }}>Información Personal</h3>
                <p><strong>Nombre Completo:</strong> {instructor.namaInstructor} {instructor.apellidosInstructor}</p>
                <p><strong>DNI:</strong> {instructor.dni}</p>
                <p><strong>Teléfono:</strong> {instructor.telefono || 'No especificado'}</p>
                <p><strong>Email:</strong> {instructor.email || 'No especificado'}</p>
                <p><strong>Especialidad:</strong> {instructor.especialidad || 'No especificada'}</p>
                <p><strong>Fecha de Contratación:</strong> {instructor.fechaContratacion ? new Date(instructor.fechaContratacion).toLocaleDateString() : 'N/A'}</p>

                <h3 style={{ marginTop: '30px', marginBottom: '15px', color: '#4CAF50' }}>Información de Usuario</h3>
                <p><strong>Nombre de Usuario:</strong> {usuario.nameUsuario}</p>
                <p><strong>Email de Usuario:</strong> {usuario.email}</p>
                <p><strong>Rol:</strong> {usuario.rol?.nombreRol || 'N/A'}</p>
                <p><strong>Estado:</strong> {usuario.estado ? 'Activo' : 'Inactivo'}</p>
            </div>
        </div>
    );
};

export default PerfilEntrenadorTab;
