import React from 'react';

const PerfilModal = ({ alumno, formData, setFormData, onSubmit, onClose }) => {

  const soloLetras = (v) =>
    v.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ ]/g, '');

  const soloNumeros = (v) =>
    v.replace(/\D/g, '');

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label>Nombre</label>
        <input
          type="text"
          value={formData.nameAlumno || ''}
          onInput={(e) =>
            setFormData({
              ...formData,
              nameAlumno: soloLetras(e.target.value)
            })
          }
          required
        />
      </div>

      <div className="form-group">
        <label>Apellidos</label>
        <input
          type="text"
          value={formData.apellidosAlumno || ''}
          onInput={(e) =>
            setFormData({
              ...formData,
              apellidosAlumno: soloLetras(e.target.value)
            })
          }
          required
        />
      </div>

      <div className="form-group">
        <label>DNI</label>
        <input
          type="text"
          maxLength={8}
          value={formData.dni || ''}
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
          type="text"
          maxLength={9}
          value={formData.telefono || ''}
          onInput={(e) => {
            let val = e.target.value.replace(/\D/g, ''); // solo números

            // validar primer dígito = 9
            if (val.length === 1 && val !== '9') {
              val = '9';
            }

            val = val.slice(0, 9);

            setFormData({
              ...formData,
              telefono: val
            });
          }}
          required
        />
      </div>


      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          value={formData.email || ''}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>Dirección</label>
        <input
          type="text"
          value={formData.direccion || ''}
          onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>Género</label>
        <select
          value={formData.genero || ''}
          onChange={(e) => setFormData({ ...formData, genero: e.target.value })}
        >
          <option value="">Seleccionar</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
          <option value="Otro">Otro</option>
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        <div className="form-group">
          <label>Peso Actual (kg)</label>
          <input
            type="number"
            step="0.1"
            value={formData.pesoActual || ''}
            onChange={(e) =>
              setFormData({
                ...formData,
                pesoActual: e.target.value ? parseFloat(e.target.value) : ''
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Altura (cm)</label>
          <input
            type="number"
            step="0.1"
            value={formData.altura || ''}
            onChange={(e) =>
              setFormData({
                ...formData,
                altura: e.target.value ? parseFloat(e.target.value) : ''
              })
            }
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginTop: '25px' }}>
        <button type="submit" className="btn-primary">Guardar</button>
        <button type="button" className="btn-secondary" onClick={onClose}>Cancelar</button>
      </div>
    </form>
  );
};

export default PerfilModal;
