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

  // Cuando cambia la promoción, calcular el precio basado en membresía mensual
  useEffect(() => {
    if (selectedPromocionId) {
      const promocion = promociones.find(p => p.idPromocion === parseInt(selectedPromocionId));
      if (promocion && esPromocionVigente(promocion)) {
        // Buscar membresía mensual (duracionMeses = 1)
        const membresiaMensual = tiposMembresia.find(t => t.activa && t.duracionMeses === 1);

        if (membresiaMensual) {
          const precioMensual = parseFloat(membresiaMensual.precio || 0);
          const mesesPromocion = parseInt(promocion.duracionMeses || 1);
          const precioBase = precioMensual * mesesPromocion;
          const descuento = parseFloat(promocion.descuentoPorcentaje || 0);
          const precioFinal = precioBase * (1 - descuento / 100);

          setFormData(prev => ({
            ...prev,
            monto: precioFinal
          }));
        }
      }
    } else if (selectedTipoMembresiaId && !selectedPromocionId) {
      // Sin promoción: usar precio normal del tipo de membresía seleccionado
      const tipoMembresia = tiposMembresia.find(t => t.idTipoMembresia === parseInt(selectedTipoMembresiaId));
      if (tipoMembresia) {
        setFormData(prev => ({
          ...prev,
          monto: parseFloat(tipoMembresia.precio || 0)
        }));
      }
    }
  }, [selectedPromocionId, selectedTipoMembresiaId, tiposMembresia, promociones]);

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
      alumno: { idAlumno: alumnoId }
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
        tipoMembresia: { idTipoMembresia: tipoId },
        monto: precioBase
      });
    }
  };

  const handlePromocionChange = (e) => {
    const promocionId = parseInt(e.target.value);
    setSelectedPromocionId(promocionId);

    if (promocionId) {
      const promocion = promociones.find(p => p.idPromocion === promocionId);

      if (promocion) {
        if (!esPromocionVigente(promocion)) {
          alert('Esta promoción no está vigente. Seleccione otra o continúe sin promoción.');
          setSelectedPromocionId('');
          setFormData({
            ...formData,
            promocion: null
          });
          return;
        }

        // Buscar membresía mensual
        const membresiaMensual = tiposMembresia.find(t => t.activa && t.duracionMeses === 1);

        if (!membresiaMensual) {
          alert('No existe una membresía mensual activa. Se requiere para aplicar promociones.');
          setSelectedPromocionId('');
          setFormData({
            ...formData,
            promocion: null
          });
          return;
        }

        // Calcular precio con promoción
        const precioMensual = parseFloat(membresiaMensual.precio || 0);
        const mesesPromocion = parseInt(promocion.duracionMeses || 1);
        const precioBase = precioMensual * mesesPromocion;
        const descuento = parseFloat(promocion.descuentoPorcentaje || 0);
        const precioFinal = precioBase * (1 - descuento / 100);

        setFormData({
          ...formData,
          promocion: { idPromocion: promocionId },
          monto: precioFinal
        });
      }
    } else {
      // Sin promoción
      setFormData({
        ...formData,
        promocion: null
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
          onChange={handleTipoMembresiaChange} required disabled={selectedPromocionId}>
          <option value="">Seleccionar tipo de membresía</option>
          {tiposMembresia.filter(t => t.activa).map(t => (
            <option key={t.idTipoMembresia} value={t.idTipoMembresia}>
              {t.nombre} - S/ {parseFloat(t.precio || 0).toFixed(2)} ({t.duracionMeses || t.duracionDias || 'N/A'} {t.duracionMeses ? 'meses' : 'días'})
            </option>
          ))}
        </select>
        {selectedPromocionId && (
          <small style={{ color: '#666', display: 'block', marginTop: '5px' }}>
            Al seleccionar una promoción, se usará automáticamente la membresía mensual
          </small>
        )}
      </div>
      <div className="form-group">
        <label>Promoción (Opcional)</label>
        <select value={selectedPromocionId}
          onChange={handlePromocionChange}>
          <option value="">Sin promoción</option>
          {promocionesVigentes.map(p => (
            <option key={p.idPromocion} value={p.idPromocion}>
              {p.nombre} - {p.duracionMeses || 1} {(p.duracionMeses || 1) === 1 ? 'mes' : 'meses'} - {p.descuentoPorcentaje}% descuento
              {p.fechaFin && ` (Válida hasta ${new Date(p.fechaFin).toLocaleDateString()})`}
            </option>
          ))}
        </select>
        {selectedPromocionId && (() => {
          const promocion = promociones.find(p => p.idPromocion === parseInt(selectedPromocionId));
          const membresiaMensual = tiposMembresia.find(t => t.activa && t.duracionMeses === 1);
          if (promocion && membresiaMensual) {
            const precioMensual = parseFloat(membresiaMensual.precio || 0);
            const meses = parseInt(promocion.duracionMeses || 1);
            const precioBase = precioMensual * meses;
            const descuento = parseFloat(promocion.descuentoPorcentaje || 0);
            const precioFinal = precioBase * (1 - descuento / 100);
            return (
              <small style={{ color: '#2563eb', display: 'block', marginTop: '5px', fontWeight: '500' }}>
                📊 Cálculo: S/ {precioMensual.toFixed(2)} × {meses} {meses === 1 ? 'mes' : 'meses'} = S/ {precioBase.toFixed(2)} - {descuento}% = S/ {precioFinal.toFixed(2)}
                <br />
                ⏱️ Duración de membresía: {meses} {meses === 1 ? 'mes' : 'meses'}
              </small>
            );
          }
          return null;
        })()}
        {promocionesVigentes.length === 0 && (
          <small style={{ color: '#666', display: 'block', marginTop: '5px' }}>
            No hay promociones vigentes en este momento
          </small>
        )}
      </div>
      <div className="form-group">
        <label>Monto *</label>
        <input type="number" step="0.01" min="0" value={formData.monto || ''}
          onChange={(e) => setFormData({ ...formData, monto: parseFloat(e.target.value) })} required
          readOnly={selectedPromocionId || selectedTipoMembresiaId} />
        {selectedPromocionId && (
          <small style={{ color: '#2563eb', display: 'block', marginTop: '5px', fontWeight: '500' }}>
            💰 Monto calculado automáticamente con promoción aplicada
          </small>
        )}
        {!selectedPromocionId && selectedTipoMembresiaId && (
          <small style={{ color: '#666', display: 'block', marginTop: '5px' }}>
            Monto según tipo de membresía seleccionado
          </small>
        )}
      </div>
      <div className="form-group">
        <label>Fecha de Pago *</label>
        <input type="date" value={formData.fechaPago || new Date().toISOString().split('T')[0]}
          onChange={(e) => setFormData({ ...formData, fechaPago: e.target.value })} required
          readOnly />
        <small style={{ color: '#666', display: 'block', marginTop: '5px' }}>
          Fecha establecida automáticamente al día de hoy
        </small>
      </div>
      <div className="form-group">
        <label>Método de Pago *</label>
        <select value={formData.metodoPago || 'Efectivo'}
          onChange={(e) => setFormData({ ...formData, metodoPago: e.target.value })} required>
          <option value="Efectivo">Efectivo</option>
        </select>
      </div>
    </>
  );
};

export default PagoModal;
