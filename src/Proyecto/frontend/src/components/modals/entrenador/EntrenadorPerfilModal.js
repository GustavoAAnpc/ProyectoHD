import React from 'react';

const EntrenadorPerfilModal = ({ formData, setFormData, onSubmit, onClose }) => {
    return (
        <>
            <div className="form-group">
                <label>Nombre *</label>
                <input
                    type="text"
                    value={formData.namaInstructor || ''}
                    pattern="^[A-Za-zÀ-ÿ\s]+$"
                    title="Solo letras y espacios"
                    onChange={(e) => setFormData({ ...formData, namaInstructor: e.target.value })}
                    required
                />
            </div>
            <div className="form-group">
                <label>Apellidos *</label>
                <input
                    type="text"
                    value={formData.apellidosInstructor || ''}
                    pattern="^[A-Za-zÀ-ÿ\s]+$"
                    title="Solo letras y espacios"
                    onChange={(e) => setFormData({ ...formData, apellidosInstructor: e.target.value })}
                    required
                />
            </div>
            <div className="form-group">
                <label>DNI *</label>
                <input
                    type="text"
                    value={formData.dni || ''}
                    maxLength={8}
                    pattern="^\d{8}$"
                    title="Debe tener 8 dígitos numéricos"
                    onChange={(e) => {
                        const val = e.target.value;
                        if (/^\d*$/.test(val)) setFormData({ ...formData, dni: val });
                    }}
                    required
                />
            </div>
            <div className="form-group">
                <label>Teléfono</label>
                <input
                    type="tel"
                    value={formData.telefono || ''}
                    maxLength={9}
                    pattern="^9\d{8}$"
                    title="Debe iniciar con 9 y tener 9 dígitos"
                    onChange={(e) => {
                        const val = e.target.value;
                        if (/^\d*$/.test(val)) setFormData({ ...formData, telefono: val });
                    }}
                    placeholder="Ej: 999999999"
                />
            </div>
            <div className="form-group">
                <label>Especialidad</label>
                <input
                    type="text"
                    value={formData.especialidad || ''}
                    pattern="^[A-Za-zÀ-ÿ\s]+$"
                    title="Solo letras y espacios"
                    onChange={(e) => setFormData({ ...formData, especialidad: e.target.value })}
                    placeholder="Ej: Entrenamiento funcional, Yoga, etc."
                />
            </div>
        </>
    );
};

export default EntrenadorPerfilModal;
