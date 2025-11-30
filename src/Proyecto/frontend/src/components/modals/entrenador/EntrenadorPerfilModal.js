import React from 'react';

const EntrenadorPerfilModal = ({ formData, setFormData, onSubmit, onClose }) => {

    const soloLetras = (v) =>
        v.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ ]/g, '');

    const soloNumeros = (v) =>
        v.replace(/\D/g, '');

    return (
        <>
            <div className="form-group">
                <label>Nombre *</label>
                <input
                    type="text"
                    value={formData.namaInstructor || ''}
                    onInput={(e) =>
                        setFormData({
                            ...formData,
                            namaInstructor: soloLetras(e.target.value)
                        })
                    }
                    required
                />
            </div>

            <div className="form-group">
                <label>Apellidos *</label>
                <input
                    type="text"
                    value={formData.apellidosInstructor || ''}
                    onInput={(e) =>
                        setFormData({
                            ...formData,
                            apellidosInstructor: soloLetras(e.target.value)
                        })
                    }
                    required
                />
            </div>

            <div className="form-group">
                <label>DNI *</label>
                <input
                    type="text"
                    value={formData.dni || ''}
                    maxLength={8}
                    onInput={(e) =>
                        setFormData({
                            ...formData,
                            dni: soloNumeros(e.target.value)
                        })
                    }
                    required
                />
            </div>

            <div className="form-group">
                <label>Teléfono</label>
                <input
                    type="tel"
                    value={formData.telefono || ''}
                    maxLength={9}
                    onInput={(e) => {
                        let val = e.target.value.replace(/\D/g, ''); // solo números

                        // si empieza a escribir y NO es 9, lo forzamos
                        if (val.length === 1 && val !== '9') {
                            val = '9';
                        }

                        // límite
                        val = val.slice(0, 9);

                        setFormData({
                            ...formData,
                            telefono: val
                        });
                    }}
                    placeholder="Ej: 999999999"
                />
            </div>

            <div className="form-group">
                <label>Especialidad</label>
                <input
                    type="text"
                    value={formData.especialidad || ''}
                    onInput={(e) =>
                        setFormData({
                            ...formData,
                            especialidad: soloLetras(e.target.value)
                        })
                    }
                    placeholder="Ej: Entrenamiento funcional, Yoga, etc."
                />
            </div>
        </>
    );
};

export default EntrenadorPerfilModal;
