import React from 'react';

const TipoMembresiaModal = ({ formData, setFormData }) => {
  return (
    <>
      <div className="form-group">
        <label>Nombre</label>
        <input type="text" value={formData.nombre || ''} 
          onChange={(e) => setFormData({...formData, nombre: e.target.value})} required />
      </div>
      <div className="form-group">
        <label>Descripción</label>
        <textarea value={formData.descripcion || ''} 
          onChange={(e) => setFormData({...formData, descripcion: e.target.value})} />
      </div>
      <div className="form-group">
        <label>Precio</label>
        <input type="number" step="0.01" value={formData.precio || ''} 
          onChange={(e) => setFormData({...formData, precio: parseFloat(e.target.value)})} required />
      </div>
      <div className="form-group">
        <label>Duración (días)</label>
        <input type="number" value={formData.duracionDias || ''} 
          onChange={(e) => setFormData({...formData, duracionDias: parseInt(e.target.value)})} required />
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

export default TipoMembresiaModal;

