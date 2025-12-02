import React from 'react';

const EntrenadorPerfilTab = ({ instructor, onEdit, onChangePassword }) => {
    if (!instructor) return <p>Cargando...</p>;

    // Check for incomplete profile
    const isIncomplete = !instructor.telefono || !instructor.especialidad;

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
                <p><strong>Nombre Completo:</strong> {instructor.namaInstructor} {instructor.apellidosInstructor}</p>
                <p><strong>DNI:</strong> {instructor.dni}</p>
                <p><strong>Email:</strong> {instructor.usuario?.email || 'No especificado'}</p>
                <p><strong>Teléfono:</strong> {instructor.telefono || 'No especificado'}</p>
                <p><strong>Especialidad:</strong> {instructor.especialidad || 'No especificada'}</p>
                <p><strong>Fecha de Contratación:</strong> {instructor.fechaContratacion ? new Date(instructor.fechaContratacion).toLocaleDateString() : 'No especificada'}</p>
            </div>
        </div>
    );
};

export default EntrenadorPerfilTab;
