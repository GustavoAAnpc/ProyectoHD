import React from 'react';

const AdminPerfilModal = ({ formData, setFormData, onSubmit, onClose }) => {
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
                    value={formData.nameAdmin || ''}
                    onInput={(e) =>
                        setFormData({
                            ...formData,
                            nameAdmin: soloLetras(e.target.value)
                        })
                    }
                    required
                />
            </div>

            <div className="form-group">
                <label>Apellidos *</label>
                <input
                    type="text"
                    value={formData.apellidosAdmin || ''}
                    onInput={(e) =>
                        setFormData({
                            ...formData,
                            apellidosAdmin: soloLetras(e.target.value)
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
                            dni: soloNumeros(e.target.value).slice(0, 8)
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
                <label>Dirección</label>
                <input
                    type="text"
                    value={formData.direccion || ''}
                    onChange={(e) =>
                        setFormData({ ...formData, direccion: e.target.value })
                    }
                    placeholder="Ej: Av. Principal 123"
                />
            </div>

            <div className="form-group">
                <label>Género</label>
                <select
                    value={formData.genero || ''}
                    onChange={(e) =>
                        setFormData({ ...formData, genero: e.target.value })
                    }
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
