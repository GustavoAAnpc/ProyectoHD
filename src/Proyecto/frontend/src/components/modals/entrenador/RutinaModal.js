import React from 'react';

const RutinaModal = ({ formData, setFormData, clientesAsignados }) => {
  return (
    <>
      <div className="form-group">
        <label>Cliente</label>
        <select value={formData.alumno?.idAlumno || ''}
          onChange={(e) => setFormData({ ...formData, alumno: { idAlumno: parseInt(e.target.value) } })} required>
          <option value="">Seleccionar cliente</option>
          {clientesAsignados.map(c => (
            <option key={c.alumno.idAlumno} value={c.alumno.idAlumno}>
              {c.alumno.nameAlumno} {c.alumno.apellidosAlumno}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Nombre de la Rutina</label>
        <select value={formData.nombreRutina || ''}
          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} required>
          <option value="">Seleccionar rutina</option>
          <option value="Pecho">Pecho</option>
          <option value="Espalda">Espalda</option>
          <option value="Piernas">Piernas</option>
          <option value="Hombros">Hombros</option>
        </select>
      </div>
      <div className="form-group">
        <label>Descripción</label>
        <textarea value={formData.descripcion || ''}
          onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })} rows="3" />
      </div>
      <div className="form-group">
        <label>Objetivo</label>
        <select value={formData.objetivo || ''}
          onChange={(e) => setFormData({ ...formData, objetivo: e.target.value })}>
          <option value="">Seleccionar objetivo</option>
          <option value="Ganar masa">Ganar masa</option>
          <option value="Bajar grasa">Bajar grasa</option>
          <option value="Mantenimiento">Mantenimiento</option>
          <option value="Mejora cardiovascular">Mejora cardiovascular</option>
          <option value="Fuerza">Fuerza</option>
        </select>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        <div className="form-group">
          <label>Fecha Inicio</label>
          <input type="date" value={formData.fechaInicio || ''}
            onChange={(e) => setFormData({ ...formData, fechaInicio: e.target.value })} required />
        </div>
        <div className="form-group">
          <label>Fecha Fin</label>
          <input type="date" value={formData.fechaFin || ''}
            onChange={(e) => setFormData({ ...formData, fechaFin: e.target.value })} />
        </div>
      </div>
      <div className="form-group">
        <label>
          <input type="checkbox" checked={formData.activa !== false}
            onChange={(e) => setFormData({ ...formData, activa: e.target.checked })} />
          Activa
        </label>
      </div>
      <p style={{ marginTop: '20px', color: '#666', fontSize: '14px' }}>
        Nota: Los ejercicios de la rutina se pueden agregar después de crear la rutina.
      </p>
    </>
  );
};

export default RutinaModal;

