import React from 'react';

const PerfilInstructorModal = ({ formData, setFormData, onSubmit, onClose }) => {
    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>Nombre *</label>
                <input
                    type="text"
                    value={formData.namaInstructor || ''}
                    onChange={(e) => setFormData({ ...formData, namaInstructor: e.target.value })}
                    required
                />
            </div>

            <div className="form-group">
                <label>Apellidos *</label>
                <input
                    type="text"
                    value={formData.apellidosInstructor || ''}
                    onChange={(e) => setFormData({ ...formData, apellidosInstructor: e.target.value })}
                    required
                />
            </div>

            <div className="form-group">
                <label>DNI *</label>
                <input
                    type="text"
                    value={formData.dni || ''}
                    onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
                    required
                    maxLength={8}
                />
            </div>

            <div className="form-group">
                <label>Teléfono</label>
                <input
                    type="tel"
                    value={formData.telefono || ''}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                />
            </div>

            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
            </div>

            <div className="form-group">
                <label>Especialidad</label>
                <input
                    type="text"
                    value={formData.especialidad || ''}
                    onChange={(e) => setFormData({ ...formData, especialidad: e.target.value })}
                />
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '25px' }}>
                <button type="submit" className="btn-primary">Guardar</button>
                <button type="button" className="btn-secondary" onClick={onClose}>Cancelar</button>
            </div>
        </form>
    );
};

export default PerfilInstructorModal;
