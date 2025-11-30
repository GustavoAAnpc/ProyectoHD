import React, { useState, useEffect } from 'react';

const PagoModal = ({ formData, setFormData, alumnos, tiposMembresia, promociones }) => {
  const [selectedAlumnoId, setSelectedAlumnoId] = useState(formData.alumno?.idAlumno || '');
  const [selectedTipoMembresiaId, setSelectedTipoMembresiaId] = useState(formData.tipoMembresia?.idTipoMembresia || '');
  const [selectedPromocionId, setSelectedPromocionId] = useState(formData.promocion?.idPromocion || '');

  // Establecer fecha de pago, método de pago y estado al montar el componente
  useEffect(() => {
    const fechaHoy = new Date().toISOString().split('T')[0];
    setFormData(prev => ({
      ...prev,
      fechaPago: prev.fechaPago || fechaHoy,
      metodoPago: prev.metodoPago || 'Efectivo',
      estado: prev.estado || 'Pagado'
    }));
  }, []); // Solo se ejecuta al montar

  // Cuando cambia el tipo de membresía, calcular el precio
  useEffect(() => {
    if (selectedTipoMembresiaId) {
      const tipoMembresia = tiposMembresia.find(t => t.idTipoMembresia === parseInt(selectedTipoMembresiaId));
      if (tipoMembresia) {
        let precioBase = parseFloat(tipoMembresia.precio || 0);
        
        // Aplicar descuento de promoción si está seleccionada y vigente
        if (selectedPromocionId) {
          const promocion = promociones.find(p => p.idPromocion === parseInt(selectedPromocionId));
          if (promocion && esPromocionVigente(promocion)) {
            const descuento = parseFloat(promocion.descuentoPorcentaje || 0);
            precioBase = precioBase * (1 - descuento / 100);
          }
        }
        
        setFormData(prev => ({
          ...prev,
          tipoMembresia: {idTipoMembresia: parseInt(selectedTipoMembresiaId)},
          monto: precioBase
        }));
      }
    }
  }, [selectedTipoMembresiaId, selectedPromocionId]);

  const esPromocionVigente = (promocion) => {
    if (!promocion.activa) return false;
    const hoy = new Date();
    const fechaInicio = new Date(promocion.fechaInicio);
    const fechaFin = new Date(promocion.fechaFin);
    return hoy >= fechaInicio && hoy <= fechaFin;
  };

  const handleAlumnoChange = (e) => {
    const alumnoId = parseInt(e.target.value);
    setSelectedAlumnoId(alumnoId);
    setFormData({
      ...formData,
      alumno: {idAlumno: alumnoId}
    });
  };

  const handleTipoMembresiaChange = (e) => {
    const tipoId = parseInt(e.target.value);
    setSelectedTipoMembresiaId(tipoId);
    const tipoMembresia = tiposMembresia.find(t => t.idTipoMembresia === tipoId);
    
    if (tipoMembresia) {
      let precioBase = parseFloat(tipoMembresia.precio || 0);
      
      // Aplicar descuento si hay promoción seleccionada
      if (selectedPromocionId) {
        const promocion = promociones.find(p => p.idPromocion === parseInt(selectedPromocionId));
        if (promocion && esPromocionVigente(promocion)) {
          const descuento = parseFloat(promocion.descuentoPorcentaje || 0);
          precioBase = precioBase * (1 - descuento / 100);
        }
      }
      
      setFormData({
        ...formData,
        tipoMembresia: {idTipoMembresia: tipoId},
        monto: precioBase
      });
    }
  };

  const handlePromocionChange = (e) => {
    const promocionId = parseInt(e.target.value);
    setSelectedPromocionId(promocionId);
    
    if (promocionId && selectedTipoMembresiaId) {
      const tipoMembresia = tiposMembresia.find(t => t.idTipoMembresia === parseInt(selectedTipoMembresiaId));
      const promocion = promociones.find(p => p.idPromocion === promocionId);
      
      if (tipoMembresia && promocion) {
        if (!esPromocionVigente(promocion)) {
          alert('Esta promoción no está vigente. Seleccione otra o continúe sin promoción.');
          setSelectedPromocionId('');
          setFormData({
            ...formData,
            promocion: null,
            monto: parseFloat(tipoMembresia.precio || 0)
          });
          return;
        }
        
        const precioBase = parseFloat(tipoMembresia.precio || 0);
        const descuento = parseFloat(promocion.descuentoPorcentaje || 0);
        const precioConDescuento = precioBase * (1 - descuento / 100);
        
        setFormData({
          ...formData,
          promocion: {idPromocion: promocionId},
          monto: precioConDescuento
        });
      }
    } else if (!promocionId && selectedTipoMembresiaId) {
      // Si se quita la promoción, volver al precio base
      const tipoMembresia = tiposMembresia.find(t => t.idTipoMembresia === parseInt(selectedTipoMembresiaId));
      setFormData({
        ...formData,
        promocion: null,
        monto: parseFloat(tipoMembresia?.precio || 0)
      });
    } else {
      setFormData({
        ...formData,
        promocion: promocionId ? {idPromocion: promocionId} : null
      });
    }
  };

  // Filtrar promociones vigentes
  const promocionesVigentes = promociones.filter(p => esPromocionVigente(p));

  return (
    <>
      <div className="form-group">
        <label>Usuario (Alumno) *</label>
        <select value={selectedAlumnoId} 
          onChange={handleAlumnoChange} required>
          <option value="">Seleccionar usuario</option>
          {alumnos.map(a => (
            <option key={a.idAlumno} value={a.idAlumno}>
              {a.nameAlumno} {a.apellidosAlumno} {a.usuario?.email ? `(${a.usuario.email})` : ''}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Tipo de Membresía *</label>
        <select value={selectedTipoMembresiaId} 
          onChange={handleTipoMembresiaChange} required>
          <option value="">Seleccionar tipo de membresía</option>
          {tiposMembresia.filter(t => t.activa).map(t => (
            <option key={t.idTipoMembresia} value={t.idTipoMembresia}>
              {t.nombre} - S/ {parseFloat(t.precio || 0).toFixed(2)} ({t.duracionMeses || t.duracionDias || 'N/A'} {t.duracionMeses ? 'meses' : 'días'})
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Promoción (Opcional)</label>
        <select value={selectedPromocionId} 
          onChange={handlePromocionChange}>
          <option value="">Sin promoción</option>
          {promocionesVigentes.map(p => (
            <option key={p.idPromocion} value={p.idPromocion}>
              {p.nombre} - {p.descuentoPorcentaje}% descuento
              {p.fechaFin && ` (Válida hasta ${new Date(p.fechaFin).toLocaleDateString()})`}
            </option>
          ))}
        </select>
        {promocionesVigentes.length === 0 && (
          <small style={{color: '#666', display: 'block', marginTop: '5px'}}>
            No hay promociones vigentes en este momento
          </small>
        )}
      </div>
      <div className="form-group">
        <label>Monto *</label>
        <input type="number" step="0.01" min="0" value={formData.monto || ''} 
          onChange={(e) => setFormData({...formData, monto: parseFloat(e.target.value)})} required 
          readOnly={selectedTipoMembresiaId && selectedPromocionId} />
        {selectedTipoMembresiaId && selectedPromocionId && (
          <small style={{color: '#666', display: 'block', marginTop: '5px'}}>
            Monto calculado automáticamente con descuento aplicado
          </small>
        )}
      </div>
      <div className="form-group">
        <label>Fecha de Pago *</label>
        <input type="date" value={formData.fechaPago || new Date().toISOString().split('T')[0]} 
          onChange={(e) => setFormData({...formData, fechaPago: e.target.value})} required 
          readOnly />
        <small style={{color: '#666', display: 'block', marginTop: '5px'}}>
          Fecha establecida automáticamente al día de hoy
        </small>
      </div>
      <div className="form-group">
        <label>Método de Pago *</label>
        <select value={formData.metodoPago || 'Efectivo'} 
          onChange={(e) => setFormData({...formData, metodoPago: e.target.value})} required>
          <option value="Efectivo">Efectivo</option>
        </select>
      </div>
    </>
  );
};

export default PagoModal;
