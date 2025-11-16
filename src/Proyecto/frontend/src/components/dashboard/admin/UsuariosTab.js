import React from 'react';

const UsuariosTab = ({ usuarios, onEdit, onToggleEstado, onResetPassword, onCreate }) => {
  return (
    <div className="dashboard-section">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px'}}>
        <h2>Gestión de Usuarios</h2>
        <button className="btn-primary" onClick={() => onCreate()}>Nuevo Usuario</button>
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
    </div>
  );
};

export default UsuariosTab;

