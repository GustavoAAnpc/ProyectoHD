import React from 'react';

const FeedbackModal = ({ formData, setFormData, onSubmit, onClose }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label>Tipo de Feedback</label>
        <select value={formData.tipo || ''} 
          onChange={(e) => setFormData({...formData, tipo: e.target.value})} required>
          <option value="">Seleccionar</option>
          <option value="Feedback">Feedback General</option>
          <option value="Sugerencia">Sugerencia</option>
          <option value="Queja">Queja</option>
          <option value="Recomendación">Recomendación</option>
        </select>
      </div>
      <div className="form-group">
        <label>Mensaje</label>
        <textarea value={formData.descripcion || ''} 
          onChange={(e) => setFormData({...formData, descripcion: e.target.value})} 
          rows="6" required 
          placeholder="Comparte tu opinión sobre el gimnasio, entrenadores, clases, etc." />
      </div>
      <div style={{display: 'flex', gap: '10px', marginTop: '25px'}}>
        <button type="submit" className="btn-primary">Enviar Feedback</button>
        <button type="button" className="btn-secondary" onClick={onClose}>Cancelar</button>
      </div>
    </form>
  );
};

export default FeedbackModal;

