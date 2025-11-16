import React from 'react';

const PagoModal = ({ formData, setFormData, membresias }) => {
  return (
    <>
      <div className="form-group">
        <label>Membresía</label>
        <select value={formData.membresia?.idMembresia || ''} 
          onChange={(e) => setFormData({...formData, membresia: {idMembresia: parseInt(e.target.value)}})} required>
          <option value="">Seleccionar membresía</option>
          {membresias.map(m => (
            <option key={m.idMembresia} value={m.idMembresia}>
              {m.alumno?.nameAlumno} - {m.tipoMembresia?.nombre}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Monto</label>
        <input type="number" step="0.01" value={formData.monto || ''} 
          onChange={(e) => setFormData({...formData, monto: parseFloat(e.target.value)})} required />
      </div>
      <div className="form-group">
        <label>Fecha de Pago</label>
        <input type="date" value={formData.fechaPago || ''} 
          onChange={(e) => setFormData({...formData, fechaPago: e.target.value})} required />
      </div>
      <div className="form-group">
        <label>Método de Pago</label>
        <select value={formData.metodoPago || ''} 
          onChange={(e) => setFormData({...formData, metodoPago: e.target.value})} required>
          <option value="">Seleccionar método</option>
          <option value="Efectivo">Efectivo</option>
          <option value="Tarjeta">Tarjeta</option>
          <option value="Transferencia">Transferencia</option>
        </select>
      </div>
      <div className="form-group">
        <label>Comprobante</label>
        <input type="text" value={formData.comprobante || ''} 
          onChange={(e) => setFormData({...formData, comprobante: e.target.value})} />
      </div>
      <div className="form-group">
        <label>Estado</label>
        <select value={formData.estado || 'Pagado'} 
          onChange={(e) => setFormData({...formData, estado: e.target.value})}>
          <option value="Pagado">Pagado</option>
          <option value="Pendiente">Pendiente</option>
          <option value="Cancelado">Cancelado</option>
        </select>
      </div>
    </>
  );
};

export default PagoModal;

