import React from 'react';
import { Link } from 'react-router-dom';
import '../pages/Home.css';

const Footer = () => {
  return (
    <footer className="home-footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">💪 FORCA & FITNESS</div>
            <p>Transformando vidas desde 2020</p>
          </div>
          <div className="footer-section">
            <h5>Enlaces</h5>
            <Link to="/" className="footer-link">Inicio</Link>
            <Link to="/servicios" className="footer-link">Servicios</Link>
            <Link to="/planes" className="footer-link">Planes</Link>
            <Link to="/contacto" className="footer-link">Contacto</Link>
          </div>
          <div className="footer-section">
            <h5>Legal</h5>
            <a href="#privacy">Privacidad</a>
            <a href="#terms">Términos</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 FORCA & FITNESS. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

