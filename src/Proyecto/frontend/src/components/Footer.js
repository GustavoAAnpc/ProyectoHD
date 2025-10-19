import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Forca & Fitness</h3>
            <p>Tu gimnasio de confianza en Perú. Transformamos vidas a través del fitness y la nutrición.</p>
            <div className="social-links">
              <a href="#" className="social-link">Facebook</a>
              <a href="#" className="social-link">Instagram</a>
              <a href="#" className="social-link">WhatsApp</a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Servicios</h4>
            <ul>
              <li><Link to="/servicios">Entrenamiento Personal</Link></li>
              <li><Link to="/servicios">Clases Grupales</Link></li>
              <li><Link to="/servicios">CrossFit</Link></li>
              <li><Link to="/nutricion">Asesoría Nutricional</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Horarios</h4>
            <p>Lunes - Viernes: 5:00 AM - 10:00 PM</p>
            <p>Sábados: 6:00 AM - 8:00 PM</p>
            <p>Domingos: 7:00 AM - 6:00 PM</p>
          </div>
          
          <div className="footer-section">
            <h4>Contacto</h4>
            <p>📍 Av. Principal 123, Lima, Perú</p>
            <p>📞 +51 999 888 777</p>
            <p>✉️ info@forcafitness.com</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 Forca & Fitness. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
