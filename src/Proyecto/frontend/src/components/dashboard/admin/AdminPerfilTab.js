import React from 'react';

const AdminPerfilTab = ({ administrador, onEdit, onChangePassword }) => {
    if (!administrador) return <p>Cargando...</p>;

    // Check for incomplete profile
    const isIncomplete = !administrador.telefono || !administrador.direccion || !administrador.genero;

    return (
        <div className="dashboard-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <h2>Mi Perfil</h2>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="btn-secondary" onClick={onChangePassword}>Cambiar Contraseña</button>
                    <button className="btn-primary" onClick={onEdit}>Editar Perfil</button>
                </div>
            </div>

            {isIncomplete && (
                <div style={{
                    backgroundColor: '#fff3cd',
                    border: '1px solid #ffc107',
                    borderRadius: '4px',
                    padding: '12px',
                    marginBottom: '20px',
                    color: '#856404'
                }}>
                    ⚠️ Tu perfil está incompleto. Por favor, completa todos los campos para una mejor experiencia.
                </div>
            )}

            <div className="profile-info">
                <p><strong>Nombre Completo:</strong> {administrador.nameAdmin} {administrador.apellidosAdmin}</p>
                <p><strong>DNI:</strong> {administrador.dni}</p>
                <p><strong>Email:</strong> {administrador.usuario?.email || 'No especificado'}</p>
                <p><strong>Teléfono:</strong> {administrador.telefono || 'No especificado'}</p>
                <p><strong>Dirección:</strong> {administrador.direccion || 'No especificada'}</p>
                <p><strong>Género:</strong> {administrador.genero || 'No especificado'}</p>
                <p><strong>Fecha de Registro:</strong> {administrador.fechaRegistro ? new Date(administrador.fechaRegistro).toLocaleDateString() : 'No especificada'}</p>
            </div>
        </div>
    );
};

export default AdminPerfilTab;
