import React from 'react';

const EjercicioModal = ({ formData, setFormData }) => {
  return (
    <>
      <div className="form-group">
        <label>Nombre del Ejercicio</label>
        <input type="text" value={formData.nombre || ''} 
          onChange={(e) => setFormData({...formData, nombre: e.target.value})} required />
      </div>
      <div className="form-group">
        <label>Descripción</label>
        <textarea value={formData.descripcion || ''} 
          onChange={(e) => setFormData({...formData, descripcion: e.target.value})} rows="4" />
      </div>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
        <div className="form-group">
          <label>Grupo Muscular</label>
          <select value={formData.grupoMuscular || ''} 
            onChange={(e) => setFormData({...formData, grupoMuscular: e.target.value})}>
            <option value="">Seleccionar</option>
            <option value="Pecho">Pecho</option>
            <option value="Espalda">Espalda</option>
            <option value="Hombros">Hombros</option>
            <option value="Brazos">Brazos</option>
            <option value="Piernas">Piernas</option>
            <option value="Core">Core</option>
            <option value="Cardio">Cardio</option>
          </select>
        </div>
        <div className="form-group">
          <label>Nivel</label>
          <select value={formData.nivel || ''} 
            onChange={(e) => setFormData({...formData, nivel: e.target.value})}>
            <option value="">Seleccionar</option>
            <option value="Principiante">Principiante</option>
            <option value="Intermedio">Intermedio</option>
            <option value="Avanzado">Avanzado</option>
          </select>
        </div>
      </div>
      <div className="form-group">
        <label>URL del Video</label>
        <input type="url" value={formData.videoUrl || ''} 
          onChange={(e) => setFormData({...formData, videoUrl: e.target.value})} 
          placeholder="https://..." />
      </div>
      <div className="form-group">
        <label>URL de la Imagen</label>
        <input type="url" value={formData.imagenUrl || ''} 
          onChange={(e) => setFormData({...formData, imagenUrl: e.target.value})} 
          placeholder="https://..." />
      </div>
    </>
  );
};

export default EjercicioModal;

