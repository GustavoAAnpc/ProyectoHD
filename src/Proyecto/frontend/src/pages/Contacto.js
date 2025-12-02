import React, { useState } from 'react';

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Validación de email
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Validación en tiempo real
  const handleBlur = (field) => {
    const newErrors = { ...errors };

    if (field === 'email' && formData.email) {
      if (!validateEmail(formData.email)) {
        newErrors.email = 'Por favor ingresa un email válido';
      } else {
        delete newErrors.email;
      }
    }

    if (field === 'mensaje' && formData.mensaje) {
      if (formData.mensaje.length > 1000) {
        newErrors.mensaje = 'El mensaje no puede exceder 1000 caracteres';
      } else if (formData.mensaje.length < 10) {
        newErrors.mensaje = 'El mensaje debe tener al menos 10 caracteres';
      } else {
        delete newErrors.mensaje;
      }
    }

    setErrors(newErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'mensaje' && value.length > 1000) {
      // No hacer nada si excede el límite
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // FUNCIÓN ACTUALIZADA PARA CONECTAR CON SPRING BOOT
  const handleSubmit = async () => {
    // 1. Validar todos los campos
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    } else if (formData.nombre.length < 2) {
      newErrors.nombre = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Por favor ingresa un email válido';
    }

    if (!formData.mensaje.trim()) {
      newErrors.mensaje = 'El mensaje es obligatorio';
    } else if (formData.mensaje.length > 1000) {
      newErrors.mensaje = 'El mensaje no puede exceder 1000 caracteres';
    } else if (formData.mensaje.length < 10) {
      newErrors.mensaje = 'El mensaje debe tener al menos 10 caracteres';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setErrorMessage('Por favor completa todos los campos obligatorios correctamente.');
      return;
    }

    // 2. Preparar el objeto para la API (Mapeo de nombres)
    const dataToSend = {
      nombreCompleto: formData.nombre, // Mapeo: nombre -> nombreCompleto (para la Entity)
      email: formData.email,
      mensaje: formData.mensaje,
    };

    // 3. Llamada a la API
    setLoading(true);
    setErrorMessage('');
    setErrors({});

    try {
      // URL corregida a /api/comentarios
      const response = await fetch('http://localhost:8080/api/comentarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        setSubmitted(true);
        // Resetear formulario
        setFormData({ nombre: '', email: '', mensaje: '' });

        setTimeout(() => {
          setSubmitted(false);
        }, 5000);

      } else {
        // Manejar errores HTTP (ej: 400 Bad Request)
        const errorData = await response.json();
        console.error('API Error:', errorData);
        // Si el backend devuelve un mapa de errores, mostrar el primero o un mensaje genérico
        const msg = typeof errorData === 'object' ? JSON.stringify(errorData) : errorData;
        setErrorMessage('Error al enviar: ' + msg);
      }

    } catch (error) {
      console.error('Error de red/conexión:', error);
      setErrorMessage('Hubo un error de conexión con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{ paddingTop: '100px', fontFamily: 'system-ui, -apple-system, sans-serif', minHeight: '100vh', paddingBottom: '60px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '10px', color: 'var(--text-color)', fontWeight: '700' }}>Contáctanos</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>Estamos aquí para ayudarte</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '60px', maxWidth: '1200px', margin: '0 auto' }}>
          {/* Columna de Información */}
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {[
                { icon: '📍', title: 'Ubicación', content: 'Av. Principal 123, Miraflores\nLima, Perú' },
                { icon: '📞', title: 'Teléfono', content: '+51 1 234 5678' },
                { icon: '✉️', title: 'Email', content: 'info@forcafitness.com' },
                { icon: '🕐', title: 'Horarios', content: 'Lun - Vie: 6:00 AM - 10:00 PM\nSáb: 8:00 AM - 8:00 PM\nDom: 9:00 AM - 6:00 PM' }
              ].map((item, idx) => (
                <div key={idx} style={{
                  background: 'var(--card-bg)',
                  padding: '30px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  textAlign: 'center',
                  transition: 'transform 0.3s'
                }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>{item.icon}</div>
                  <h4 style={{ color: 'var(--text-color)', marginBottom: '10px', fontSize: '1.1rem', fontWeight: '600' }}>{item.title}</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', whiteSpace: 'pre-line', lineHeight: '1.6' }}>{item.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Columna de Formulario */}
          <div>
            <div style={{
              background: 'var(--card-bg)',
              padding: '40px',
              borderRadius: '16px',
              border: '2px solid var(--border-color)'
            }}>

              {/* Alerta de error */}
              {errorMessage && (
                <div style={{
                  padding: '15px 20px',
                  background: 'rgba(244, 67, 54, 0.15)',
                  border: '2px solid rgba(244, 67, 54, 0.5)',
                  color: '#ff5252',
                  borderRadius: '10px',
                  marginBottom: '25px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '0.95rem',
                  lineHeight: '1.5',
                  animation: 'slideDown 0.3s ease-out'
                }}>
                  <span style={{ fontSize: '1.5rem' }}>⚠️</span>
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Alerta de éxito */}
              {submitted && (
                <div style={{
                  padding: '15px 20px',
                  background: 'rgba(76, 175, 80, 0.15)',
                  border: '2px solid rgba(76, 175, 80, 0.5)',
                  color: '#4caf50',
                  borderRadius: '10px',
                  marginBottom: '25px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '0.95rem',
                  animation: 'slideDown 0.3s ease-out'
                }}>
                  <span style={{ fontSize: '1.5rem' }}>✅</span>
                  <span>¡Mensaje enviado! Nos pondremos en contacto contigo pronto.</span>
                </div>
              )}

              {/* Campo Nombre */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', color: 'var(--text-color)', marginBottom: '8px', fontSize: '0.95rem', fontWeight: '500' }}>
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  onBlur={() => handleBlur('nombre')}
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    background: 'var(--input-bg)',
                    border: `2px solid ${errors.nombre ? '#f44336' : 'var(--border-color)'}`,
                    borderRadius: '8px',
                    color: 'var(--text-color)',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border 0.3s',
                    boxSizing: 'border-box',
                    WebkitTextFillColor: 'var(--text-color)'
                  }}
                />
                {errors.nombre && (
                  <span style={{ color: '#ff5252', fontSize: '0.85rem', marginTop: '5px', display: 'block' }}>
                    {errors.nombre}
                  </span>
                )}
              </div>

              {/* Campo Email */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', color: 'var(--text-color)', marginBottom: '8px', fontSize: '0.95rem', fontWeight: '500' }}>
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={() => handleBlur('email')}
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    background: 'var(--input-bg)',
                    border: `2px solid ${errors.email ? '#f44336' : 'var(--border-color)'}`,
                    borderRadius: '8px',
                    color: 'var(--text-color)',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border 0.3s',
                    boxSizing: 'border-box',
                    WebkitTextFillColor: 'var(--text-color)'
                  }}
                />
                {errors.email && (
                  <span style={{ color: '#ff5252', fontSize: '0.85rem', marginTop: '5px', display: 'block' }}>
                    {errors.email}
                  </span>
                )}
              </div>

              {/* Campo Mensaje */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', color: 'var(--text-color)', marginBottom: '8px', fontSize: '0.95rem', fontWeight: '500' }}>
                  Mensaje * <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: '400' }}>
                    ({formData.mensaje.length}/1000)
                  </span>
                </label>
                <textarea
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  onBlur={() => handleBlur('mensaje')}
                  rows="5"
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    background: 'var(--input-bg)',
                    border: `2px solid ${errors.mensaje ? '#f44336' : 'var(--border-color)'}`,
                    borderRadius: '8px',
                    color: 'var(--text-color)',
                    fontSize: '1rem',
                    outline: 'none',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                    transition: 'border 0.3s',
                    boxSizing: 'border-box',
                    WebkitTextFillColor: 'var(--text-color)'
                  }}
                />
                {errors.mensaje && (
                  <span style={{ color: '#ff5252', fontSize: '0.85rem', marginTop: '5px', display: 'block' }}>
                    {errors.mensaje}
                  </span>
                )}
              </div>

              {/* Botón Submit */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '15px',
                  background: loading ? '#555' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1.05rem',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s',
                  opacity: loading ? 0.7 : 1
                }}
              >
                {loading ? (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                    <span style={{
                      border: '3px solid rgba(255,255,255,0.3)',
                      borderTop: '3px solid #fff',
                      borderRadius: '50%',
                      width: '20px',
                      height: '20px',
                      animation: 'spin 1s linear infinite',
                      display: 'inline-block'
                    }}></span>
                    Enviando...
                  </span>
                ) : 'Enviar Mensaje'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default Contacto;