import React, { useState } from 'react';
import { usuarioService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const ChangePasswordModal = ({ user, onClose }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!currentPassword) {
            setError('La contraseña actual es requerida');
            return;
        }

        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        try {
            await usuarioService.changePassword(user.idUsuario, currentPassword, password);

            // Update local storage/context with new flag
            const newUserState = { ...user, passwordChanged: true };
            const token = localStorage.getItem('token');
            login(newUserState, token);

            alert('Contraseña actualizada correctamente');
            onClose();
        } catch (err) {
            console.error('Error actualizando contraseña:', err);
            setError(err.response?.data || 'Error al actualizar la contraseña');
        }
    };

    return (
        <div className="modal" style={{ display: 'flex', zIndex: 9999 }}>
            <div className="modal-content" style={{ maxWidth: '400px' }}>
                <div className="modal-header">
                    <h3>Cambiar Contraseña</h3>
                    <button className="close-button" onClick={onClose}>✕</button>
                </div>
                <div className="modal-body">
                    <p style={{ marginBottom: '15px' }}>
                        Por seguridad, debes cambiar tu contraseña antes de continuar.
                    </p>
                    {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Contraseña Actual</label>
                            <input
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                required
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label>Nueva Contraseña</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label>Confirmar Contraseña</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="form-control"
                            />
                        </div>
                        <div className="form-actions" style={{ marginTop: '20px', textAlign: 'right' }}>
                            <button type="submit" className="btn-primary">Actualizar Contraseña</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChangePasswordModal;
