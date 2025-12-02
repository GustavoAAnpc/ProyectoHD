import React from 'react';

const ClaseModal = ({ formData, setFormData, instructores, sedes }) => {
  return (
    <>
      <div className="form-group">
        <label>Nombre de la Clase *</label>
        <input type="text" value={formData.nameClase || ''}
          onChange={(e) => setFormData({ ...formData, nameClase: e.target.value })} required />
      </div>
      <div className="form-group">
        <label>Descripción</label>
        <textarea value={formData.descripcion || ''}
          onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })} rows="3" />
      </div>
      <div className="form-group">
        <label>Instructor *</label>
        <select value={formData.instructor?.idInstructor || ''}
          onChange={(e) => setFormData({ ...formData, instructor: { idInstructor: parseInt(e.target.value) } })} required>
          <option value="">Seleccionar instructor</option>
          {instructores.map(i => (
            <option key={i.idInstructor} value={i.idInstructor}>
              {i.namaInstructor} {i.apellidosInstructor}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Sede *</label>
        <select value={formData.sede?.idSede || ''}
          onChange={(e) => setFormData({ ...formData, sede: { idSede: parseInt(e.target.value) } })} required>
          <option value="">Seleccionar sede</option>
          {sedes.map(s => (
            <option key={s.idSede} value={s.idSede}>
              {s.nombre}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Día de la Semana *</label>
        <select value={formData.diaSemana || ''}
          onChange={(e) => setFormData({ ...formData, diaSemana: e.target.value })} required>
          <option value="">Seleccionar día</option>
          <option value="Lunes">Lunes</option>
          <option value="Martes">Martes</option>
          <option value="Miércoles">Miércoles</option>
          <option value="Jueves">Jueves</option>
          <option value="Viernes">Viernes</option>
          <option value="Sábado">Sábado</option>
          <option value="Domingo">Domingo</option>
        </select>
      </div>
      <div className="form-group">
        <label>Hora Inicio *</label>
        <input type="time" value={formData.horaInicio || ''}
          onChange={(e) => setFormData({ ...formData, horaInicio: e.target.value })} required />
      </div>
      <div className="form-group">
        <label>Hora Fin *</label>
        <input type="time" value={formData.horaFin || ''}
          onChange={(e) => setFormData({ ...formData, horaFin: e.target.value })} required />
      </div>
    </>
  );
};

export default ClaseModal;
