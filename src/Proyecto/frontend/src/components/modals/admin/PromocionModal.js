import React from 'react';

const PromocionModal = ({ formData, setFormData }) => {
  return (
    <>
      <div className="form-group">
        <label>Título *</label>
        <input type="text" value={formData.titulo || ''} 
          onChange={(e) => setFormData({...formData, titulo: e.target.value})} required />
      </div>
      <div className="form-group">
        <label>Descripción</label>
        <textarea value={formData.descripcion || ''} 
          onChange={(e) => setFormData({...formData, descripcion: e.target.value})} rows="3" />
      </div>
      <div className="form-group">
        <label>Tipo de Promoción *</label>
        <select value={formData.tipoPromocion || ''} 
          onChange={(e) => setFormData({...formData, tipoPromocion: e.target.value})} required>
          <option value="">Seleccionar tipo</option>
          <option value="2x1">2x1</option>
          <option value="Descuento">Descuento</option>
          <option value="Inscripción Gratuita">Inscripción Gratuita</option>
          <option value="Otro">Otro</option>
        </select>
      </div>
      <div className="form-group">
        <label>Descuento Porcentaje (%)</label>
        <input type="number" step="0.01" value={formData.descuentoPorcentaje || ''} 
          onChange={(e) => setFormData({...formData, descuentoPorcentaje: parseFloat(e.target.value) || null})} />
      </div>
      <div className="form-group">
        <label>Descuento Monto (S/)</label>
        <input type="number" step="0.01" value={formData.descuentoMonto || ''} 
          onChange={(e) => setFormData({...formData, descuentoMonto: parseFloat(e.target.value) || null})} />
      </div>
      <div className="form-group">
        <label>Fecha Inicio *</label>
        <input type="date" value={formData.fechaInicio || ''} 
          onChange={(e) => setFormData({...formData, fechaInicio: e.target.value})} required />
      </div>
      <div className="form-group">
        <label>Fecha Fin *</label>
        <input type="date" value={formData.fechaFin || ''} 
          onChange={(e) => setFormData({...formData, fechaFin: e.target.value})} required />
      </div>
      <div className="form-group">
        <label>
          <input type="checkbox" checked={formData.mostrarEnWeb !== false} 
            onChange={(e) => setFormData({...formData, mostrarEnWeb: e.target.checked})} />
          Mostrar en Web
        </label>
      </div>
      <div className="form-group">
        <label>
          <input type="checkbox" checked={formData.mostrarEnDashboardUsuario !== false} 
            onChange={(e) => setFormData({...formData, mostrarEnDashboardUsuario: e.target.checked})} />
          Mostrar en Dashboard Usuario
        </label>
      </div>
      <div className="form-group">
        <label>
          <input type="checkbox" checked={formData.mostrarEnDashboardEntrenador !== false} 
            onChange={(e) => setFormData({...formData, mostrarEnDashboardEntrenador: e.target.checked})} />
          Mostrar en Dashboard Entrenador
        </label>
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

export default PromocionModal;

