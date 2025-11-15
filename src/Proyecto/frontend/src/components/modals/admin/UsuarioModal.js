import React from 'react';

const UsuarioModal = ({ formData, setFormData, editingItem }) => {
  return (
    <>
      <div className="form-group">
        <label>Nombre de Usuario</label>
        <input type="text" value={formData.nameUsuario || ''} 
          onChange={(e) => setFormData({...formData, nameUsuario: e.target.value})} required />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input type="email" value={formData.email || ''} 
          onChange={(e) => setFormData({...formData, email: e.target.value})} required />
      </div>
      <div className="form-group">
        <label>Contraseña</label>
        <input type="password" value={formData.passwordUsuario || ''} 
          onChange={(e) => setFormData({...formData, passwordUsuario: e.target.value})} 
          required={!editingItem} />
      </div>
      <div className="form-group">
        <label>Rol</label>
        <select value={formData.rol?.idRol || ''} 
          onChange={(e) => setFormData({...formData, rol: {idRol: parseInt(e.target.value)}})} required>
          <option value="">Seleccionar rol</option>
          <option value="1">Administrador</option>
          <option value="2">Entrenador</option>
          <option value="3">Usuario</option>
        </select>
      </div>
      <div className="form-group">
        <label>
          <input type="checkbox" checked={formData.estado !== false} 
            onChange={(e) => setFormData({...formData, estado: e.target.checked})} />
          Activo
        </label>
      </div>
    </>
  );
};

export default UsuarioModal;

