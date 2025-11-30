import React, { useState } from 'react';
import { usuarioService } from '../services/api';
import { useAuth } from '../context/AuthContext';

const ChangePasswordModal = ({ user, onClose }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        try {
            // Update user with new password. 
            // The backend controller will set passwordChanged = true automatically when password is updated.
            const updatedUser = {
                ...user,
                passwordUsuario: password
            };

            await usuarioService.update(user.idUsuario, updatedUser);

            // Update local storage/context with new flag
            const newUserState = { ...user, passwordChanged: true };
            const token = localStorage.getItem('token');
            login(newUserState, token);

            alert('Contraseña actualizada correctamente');
            onClose();
        } catch (err) {
            console.error('Error actualizando contraseña:', err);
            setError('Error al actualizar la contraseña');
        }
    };

    return (
        <div className="modal" style={{ display: 'flex', zIndex: 9999 }}>
            <div className="modal-content" style={{ maxWidth: '400px' }}>
                <div className="modal-header">
                    <h3>Cambiar Contraseña</h3>
                </div>
                <div className="modal-body">
                    <p style={{ marginBottom: '15px' }}>
                        Por seguridad, debes cambiar tu contraseña antes de continuar.
                    </p>
                    {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
                    <form onSubmit={handleSubmit}>
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
