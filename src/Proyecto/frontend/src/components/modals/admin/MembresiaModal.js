import React from 'react';

const MembresiaModal = ({ formData, setFormData, alumnos, tiposMembresia }) => {
  return (
    <>
      <div className="form-group">
        <label>Cliente</label>
        <select value={formData.alumno?.idAlumno || ''} 
          onChange={(e) => setFormData({...formData, alumno: {idAlumno: parseInt(e.target.value)}})} required>
          <option value="">Seleccionar cliente</option>
          {alumnos.map(a => (
            <option key={a.idAlumno} value={a.idAlumno}>
              {a.nameAlumno} {a.apellidosAlumno}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Tipo de Membresía</label>
        <select value={formData.tipoMembresia?.idTipoMembresia || ''} 
          onChange={(e) => setFormData({...formData, tipoMembresia: {idTipoMembresia: parseInt(e.target.value)}})} required>
          <option value="">Seleccionar tipo</option>
          {tiposMembresia.filter(t => t.activa).map(t => (
            <option key={t.idTipoMembresia} value={t.idTipoMembresia}>
              {t.nombre} - S/ {parseFloat(t.precio).toFixed(2)}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Fecha Inicio</label>
        <input type="date" value={formData.fechaInicio || ''} 
          onChange={(e) => setFormData({...formData, fechaInicio: e.target.value})} required />
      </div>
      <div className="form-group">
        <label>Fecha Fin</label>
        <input type="date" value={formData.fechaFin || ''} 
          onChange={(e) => setFormData({...formData, fechaFin: e.target.value})} required />
      </div>
      <div className="form-group">
        <label>Estado</label>
        <select value={formData.estado || 'Activa'} 
          onChange={(e) => setFormData({...formData, estado: e.target.value})}>
          <option value="Activa">Activa</option>
          <option value="Vencida">Vencida</option>
          <option value="Suspendida">Suspendida</option>
        </select>
      </div>
    </>
  );
};

export default MembresiaModal;

