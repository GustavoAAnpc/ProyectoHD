import React, { useState } from 'react';

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '+51 ',
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

  // Validación de teléfono peruano (9 dígitos después del +51)
  const validatePhone = (phone) => {
    const cleanPhone = phone.replace(/\s/g, '');
    const regex = /^\+51\s?9\d{8}$/;
    return regex.test(cleanPhone);
  };

  // Manejo de cambio en teléfono con formato automático
  const handlePhoneChange = (value) => {
    // Si está vacío, establecer el prefijo
    if (value === '') {
      setFormData({...formData, telefono: '+51 '});
      return;
    }
    
    // Mantener siempre el +51
    if (!value.startsWith('+51')) {
      value = '+51 ' + value.replace(/^\+51\s?/, '');
    }
    
    // Limitar a +51 + espacio + 9 dígitos
    const numbers = value.replace('+51 ', '').replace(/\D/g, '');
    if (numbers.length <= 9) {
      setFormData({...formData, telefono: '+51 ' + numbers});
    }
  };

  // Validación en tiempo real
  const handleBlur = (field) => {
    const newErrors = {...errors};

    if (field === 'email' && formData.email) {
      if (!validateEmail(formData.email)) {
        newErrors.email = 'Por favor ingresa un email válido';
      } else {
        delete newErrors.email;
      }
    }

    if (field === 'telefono' && formData.telefono && formData.telefono !== '+51 ') {
      if (!validatePhone(formData.telefono)) {
        newErrors.telefono = 'Formato: +51 9XXXXXXXX (9 dígitos)';
      } else {
        delete newErrors.telefono;
      }
    }

    if (field === 'mensaje' && formData.mensaje) {
      if (formData.mensaje.length > 500) {
        newErrors.mensaje = 'El mensaje no puede exceder 500 caracteres';
      } else {
        delete newErrors.mensaje;
      }
    }

    setErrors(newErrors);
  };

  const handleSubmit = async () => {
    // Validar todos los campos
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Por favor ingresa un email válido';
    }

    if (formData.telefono && formData.telefono !== '+51 ' && !validatePhone(formData.telefono)) {
      newErrors.telefono = 'Formato incorrecto. Debe ser +51 9XXXXXXXX';
    }

    if (!formData.mensaje.trim()) {
      newErrors.mensaje = 'El mensaje es obligatorio';
    } else if (formData.mensaje.length > 500) {
      newErrors.mensaje = 'El mensaje no puede exceder 500 caracteres';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setErrorMessage('Por favor completa todos los campos obligatorios correctamente.');
      return;
    }

    // Simular envío
    setLoading(true);
    setErrorMessage('');
    setErrors({});

    try {
      // Aquí iría tu llamada a la API
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simular error aleatorio para pruebas (20% de probabilidad)
          if (Math.random() < 0.2) {
            reject(new Error('Error de conexión'));
          } else {
            resolve();
          }
        }, 2000);
      });

      setSubmitted(true);
      setFormData({ nombre: '', email: '', telefono: '+51 ', mensaje: '' });
      
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);

    } catch (error) {
      setErrorMessage('Hubo un error al enviar el mensaje. Por favor, intenta nuevamente o contáctanos por teléfono.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{paddingTop: '100px', fontFamily: 'system-ui, -apple-system, sans-serif', minHeight: '100vh', paddingBottom: '60px'}}>
      <div style={{maxWidth: '1400px', margin: '0 auto', padding: '0 20px'}}>
        <div style={{textAlign: 'center', marginBottom: '60px'}}>
          <h2 style={{fontSize: '2.5rem', marginBottom: '10px', color: 'var(--text-color)', fontWeight: '700'}}>Contáctanos</h2>
          <p style={{fontSize: '1.1rem', color: 'var(--text-secondary)'}}>Estamos aquí para ayudarte</p>
        </div>
        
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '60px', maxWidth: '1200px', margin: '0 auto'}}>
          <div>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
              {[
                {icon: '📍', title: 'Ubicación', content: 'Av. Principal 123, Miraflores\nLima, Perú'},
                {icon: '📞', title: 'Teléfono', content: '+51 1 234 5678'},
                {icon: '✉️', title: 'Email', content: 'info@forcafitness.com'},
                {icon: '🕐', title: 'Horarios', content: 'Lun - Vie: 6:00 AM - 10:00 PM\nSáb: 8:00 AM - 8:00 PM\nDom: 9:00 AM - 6:00 PM'}
              ].map((item, idx) => (
                <div key={idx} style={{
                  background: 'var(--card-bg)',
                  padding: '30px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  textAlign: 'center',
                  transition: 'transform 0.3s'
                }}>
                  <div style={{fontSize: '2.5rem', marginBottom: '15px'}}>{item.icon}</div>
                  <h4 style={{color: 'var(--text-color)', marginBottom: '10px', fontSize: '1.1rem', fontWeight: '600'}}>{item.title}</h4>
                  <p style={{color: 'var(--text-secondary)', fontSize: '0.95rem', whiteSpace: 'pre-line', lineHeight: '1.6'}}>{item.content}</p>
                </div>
              ))}
            </div>
          </div>

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
                  <span style={{fontSize: '1.5rem'}}>⚠️</span>
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
                  <span style={{fontSize: '1.5rem'}}>✅</span>
                  <span>¡Mensaje enviado! Nos pondremos en contacto contigo pronto.</span>
                </div>
              )}

              {/* Campo Nombre */}
              <div style={{marginBottom: '20px'}}>
                <label style={{display: 'block', color: 'var(--text-color)', marginBottom: '8px', fontSize: '0.95rem', fontWeight: '500'}}>
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => setFormData({...formData, nombre: e.target.value})}
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
                  <span style={{color: '#ff5252', fontSize: '0.85rem', marginTop: '5px', display: 'block'}}>
                    {errors.nombre}
                  </span>
                )}
              </div>

              {/* Campo Email */}
              <div style={{marginBottom: '20px'}}>
                <label style={{display: 'block', color: 'var(--text-color)', marginBottom: '8px', fontSize: '0.95rem', fontWeight: '500'}}>
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
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
                  <span style={{color: '#ff5252', fontSize: '0.85rem', marginTop: '5px', display: 'block'}}>
                    {errors.email}
                  </span>
                )}
              </div>

              {/* Campo Teléfono */}
              <div style={{marginBottom: '20px'}}>
                <label style={{display: 'block', color: 'var(--text-color)', marginBottom: '8px', fontSize: '0.95rem', fontWeight: '500'}}>
                  Teléfono (opcional)
                </label>
                <input
                  type="tel"
                  value={formData.telefono}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  onBlur={() => handleBlur('telefono')}
                  placeholder="+51 9XXXXXXXX"
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    background: 'var(--input-bg)',
                    border: `2px solid ${errors.telefono ? '#f44336' : 'var(--border-color)'}`,
                    borderRadius: '8px',
                    color: 'var(--text-color)',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border 0.3s',
                    boxSizing: 'border-box',
                    WebkitTextFillColor: 'var(--text-color)'
                  }}
                />
                {errors.telefono && (
                  <span style={{color: '#ff5252', fontSize: '0.85rem', marginTop: '5px', display: 'block'}}>
                    {errors.telefono}
                  </span>
                )}

              </div>

              {/* Campo Mensaje */}
              <div style={{marginBottom: '20px'}}>
                <label style={{display: 'block', color: 'var(--text-color)', marginBottom: '8px', fontSize: '0.95rem', fontWeight: '500'}}>
                  Mensaje * <span style={{color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: '400'}}>
                    ({formData.mensaje.length}/500)
                  </span>
                </label>
                <textarea
                  value={formData.mensaje}
                  onChange={(e) => {
                    if (e.target.value.length <= 500) {
                      setFormData({...formData, mensaje: e.target.value});
                    }
                  }}
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
                  <span style={{color: '#ff5252', fontSize: '0.85rem', marginTop: '5px', display: 'block'}}>
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
                  <span style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'}}>
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
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        input:focus, textarea:focus {
          border-color: #667eea !important;
        }
        
        input::placeholder, textarea::placeholder {
          color: var(--text-secondary);
          opacity: 0.6;
        }
        
        button:not(:disabled):hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
        }
      `}</style>
    </section>
  );
};

export default Contacto;