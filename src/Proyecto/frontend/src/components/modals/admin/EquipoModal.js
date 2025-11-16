import React from 'react';

const EquipoModal = ({ formData, setFormData, sedes }) => {
  return (
    <>
      <div className="form-group">
        <label>Sede</label>
        <select value={formData.sede?.idSede || ''} 
          onChange={(e) => setFormData({...formData, sede: {idSede: parseInt(e.target.value)}})} required>
          <option value="">Seleccionar sede</option>
          {sedes.map(s => (
            <option key={s.idSede} value={s.idSede}>{s.nombre}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Nombre</label>
        <input type="text" value={formData.nombre || ''} 
          onChange={(e) => setFormData({...formData, nombre: e.target.value})} required />
      </div>
      <div className="form-group">
        <label>Tipo</label>
        <input type="text" value={formData.tipo || ''} 
          onChange={(e) => setFormData({...formData, tipo: e.target.value})} />
      </div>
      <div className="form-group">
        <label>Marca</label>
        <input type="text" value={formData.marca || ''} 
          onChange={(e) => setFormData({...formData, marca: e.target.value})} />
      </div>
      <div className="form-group">
        <label>Modelo</label>
        <input type="text" value={formData.modelo || ''} 
          onChange={(e) => setFormData({...formData, modelo: e.target.value})} />
      </div>
      <div className="form-group">
        <label>Estado</label>
        <select value={formData.estado || 'Disponible'} 
          onChange={(e) => setFormData({...formData, estado: e.target.value})}>
          <option value="Disponible">Disponible</option>
          <option value="En Mantenimiento">En Mantenimiento</option>
          <option value="Fuera de Servicio">Fuera de Servicio</option>
        </select>
      </div>
      <div className="form-group">
        <label>Ubicación</label>
        <input type="text" value={formData.ubicacion || ''} 
          onChange={(e) => setFormData({...formData, ubicacion: e.target.value})} />
      </div>
    </>
  );
};

export default EquipoModal;

