import React, { useState, useEffect } from 'react';
import { usuarioService } from '../../../services/api';

const soloTextoRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/;
const UsuarioModal = ({ formData, setFormData, editingItem }) => {
  const [errors, setErrors] = useState({});
  const [confirmPassword, setConfirmPassword] = useState('');
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [checkingEmail, setCheckingEmail] = useState(false);

  useEffect(() => {
    if (editingItem) {
      setConfirmPassword('');
    }
  }, [editingItem]);

  const validateUsername = async (username) => {
    if (!username || username.length < 3) {
      setErrors(prev => ({ ...prev, nameUsuario: 'El nombre de usuario debe tener al menos 3 caracteres' }));
      return false;
    }

    if (editingItem && editingItem.nameUsuario === username) {
      setErrors(prev => ({ ...prev, nameUsuario: null }));
      return true;
    }

    setCheckingUsername(true);
    try {
      const usuarios = await usuarioService.getAll();
      const existe = usuarios.data.some(u => u.nameUsuario === username);
      if (existe) {
        setErrors(prev => ({ ...prev, nameUsuario: 'Este nombre de usuario ya está en uso' }));
        setCheckingUsername(false);
        return false;
      }
      setErrors(prev => ({ ...prev, nameUsuario: null }));
      setCheckingUsername(false);
      return true;
    } catch (error) {
      setErrors(prev => ({ ...prev, nameUsuario: 'Error al verificar el usuario' }));
      setCheckingUsername(false);
      return false;
    }
  };

  const validateEmail = async (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setErrors(prev => ({ ...prev, email: 'Ingrese un email válido' }));
      return false;
    }

    if (editingItem && editingItem.email === email) {
      setErrors(prev => ({ ...prev, email: null }));
      return true;
    }

    setCheckingEmail(true);
    try {
      const usuarios = await usuarioService.getAll();
      const existe = usuarios.data.some(u => u.email === email);
      if (existe) {
        setErrors(prev => ({ ...prev, email: 'Este email ya está registrado' }));
        setCheckingEmail(false);
        return false;
      }
      setErrors(prev => ({ ...prev, email: null }));
      setCheckingEmail(false);
      return true;
    } catch (error) {
      setErrors(prev => ({ ...prev, email: 'Error al verificar el email' }));
      setCheckingEmail(false);
      return false;
    }
  };

  const validatePassword = () => {
    if (editingItem && !formData.passwordUsuario) {
      setErrors(prev => ({ ...prev, passwordUsuario: null, confirmPassword: null }));
      return true;
    }

    if (!formData.passwordUsuario || formData.passwordUsuario.length < 6) {
      setErrors(prev => ({ ...prev, passwordUsuario: 'La contraseña debe tener al menos 6 caracteres' }));
      return false;
    }

    if (formData.passwordUsuario !== confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: 'Las contraseñas no coinciden' }));
      return false;
    }

    setErrors(prev => ({ ...prev, passwordUsuario: null, confirmPassword: null }));
    return true;
  };

  const handleUsernameChange = async (e) => {
    const value = e.target.value;
    setFormData({ ...formData, nameUsuario: value });
    if (value) {
      await validateUsername(value);
    } else {
      setErrors(prev => ({ ...prev, nameUsuario: null }));
    }
  };

  const handleEmailChange = async (e) => {
    const value = e.target.value;
    setFormData({ ...formData, email: value });
    if (value) {
      await validateEmail(value);
    } else {
      setErrors(prev => ({ ...prev, email: null }));
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, passwordUsuario: value });
    if (confirmPassword) {
      validatePassword();
    }
  };

  const generateUniqueUsername = async (baseUsername) => {
    const usuarios = await usuarioService.getAll();
    const existentes = usuarios.data.map(u => u.nameUsuario);

    if (!existentes.includes(baseUsername)) return baseUsername;

    let contador = 1;
    let nuevo = `${baseUsername}_${contador}`;

    while (existentes.includes(nuevo)) {
      contador++;
      nuevo = `${baseUsername}_${contador}`;
    }

    return nuevo;
  };

  const generateUsername = (nombres, apellidos, celular) => {
    if (!nombres || !apellidos || !celular) return '';

    const primeraLetraNombre = nombres.trim().charAt(0).toLowerCase();
    const primerApellido = apellidos.trim().split(' ')[0].toLowerCase();
    const ultimosDosCelular = celular.toString().slice(-2);

    return `${primeraLetraNombre}${primerApellido}${ultimosDosCelular}`;
  };

  const generatePassword = (nombres) => {
    if (!nombres) return '';
    const primerNombre = nombres.trim().split(' ')[0].toLowerCase();
    return `${primerNombre}123`;
  };

  const handleNombresChange = async (e) => {
    const value = e.target.value;

    if (value && !soloTextoRegex.test(value)) {
      setErrors(prev => ({ ...prev, nombres: 'Solo se permiten letras y espacios' }));
      return;
    } else {
      setErrors(prev => ({ ...prev, nombres: null }));
    }

    if (value && formData.apellidos && formData.celular) {
      const base = generateUsername(value, formData.apellidos, formData.celular);
      const username = await generateUniqueUsername(base);
      const password = generatePassword(value);
      setFormData(prev => ({ ...prev, nombres: value, nameUsuario: username, passwordUsuario: password }));
      setConfirmPassword(password);
      validateUsername(username);
    } else {
      setFormData({ ...formData, nombres: value });
    }
  };


  const handleApellidosChange = async (e) => {
    const value = e.target.value;

    if (value && !soloTextoRegex.test(value)) {
      setErrors(prev => ({ ...prev, apellidos: 'Solo se permiten letras y espacios' }));
      return;
    } else {
      setErrors(prev => ({ ...prev, apellidos: null }));
    }

    if (formData.nombres && value && formData.celular) {
      const base = generateUsername(formData.nombres, value, formData.celular);
      const username = await generateUniqueUsername(base);
      const password = generatePassword(formData.nombres);
      setFormData(prev => ({ ...prev, apellidos: value, nameUsuario: username, passwordUsuario: password }));
      setConfirmPassword(password);
      validateUsername(username);
    } else {
      setFormData({ ...formData, apellidos: value });
    }
  };


  const handleCelularChange = async (e) => {
    const value = e.target.value;

    if (!/^9\d{0,8}$/.test(value) && value !== "") {
      return;
    }

    if (formData.nombres && formData.apellidos && value) {
      const base = generateUsername(formData.nombres, formData.apellidos, value);
      const username = await generateUniqueUsername(base);
      const password = generatePassword(formData.nombres);
      setFormData(prev => ({ ...prev, celular: value, nameUsuario: username, passwordUsuario: password }));
      setConfirmPassword(password);
      validateUsername(username);
    } else {
      setFormData({ ...formData, celular: value });
    }
  };


  return (
    <>
      <div className="form-group">
        <label>Nombres *</label>
        <input
          type="text"
          value={formData.nombres || ''}
          onChange={handleNombresChange}
          required
          disabled={!!editingItem}
        />
      </div>
      <div className="form-group">
        <label>Apellidos *</label>
        <input
          type="text"
          value={formData.apellidos || ''}
          onChange={handleApellidosChange}
          required
          disabled={!!editingItem}
        />
      </div>
      <div className="form-group">
        <label>Celular *</label>
        <input
          type="text"
          value={formData.celular || ''}
          maxLength={9}
          onChange={handleCelularChange}
          required
          disabled={!!editingItem}
        />

      </div>
      <div className="form-group">
        <label>Nombre de Usuario (Generado automáticamente)</label>
        <input
          type="text"
          value={formData.nameUsuario || ''}
          onChange={handleUsernameChange}
          required
          disabled={!!editingItem}
          style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed', color: '#111' }}
        />
        {checkingUsername && <small style={{ color: '#666' }}>Verificando...</small>}
        {errors.nameUsuario && <small style={{ color: '#dc2626', display: 'block', marginTop: '5px' }}>{errors.nameUsuario}</small>}
      </div>
      <div className="form-group">
        <label>Email *</label>
        <input
          type="email"
          value={formData.email || ''}
          onChange={handleEmailChange}
          required
        />
        {checkingEmail && <small style={{ color: '#666' }}>Verificando...</small>}
        {errors.email && <small style={{ color: '#dc2626', display: 'block', marginTop: '5px' }}>{errors.email}</small>}
      </div>
      <div className="form-group">
        <label>Contraseña {!editingItem && '(Generada automáticamente) *'}</label>
        <input
          type="text"
          value={formData.passwordUsuario || ''}
          onChange={handlePasswordChange}
          required={!editingItem}
          disabled={!editingItem}
          style={!editingItem ? { backgroundColor: '#f5f5f5', cursor: 'not-allowed', color: '#111' } : {}}
        />
        {errors.passwordUsuario && <small style={{ color: '#dc2626', display: 'block', marginTop: '5px' }}>{errors.passwordUsuario}</small>}
      </div>
      <div className="form-group">
        <label>Rol *</label>
        <select
          value={formData.rol?.idRol || ''}
          onChange={(e) => setFormData({ ...formData, rol: { idRol: parseInt(e.target.value) } })}
          required
          disabled={!!editingItem}
        >
          <option value="">Seleccionar rol</option>
          <option value="1">Administrador</option>
          <option value="2">Entrenador</option>
          <option value="3">Usuario</option>
        </select>
      </div>
      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={formData.estado !== false}
            onChange={(e) => setFormData({ ...formData, estado: e.target.checked })}
          />
          Activo
        </label>
      </div>
    </>
  );
};

export default UsuarioModal;

