import React from 'react';

const NoticiaModal = ({ formData, setFormData, instructores }) => {
  return (
    <>
      <div className="form-group">
        <label>Título *</label>
        <input type="text" value={formData.titulo || ''} 
          onChange={(e) => setFormData({...formData, titulo: e.target.value})} required />
      </div>
      <div className="form-group">
        <label>Contenido</label>
        <textarea value={formData.contenido || ''} 
          onChange={(e) => setFormData({...formData, contenido: e.target.value})} rows="5" />
      </div>
      <div className="form-group">
        <label>Tipo *</label>
        <select value={formData.tipo || ''} 
          onChange={(e) => setFormData({...formData, tipo: e.target.value})} required>
          <option value="">Seleccionar tipo</option>
          <option value="Noticia">Noticia</option>
          <option value="Evento">Evento</option>
          <option value="Comunicado">Comunicado</option>
        </select>
      </div>
      <div className="form-group">
        <label>Fecha Publicación *</label>
        <input type="date" value={formData.fechaPublicacion || new Date().toISOString().split('T')[0]} 
          onChange={(e) => setFormData({...formData, fechaPublicacion: e.target.value})} required />
      </div>
      <div className="form-group">
        <label>Fecha Evento (si aplica)</label>
        <input type="date" value={formData.fechaEvento || ''} 
          onChange={(e) => setFormData({...formData, fechaEvento: e.target.value || null})} />
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

export default NoticiaModal;

