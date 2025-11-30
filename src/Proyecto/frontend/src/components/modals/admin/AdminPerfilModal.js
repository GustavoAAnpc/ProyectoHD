import React from 'react';

const AdminPerfilModal = ({ formData, setFormData, onSubmit, onClose }) => {
    return (
        <>
            <div className="form-group">
                <label>Nombre *</label>
                <input
                    type="text"
                    value={formData.nameAdmin || ''}
                    pattern="^[A-Za-zÀ-ÿ\s]+$"
                    title="Solo letras y espacios"
                    onChange={(e) => setFormData({ ...formData, nameAdmin: e.target.value })}
                    required
                />
            </div>
            <div className="form-group">
                <label>Apellidos *</label>
                <input
                    type="text"
                    value={formData.apellidosAdmin || ''}
                    pattern="^[A-Za-zÀ-ÿ\s]+$"
                    title="Solo letras y espacios"
                    onChange={(e) => setFormData({ ...formData, apellidosAdmin: e.target.value })}
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
                <label>Dirección</label>
                <input
                    type="text"
                    value={formData.direccion || ''}
                    onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                    placeholder="Ej: Av. Principal 123"
                />
            </div>
            <div className="form-group">
                <label>Género</label>
                <select
                    value={formData.genero || ''}
                    onChange={(e) => setFormData({ ...formData, genero: e.target.value })}
                >
                    <option value="">Seleccionar...</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otro">Otro</option>
                </select>
            </div>
        </>
    );
};

export default AdminPerfilModal;
