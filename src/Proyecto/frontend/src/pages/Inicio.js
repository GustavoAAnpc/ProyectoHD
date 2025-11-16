import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Inicio = () => {
  const { user } = useAuth();

  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-badge">Transforma tu vida hoy</div>
        <h1 className="hero-title">
          Entrena como un <span className="highlight">PRO</span>, vive como un <span className="highlight">CAMPEÓN</span>
        </h1>
        <p className="hero-description">
          El gimnasio más completo de la ciudad con equipos de última generación, 
          entrenadores profesionales y un ambiente único para alcanzar tus objetivos.
        </p>
        <div className="hero-buttons">
          {!user ? (
            <>
              <Link to="/planes" className="btn-primary btn-hero">Únete Ahora</Link>
              <Link to="/planes" className="btn-secondary btn-hero">Ver Planes</Link>
            </>
          ) : (
            <Link to={user.rol === 'Administrador' ? '/dashboard/administrador' : 
                     user.rol === 'Entrenador' ? '/dashboard/entrenador' : 
                     '/dashboard/usuario'} 
                  className="btn-primary btn-hero">
              Ir a Mi Dashboard
            </Link>
          )}
        </div>
        <div className="hero-stats">
          <div className="stat-item">
            <div className="stat-number">5000+</div>
            <div className="stat-label">Miembros</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">50+</div>
            <div className="stat-label">Entrenadores</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">20+</div>
            <div className="stat-label">Sedes</div>
          </div>
        </div>
      </div>
      <div className="hero-image">
        <div className="hero-gradient"></div>
      </div>
    </section>
  );
};

export default Inicio;

