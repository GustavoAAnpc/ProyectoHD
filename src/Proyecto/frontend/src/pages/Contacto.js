import React, { useState } from 'react';
import './Contacto.css';

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí se manejaría el envío del formulario
    console.log('Formulario enviado:', formData);
    alert('¡Mensaje enviado correctamente! Te contactaremos pronto.');
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      asunto: '',
      mensaje: ''
    });
  };

  const horarios = [
    { dia: 'Lunes - Viernes', horario: '5:00 AM - 10:00 PM' },
    { dia: 'Sábados', horario: '6:00 AM - 8:00 PM' },
    { dia: 'Domingos', horario: '7:00 AM - 6:00 PM' }
  ];

  const serviciosContacto = [
    {
      icon: '💪',
      title: 'Entrenamiento Personal',
      description: 'Sesiones personalizadas con entrenadores certificados',
      contacto: 'WhatsApp: +51 999 888 777'
    },
    {
      icon: '🥗',
      title: 'Asesoría Nutricional',
      description: 'Planes alimenticios personalizados',
      contacto: 'Email: nutricion@forcafitness.com'
    },
    {
      icon: '🏋️‍♂️',
      title: 'Membresías',
      description: 'Información sobre planes y precios',
      contacto: 'Teléfono: +51 1 234 5678'
    },
    {
      icon: '👥',
      title: 'Clases Grupales',
      description: 'Reserva tu lugar en nuestras clases',
      contacto: 'App móvil o WhatsApp'
    }
  ];

  return (
    <div className="contacto">
      <div className="hero-section">
        <div className="container">
          <h1>Contacto</h1>
          <p>Estamos aquí para ayudarte en tu transformación</p>
        </div>
      </div>

      <div className="contact-content">
        <div className="container">
          <div className="contact-grid">
            {/* Información de Contacto */}
            <div className="contact-info">
              <h2>Información de Contacto</h2>
              
              <div className="info-card">
                <div className="info-icon">📍</div>
                <div className="info-content">
                  <h3>Dirección</h3>
                  <p>Av. Principal 123, Miraflores<br />Lima, Perú</p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">📞</div>
                <div className="info-content">
                  <h3>Teléfono</h3>
                  <p>+51 1 234 5678<br />+51 999 888 777 (WhatsApp)</p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">✉️</div>
                <div className="info-content">
                  <h3>Email</h3>
                  <p>info@forcafitness.com<br />nutricion@forcafitness.com</p>
                </div>
              </div>

              <div className="horarios">
                <h3>Horarios de Atención</h3>
                {horarios.map((horario, index) => (
                  <div key={index} className="horario-item">
                    <span className="dia">{horario.dia}</span>
                    <span className="hora">{horario.horario}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Formulario de Contacto */}
            <div className="contact-form">
              <h2>Enviarnos un Mensaje</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="nombre">Nombre Completo *</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="telefono">Teléfono</label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="asunto">Asunto *</label>
                  <select
                    id="asunto"
                    name="asunto"
                    value={formData.asunto}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecciona un asunto</option>
                    <option value="membresia">Información sobre Membresías</option>
                    <option value="entrenamiento">Entrenamiento Personal</option>
                    <option value="nutricion">Asesoría Nutricional</option>
                    <option value="clases">Clases Grupales</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="mensaje">Mensaje *</label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    rows="5"
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn-submit">
                  Enviar Mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Servicios de Contacto */}
      <div className="servicios-contacto">
        <div className="container">
          <h2>¿Cómo podemos ayudarte?</h2>
          <div className="servicios-grid">
            {serviciosContacto.map((servicio, index) => (
              <div key={index} className="servicio-card">
                <div className="servicio-icon">{servicio.icon}</div>
                <h3>{servicio.title}</h3>
                <p>{servicio.description}</p>
                <div className="servicio-contacto">{servicio.contacto}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mapa y Ubicación */}
      <div className="ubicacion-section">
        <div className="container">
          <h2>Nuestra Ubicación</h2>
          <div className="mapa-container">
            <div className="mapa-placeholder">
              <div className="mapa-content">
                <span className="mapa-icon">🗺️</span>
                <h3>Forca & Fitness</h3>
                <p>Av. Principal 123, Miraflores, Lima</p>
                <div className="mapa-info">
                  <p>📍 Fácil acceso en transporte público</p>
                  <p>🚗 Estacionamiento gratuito</p>
                  <p>🚌 Parada de bus a 2 cuadras</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Redes Sociales */}
      <div className="redes-section">
        <div className="container">
          <h2>Síguenos en Redes Sociales</h2>
          <div className="redes-grid">
            <a href="#" className="red-social">
              <div className="red-icon">📘</div>
              <h3>Facebook</h3>
              <p>@ForcaFitness</p>
            </a>
            <a href="#" className="red-social">
              <div className="red-icon">📷</div>
              <h3>Instagram</h3>
              <p>@forcafitness</p>
            </a>
            <a href="#" className="red-social">
              <div className="red-icon">💬</div>
              <h3>WhatsApp</h3>
              <p>+51 999 888 777</p>
            </a>
            <a href="#" className="red-social">
              <div className="red-icon">📱</div>
              <h3>TikTok</h3>
              <p>@forcafitness</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto;



