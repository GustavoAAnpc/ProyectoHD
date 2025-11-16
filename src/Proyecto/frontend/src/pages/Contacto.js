import React, { useState } from 'react';
import './Home.css';

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ nombre: '', email: '', telefono: '', mensaje: '' });
    }, 3000);
  };

  return (
    <section className="contact-section" style={{paddingTop: '100px'}}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Contáctanos</h2>
          <p className="section-subtitle">Estamos aquí para ayudarte</p>
        </div>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', maxWidth: '1200px', margin: '0 auto'}}>
          <div>
            <div className="contact-grid">
              <div className="contact-card">
                <div className="contact-icon">📍</div>
                <h4>Ubicación</h4>
                <p>Av. Principal 123, Miraflores<br />Lima, Perú</p>
              </div>
              <div className="contact-card">
                <div className="contact-icon">📞</div>
                <h4>Teléfono</h4>
                <p>+51 1 234 5678</p>
              </div>
              <div className="contact-card">
                <div className="contact-icon">✉️</div>
                <h4>Email</h4>
                <p>info@forcafitness.com</p>
              </div>
              <div className="contact-card">
                <div className="contact-icon">🕐</div>
                <h4>Horarios</h4>
                <p>Lun - Vie: 6:00 AM - 10:00 PM<br />
                Sáb: 8:00 AM - 8:00 PM<br />
                Dom: 9:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} style={{background: 'var(--bg-color)', padding: '40px', borderRadius: '16px', border: '2px solid var(--border-color)'}}>
              <div className="form-group">
                <label>Nombre Completo *</label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Teléfono</label>
                <input
                  type="tel"
                  value={formData.telefono}
                  onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Mensaje *</label>
                <textarea
                  value={formData.mensaje}
                  onChange={(e) => setFormData({...formData, mensaje: e.target.value})}
                  required
                  rows="5"
                />
              </div>
              {submitted && (
                <div style={{padding: '15px', background: 'rgba(76, 175, 80, 0.1)', color: '#4caf50', borderRadius: '8px', marginBottom: '20px'}}>
                  ¡Mensaje enviado! Nos pondremos en contacto contigo pronto.
                </div>
              )}
              <button type="submit" className="btn-primary" style={{width: '100%'}}>
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacto;

