import React from 'react';

const PerfilAdminTab = ({ usuario, onEditPerfil, onCambiarPassword }) => {
    if (!usuario) return <p>Cargando...</p>;

    return (
        <div className="dashboard-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <h2>Mi Perfil</h2>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="btn-primary" onClick={onEditPerfil}>Editar Perfil</button>
                    <button className="btn-secondary" onClick={onCambiarPassword}>Cambiar Contraseña</button>
                </div>
            </div>

            <div className="profile-info">
                <p><strong>Nombre de Usuario:</strong> {usuario.nameUsuario}</p>
                <p><strong>Email:</strong> {usuario.email}</p>
                <p><strong>Rol:</strong> {usuario.rol?.nombreRol || 'N/A'}</p>
                <p><strong>Estado:</strong> {usuario.estado ? 'Activo' : 'Inactivo'}</p>
            </div>
        </div>
    );
};

export default PerfilAdminTab;
