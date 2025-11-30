import React from 'react';

const EntrenadorPerfilModal = ({ formData, setFormData, onSubmit, onClose }) => {
    return (
        <>
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
                />
            </div>
            <div className="form-group">
                <label>Teléfono</label>
                <input
                    type="tel"
                    value={formData.telefono || ''}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    placeholder="Ej: 999999999"
                />
            </div>
            <div className="form-group">
                <label>Especialidad</label>
                <input
                    type="text"
                    value={formData.especialidad || ''}
                    onChange={(e) => setFormData({ ...formData, especialidad: e.target.value })}
                    placeholder="Ej: Entrenamiento funcional, Yoga, etc."
                />
            </div>
        </>
    );
};

export default EntrenadorPerfilModal;
