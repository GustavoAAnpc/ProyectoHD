import React from 'react';

const AdminPerfilModal = ({ formData, setFormData, onSubmit, onClose }) => {
    return (
        <>
            <div className="form-group">
                <label>Nombre *</label>
                <input
                    type="text"
                    value={formData.nameAdmin || ''}
                    onChange={(e) => setFormData({ ...formData, nameAdmin: e.target.value })}
                    required
                />
            </div>
            <div className="form-group">
                <label>Apellidos *</label>
                <input
                    type="text"
                    value={formData.apellidosAdmin || ''}
                    onChange={(e) => setFormData({ ...formData, apellidosAdmin: e.target.value })}
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
