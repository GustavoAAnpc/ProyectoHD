import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Transforma tu vida en <span className="highlight">Forca & Fitness</span></h1>
          <p>El gimnasio peruano que te acompaña en tu transformación física y mental</p>
          <div className="hero-buttons">
            <button className="btn-primary">Comenzar Ahora</button>
            <button className="btn-secondary">Ver Servicios</button>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-placeholder">
            <span>🏋️‍♂️</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2>¿Por qué elegir Forca & Fitness?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">💪</div>
              <h3>Equipos Modernos</h3>
              <p>Máquinas de última generación para todos tus entrenamientos</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👨‍⚕️</div>
              <h3>Entrenadores Certificados</h3>
              <p>Profesionales altamente capacitados para guiarte</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🥗</div>
              <h3>Asesoría Nutricional</h3>
              <p>Planes alimenticios personalizados para tus objetivos</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⏰</div>
              <h3>Horarios Flexibles</h3>
              <p>Abierto de 5:00 AM a 10:00 PM para adaptarnos a tu rutina</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <h3>500+</h3>
              <p>Miembros Activos</p>
            </div>
            <div className="stat-item">
              <h3>5</h3>
              <p>Años de Experiencia</p>
            </div>
            <div className="stat-item">
              <h3>15+</h3>
              <p>Entrenadores Certificados</p>
            </div>
            <div className="stat-item">
              <h3>24/7</h3>
              <p>Soporte al Cliente</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <h2>¿Listo para comenzar tu transformación?</h2>
          <p>Únete a la familia Forca & Fitness y descubre todo tu potencial</p>
          <button className="btn-primary large">Obtener Membresía</button>
        </div>
      </section>
    </div>
  );
};

export default Home;
