import React from 'react';

const SedeModal = ({ formData, setFormData }) => {
  return (
    <>
      <div className="form-group">
        <label>Nombre</label>
        <input type="text" value={formData.nombre || ''}
          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} required />
      </div>
      <div className="form-group">
        <label>Dirección</label>
        <input type="text" value={formData.direccion || ''}
          onChange={(e) => setFormData({ ...formData, direccion: e.target.value })} />
      </div>
      <div className="form-group">
        <label>Teléfono</label>
        <input
          type="text"
          value={formData.telefono || ''}
          maxLength={9}
          pattern="9[0-9]{8}"
          onChange={(e) => {
            const v = e.target.value;
            if (/^9\d{0,8}$/.test(v) || v === "") {
              setFormData({ ...formData, telefono: v });
            }
          }}
        />
      </div>
      <div className="form-group">
        <label>Horario Apertura</label>
        <input type="time" value={formData.horarioApertura || ''}
          onChange={(e) => {
            const time = e.target.value;
            if (time) {
              setFormData({ ...formData, horarioApertura: time });
            }
          }}
          required />
      </div>
      <div className="form-group">
        <label>Horario Cierre</label>
        <input type="time" value={formData.horarioCierre || ''}
          onChange={(e) => {
            const time = e.target.value;
            if (time) {
              setFormData({ ...formData, horarioCierre: time });
            }
          }}
          required />
      </div>
      <div className="form-group">
        <label>
          <input type="checkbox" checked={formData.activa !== false}
            onChange={(e) => setFormData({ ...formData, activa: e.target.checked })} />
          Activa
        </label>
      </div>
    </>
  );
};

export default SedeModal;

