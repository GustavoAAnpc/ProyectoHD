import React from 'react';

const SeguimientoModal = ({ formData, setFormData, clientesAsignados, editingItem }) => {
  return (
    <>
      <div className="form-group">
        <label>Cliente</label>
        <select value={formData.alumno?.idAlumno || ''} 
          onChange={(e) => setFormData({...formData, alumno: {idAlumno: parseInt(e.target.value)}})} required>
          <option value="">Seleccionar cliente</option>
          {clientesAsignados.map(c => (
            <option key={c.alumno.idAlumno} value={c.alumno.idAlumno}>
              {c.alumno.nameAlumno} {c.alumno.apellidosAlumno}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Fecha de Registro</label>
        <input type="date" value={formData.fechaRegistro || ''} 
          onChange={(e) => setFormData({...formData, fechaRegistro: e.target.value})} required />
      </div>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
        <div className="form-group">
          <label>Peso (kg)</label>
          <input type="number" step="0.1" value={formData.peso || ''} 
            onChange={(e) => setFormData({...formData, peso: parseFloat(e.target.value)})} />
        </div>
        <div className="form-group">
          <label>Altura (cm)</label>
          <input type="number" step="0.1" value={formData.altura || ''} 
            onChange={(e) => setFormData({...formData, altura: parseFloat(e.target.value)})} />
        </div>
        <div className="form-group">
          <label>Grasa Corporal (%)</label>
          <input type="number" step="0.1" value={formData.grasaCorporal || ''} 
            onChange={(e) => setFormData({...formData, grasaCorporal: parseFloat(e.target.value)})} />
        </div>
        <div className="form-group">
          <label>Músculo (kg)</label>
          <input type="number" step="0.1" value={formData.musculo || ''} 
            onChange={(e) => setFormData({...formData, musculo: parseFloat(e.target.value)})} />
        </div>
        <div className="form-group">
          <label>Pecho (cm)</label>
          <input type="number" step="0.1" value={formData.medidaPecho || ''} 
            onChange={(e) => setFormData({...formData, medidaPecho: parseFloat(e.target.value)})} />
        </div>
        <div className="form-group">
          <label>Cintura (cm)</label>
          <input type="number" step="0.1" value={formData.medidaCintura || ''} 
            onChange={(e) => setFormData({...formData, medidaCintura: parseFloat(e.target.value)})} />
        </div>
        <div className="form-group">
          <label>Cadera (cm)</label>
          <input type="number" step="0.1" value={formData.medidaCadera || ''} 
            onChange={(e) => setFormData({...formData, medidaCadera: parseFloat(e.target.value)})} />
        </div>
        <div className="form-group">
          <label>Brazo (cm)</label>
          <input type="number" step="0.1" value={formData.medidaBrazo || ''} 
            onChange={(e) => setFormData({...formData, medidaBrazo: parseFloat(e.target.value)})} />
        </div>
        <div className="form-group">
          <label>Pierna (cm)</label>
          <input type="number" step="0.1" value={formData.medidaPierna || ''} 
            onChange={(e) => setFormData({...formData, medidaPierna: parseFloat(e.target.value)})} />
        </div>
      </div>
      <div className="form-group">
        <label>Rendimiento</label>
        <textarea value={formData.rendimiento || ''} 
          onChange={(e) => setFormData({...formData, rendimiento: e.target.value})} rows="3" />
      </div>
      <div className="form-group">
        <label>Notas/Comentarios</label>
        <textarea value={formData.notas || ''} 
          onChange={(e) => setFormData({...formData, notas: e.target.value})} rows="4" />
      </div>
    </>
  );
};

export default SeguimientoModal;

