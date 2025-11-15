import React from 'react';

const PlanNutricionalModal = ({ formData, setFormData, clientesAsignados }) => {
  return (
    <>
      <div className="form-group">
        <label>Cliente</label>
        <select value={formData.alumno?.idAlumno || ''} 
          onChange={(e) => setFormData({...formData, alumno: {idAlumno: parseInt(e.target.value)}})} required>
          <option value="">Seleccionar cliente</option>
          {clientesAsignados.map(c => (
            <option key={c.alumno.idAlumno} value={c.alumno.idAlumno}>
              {c.alumno.nameAlumno} {c.alumno.apellidosAlumno}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Nombre del Plan</label>
        <input type="text" value={formData.namePlan || ''} 
          onChange={(e) => setFormData({...formData, namePlan: e.target.value})} required />
      </div>
      <div className="form-group">
        <label>Descripción</label>
        <textarea value={formData.descripcion || ''} 
          onChange={(e) => setFormData({...formData, descripcion: e.target.value})} rows="3" />
      </div>
      <div className="form-group">
        <label>Objetivo</label>
        <select value={formData.objetivo || ''} 
          onChange={(e) => setFormData({...formData, objetivo: e.target.value})}>
          <option value="">Seleccionar objetivo</option>
          <option value="Ganar masa">Ganar masa</option>
          <option value="Bajar grasa">Bajar grasa</option>
          <option value="Mantenimiento">Mantenimiento</option>
          <option value="Definición">Definición</option>
        </select>
      </div>
      <div className="form-group">
        <label>Calorías Diarias</label>
        <input type="number" value={formData.caloriasDiarias || ''} 
          onChange={(e) => setFormData({...formData, caloriasDiarias: parseInt(e.target.value)})} />
      </div>
      <div className="form-group">
        <label>Notas de Personalización</label>
        <textarea value={formData.notasPersonalizacion || ''} 
          onChange={(e) => setFormData({...formData, notasPersonalizacion: e.target.value})} rows="3" />
      </div>
      <div className="form-group">
        <label>Estado</label>
        <select value={formData.estado || 'Activo'} 
          onChange={(e) => setFormData({...formData, estado: e.target.value})}>
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>
      </div>
    </>
  );
};

export default PlanNutricionalModal;

