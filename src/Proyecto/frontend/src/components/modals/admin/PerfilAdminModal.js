import React, { useState, useEffect } from 'react';

const PerfilAdminModal = ({ admin, onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
        nameAdmin: '',
        apellidosAdmin: '',
        dni: '',
        email: ''
    });

    useEffect(() => {
        if (admin) {
            setFormData({
                nameAdmin: admin.nameAdmin || '',
                apellidosAdmin: admin.apellidosAdmin || '',
                dni: admin.dni || '',
                email: admin.usuario?.email || ''
            });
        }
    }, [admin]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Construct the object to send back. 
        // We might need to handle nested usuario update separately or backend handles it.
        // Assuming backend update accepts the admin object structure.
        const updatedAdmin = {
            ...admin,
            nameAdmin: formData.nameAdmin,
            apellidosAdmin: formData.apellidosAdmin,
            dni: formData.dni,
            usuario: {
                ...admin.usuario,
                email: formData.email
            }
        };
        onSubmit(updatedAdmin);
    };

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Editar Mi Perfil</h3>
                    <button className="close-button" onClick={onClose}>✕</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nombres</label>
                        <input
                            type="text"
                            name="nameAdmin"
                            value={formData.nameAdmin}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Apellidos</label>
                        <input
                            type="text"
                            name="apellidosAdmin"
                            value={formData.apellidosAdmin}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>DNI</label>
                        <input
                            type="text"
                            name="dni"
                            value={formData.dni}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="modal-actions">
                        <button type="submit" className="btn-primary">Guardar Cambios</button>
                        <button type="button" className="btn-secondary" onClick={onClose}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PerfilAdminModal;
