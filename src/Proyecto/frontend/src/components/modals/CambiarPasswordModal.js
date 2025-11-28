import React, { useState } from 'react';

const CambiarPasswordModal = ({ onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
        passwordActual: '',
        nuevaPassword: '',
        confirmarPassword: ''
    });
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!formData.passwordActual) {
            setError('La contraseña actual es requerida');
            return;
        }

        if (!formData.nuevaPassword) {
            setError('La nueva contraseña es requerida');
            return;
        }

        if (formData.nuevaPassword.length < 6) {
            setError('La nueva contraseña debe tener al menos 6 caracteres');
            return;
        }

        if (formData.nuevaPassword !== formData.confirmarPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }


        onSubmit(formData);
    };

    const handleSubmitPassword = async (passwordData) => {
        try {
            await usuarioService.cambiarPassword(user.idUsuario, passwordData.passwordActual, passwordData.nuevaPassword);
            alert('Contraseña actualizada exitosamente');
            setShowModal(false);
        } catch (error) {
            console.error('Error cambiando contraseña:', error);
            const errorMessage = error.response?.data || 'Error al cambiar la contraseña';
            alert(errorMessage);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && (
                <div style={{
                    backgroundColor: '#fee',
                    color: '#c33',
                    padding: '10px',
                    borderRadius: '5px',
                    marginBottom: '15px'
                }}>
                    {error}
                </div>
            )}

            <div className="form-group">
                <label>Contraseña Actual *</label>
                <input
                    type="password"
                    value={formData.passwordActual}
                    onChange={(e) => setFormData({ ...formData, passwordActual: e.target.value })}
                    required
                    autoComplete="current-password"
                />
            </div>

            <div className="form-group">
                <label>Nueva Contraseña *</label>
                <input
                    type="password"
                    value={formData.nuevaPassword}
                    onChange={(e) => setFormData({ ...formData, nuevaPassword: e.target.value })}
                    required
                    minLength={6}
                    autoComplete="new-password"
                />
                <small style={{ color: '#666', fontSize: '12px' }}>
                    Mínimo 6 caracteres
                </small>
            </div>

            <div className="form-group">
                <label>Confirmar Nueva Contraseña *</label>
                <input
                    type="password"
                    value={formData.confirmarPassword}
                    onChange={(e) => setFormData({ ...formData, confirmarPassword: e.target.value })}
                    required
                    autoComplete="new-password"
                />
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '25px' }}>
                <button type="submit" className="btn-primary">Cambiar Contraseña</button>
                <button type="button" className="btn-secondary" onClick={onClose}>Cancelar</button>
            </div>
        </form>
    );
};

export default CambiarPasswordModal;
