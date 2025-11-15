import React from 'react';

const MensajeModal = ({ formData, setFormData, onSubmit, onClose }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label>Asunto</label>
        <input type="text" value={formData.asunto || ''} 
          onChange={(e) => setFormData({...formData, asunto: e.target.value})} />
      </div>
      <div className="form-group">
        <label>Mensaje</label>
        <textarea value={formData.contenido || ''} 
          onChange={(e) => setFormData({...formData, contenido: e.target.value})} 
          rows="6" required />
      </div>
      <div style={{display: 'flex', gap: '10px', marginTop: '25px'}}>
        <button type="submit" className="btn-primary">Enviar</button>
        <button type="button" className="btn-secondary" onClick={onClose}>Cancelar</button>
      </div>
    </form>
  );
};

export default MensajeModal;

