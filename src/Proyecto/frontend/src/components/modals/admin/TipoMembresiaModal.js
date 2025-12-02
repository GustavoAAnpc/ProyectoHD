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
        <input type="number" step="0.01" min="0" value={formData.precio || ''} 
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            if (value >= 0 || e.target.value === '') {
              setFormData({...formData, precio: value || ''});
            } else {
              alert('El precio no puede ser negativo');
            }
          }} required />
      </div>
      <div className="form-group">
        <label>Duración (meses)</label>
        <input type="number" min="1" value={formData.duracionMeses || ''} 
          onChange={(e) => setFormData({...formData, duracionMeses: parseInt(e.target.value)})} required />
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

