import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <h1>Forca & Fitness</h1>
          <span>Gimnasio Peruano</span>
        </div>
        <nav className="nav">
          <Link to="/" className="nav-link">Inicio</Link>
          <Link to="/servicios" className="nav-link">Servicios</Link>
          <Link to="/nutricion" className="nav-link">Nutrición</Link>
          <Link to="/membresias" className="nav-link">Membresías</Link>
          <Link to="/contacto" className="nav-link">Contacto</Link>
        </nav>
        <div className="header-actions">
          <Link to="/login" className="btn-login">Iniciar Sesión</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

