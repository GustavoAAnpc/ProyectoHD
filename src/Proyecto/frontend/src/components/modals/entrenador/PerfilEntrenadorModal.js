import React, { useState, useEffect } from 'react';

const PerfilEntrenadorModal = ({ instructor, onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
        namaInstructor: '',
        apellidosInstructor: '',
        dni: '',
        telefono: '',
        especialidad: '',
        email: ''
    });

    useEffect(() => {
        if (instructor) {
            setFormData({
                namaInstructor: instructor.namaInstructor || '',
                apellidosInstructor: instructor.apellidosInstructor || '',
                dni: instructor.dni || '',
                telefono: instructor.telefono || '',
                especialidad: instructor.especialidad || '',
                email: instructor.usuario?.email || ''
            });
        }
    }, [instructor]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedInstructor = {
            ...instructor,
            namaInstructor: formData.namaInstructor,
            apellidosInstructor: formData.apellidosInstructor,
            dni: formData.dni,
            telefono: formData.telefono,
            especialidad: formData.especialidad,
            usuario: {
                ...instructor.usuario,
                email: formData.email
            }
        };
        onSubmit(updatedInstructor);
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
                            name="namaInstructor"
                            value={formData.namaInstructor}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Apellidos</label>
                        <input
                            type="text"
                            name="apellidosInstructor"
                            value={formData.apellidosInstructor}
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
                        <label>Teléfono</label>
                        <input
                            type="text"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Especialidad</label>
                        <input
                            type="text"
                            name="especialidad"
                            value={formData.especialidad}
                            onChange={handleChange}
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

export default PerfilEntrenadorModal;
