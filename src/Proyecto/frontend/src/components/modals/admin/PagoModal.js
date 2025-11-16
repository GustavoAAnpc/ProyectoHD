import React from 'react';

const PagoModal = ({ formData, setFormData, membresias, promociones }) => {
  const handleMembresiaChange = (e) => {
    const membresiaId = parseInt(e.target.value);
    const membresiaSeleccionada = membresias.find(m => m.idMembresia === membresiaId);
    
    setFormData({
      ...formData, 
      membresia: {idMembresia: membresiaId},
      monto: membresiaSeleccionada?.tipoMembresia?.precio || formData.monto || ''
    });
  };

  const handlePromocionChange = (e) => {
    const promocionId = parseInt(e.target.value);
    const promocionSeleccionada = promociones.find(p => p.idPromocion === promocionId);
    
    if (promocionSeleccionada && formData.membresia?.idMembresia) {
      const membresiaSeleccionada = membresias.find(m => m.idMembresia === formData.membresia.idMembresia);
      const precioBase = parseFloat(membresiaSeleccionada?.tipoMembresia?.precio || 0);
      const descuento = promocionSeleccionada.descuentoPorcentaje || 0;
      const precioConDescuento = precioBase * (1 - descuento / 100);
      
      setFormData({
        ...formData,
        promocion: {idPromocion: promocionId},
        monto: precioConDescuento
      });
    } else {
      setFormData({
        ...formData,
        promocion: promocionId ? {idPromocion: promocionId} : null
      });
    }
  };

  return (
    <>
      <div className="form-group">
        <label>Membresía</label>
        <select value={formData.membresia?.idMembresia || ''} 
          onChange={handleMembresiaChange} required>
          <option value="">Seleccionar membresía</option>
          {membresias.map(m => (
            <option key={m.idMembresia} value={m.idMembresia}>
              {m.alumno?.nameAlumno} {m.alumno?.apellidosAlumno} - {m.tipoMembresia?.nombre} (S/ {parseFloat(m.tipoMembresia?.precio || 0).toFixed(2)})
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Promoción (Opcional)</label>
        <select value={formData.promocion?.idPromocion || ''} 
          onChange={handlePromocionChange}>
          <option value="">Sin promoción</option>
          {promociones.filter(p => p.activa && new Date(p.fechaFin) >= new Date()).map(p => (
            <option key={p.idPromocion} value={p.idPromocion}>
              {p.nombre} - {p.descuentoPorcentaje}% descuento
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

