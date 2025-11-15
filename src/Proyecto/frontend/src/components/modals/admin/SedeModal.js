import React from 'react';

const SedeModal = ({ formData, setFormData }) => {
  return (
    <>
      <div className="form-group">
        <label>Nombre</label>
        <input type="text" value={formData.nombre || ''} 
          onChange={(e) => setFormData({...formData, nombre: e.target.value})} required />
      </div>
      <div className="form-group">
        <label>Dirección</label>
        <input type="text" value={formData.direccion || ''} 
          onChange={(e) => setFormData({...formData, direccion: e.target.value})} />
      </div>
      <div className="form-group">
        <label>Teléfono</label>
        <input type="text" value={formData.telefono || ''} 
          onChange={(e) => setFormData({...formData, telefono: e.target.value})} />
      </div>
      <div className="form-group">
        <label>Horario Apertura</label>
        <input type="text" value={formData.horarioApertura || ''} 
          onChange={(e) => setFormData({...formData, horarioApertura: e.target.value})} 
          placeholder="Ej: 06:00" />
      </div>
      <div className="form-group">
        <label>Horario Cierre</label>
        <input type="text" value={formData.horarioCierre || ''} 
          onChange={(e) => setFormData({...formData, horarioCierre: e.target.value})} 
          placeholder="Ej: 22:00" />
      </div>
      <div className="form-group">
        <label>
          <input type="checkbox" checked={formData.activa !== false} 
            onChange={(e) => setFormData({...formData, activa: e.target.checked})} />
          Activa
        </label>
      </div>
    </>
  );
};

export default SedeModal;

