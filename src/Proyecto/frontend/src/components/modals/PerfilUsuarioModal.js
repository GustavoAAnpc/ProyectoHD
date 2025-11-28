import React from 'react';

const PerfilUsuarioModal = ({ formData, setFormData, onSubmit, onClose }) => {
    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>Nombre de Usuario *</label>
                <input
                    type="text"
                    value={formData.nameUsuario || ''}
                    onChange={(e) => setFormData({ ...formData, nameUsuario: e.target.value })}
                    required
                    minLength={3}
                />
            </div>

            <div className="form-group">
                <label>Email *</label>
                <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                />
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '25px' }}>
                <button type="submit" className="btn-primary">Guardar</button>
                <button type="button" className="btn-secondary" onClick={onClose}>Cancelar</button>
            </div>
        </form>
    );
};

export default PerfilUsuarioModal;
