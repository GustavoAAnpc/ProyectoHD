import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="home-page">
      <header className="home-header">
        <nav className="home-nav">
          <div className="logo">💪 FORCA & FITNESS</div>
          <div className="nav-links">
            <a href="#inicio">Inicio</a>
            <a href="#servicios">Servicios</a>
            <a href="#planes">Planes</a>
            <a href="#contacto">Contacto</a>
            {user ? (
              <Link to={`/dashboard/${user.rol.toLowerCase()}`} className="btn-login">Mi Cuenta</Link>
            ) : (
              <Link to="/login" className="btn-login">Iniciar Sesión</Link>
            )}
          </div>
        </nav>
      </header>

      <section id="inicio" className="hero-section">
        <div className="hero-content">
          <h1>Transforma tu cuerpo, transforma tu vida</h1>
          <p>El mejor gimnasio con equipos de última generación y entrenadores profesionales</p>
          {!user && (
            <Link to="/login" className="btn-primary">Únete Ahora</Link>
          )}
        </div>
      </section>

      <section id="servicios" className="services-section">
        <div className="container">
          <h2>Nuestros Servicios</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🏋️</div>
              <h3>Entrenamiento Personalizado</h3>
              <p>Rutinas diseñadas específicamente para tus objetivos con seguimiento profesional</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🥗</div>
              <h3>Planes Nutricionales</h3>
              <p>Asesoría nutricional personalizada para complementar tu entrenamiento</p>
            </div>
            <div className="service-card">
              <div className="service-icon">👥</div>
              <h3>Clases Grupales</h3>
              <p>Zumba, Spinning, Yoga, Pilates y más clases para todos los niveles</p>
            </div>
            <div className="service-card">
              <div className="service-icon">📊</div>
              <h3>Seguimiento de Progreso</h3>
              <p>Monitorea tu evolución física con nuestro sistema de seguimiento avanzado</p>
            </div>
          </div>
        </div>
      </section>

      <section id="planes" className="plans-section">
        <div className="container">
          <h2>Planes de Membresía</h2>
          <div className="plans-grid">
            <div className="plan-card">
              <h3>Básico</h3>
              <div className="plan-price">S/ 80<span>/mes</span></div>
              <ul className="plan-features">
                <li>Acceso a todas las instalaciones</li>
                <li>Clases grupales incluidas</li>
                <li>App móvil</li>
              </ul>
              {!user && <Link to="/login" className="btn-plan">Elegir Plan</Link>}
            </div>
            <div className="plan-card featured">
              <div className="badge">Más Popular</div>
              <h3>Premium</h3>
              <div className="plan-price">S/ 120<span>/mes</span></div>
              <ul className="plan-features">
                <li>Todo del plan Básico</li>
                <li>Entrenador personal (2 sesiones/mes)</li>
                <li>Plan nutricional</li>
                <li>Análisis de composición corporal</li>
              </ul>
              {!user && <Link to="/login" className="btn-plan">Elegir Plan</Link>}
            </div>
            <div className="plan-card">
              <h3>VIP</h3>
              <div className="plan-price">S/ 200<span>/mes</span></div>
              <ul className="plan-features">
                <li>Todo del plan Premium</li>
                <li>Entrenador personal ilimitado</li>
                <li>Nutricionista personal</li>
                <li>Acceso prioritario</li>
                <li>Suplementos incluidos</li>
              </ul>
              {!user && <Link to="/login" className="btn-plan">Elegir Plan</Link>}
            </div>
          </div>
        </div>
      </section>

      <section id="contacto" className="contact-section">
        <div className="container">
          <h2>Contáctanos</h2>
          <div className="contact-info">
            <div className="contact-item">
              <h4>📍 Ubicación</h4>
              <p>Av. Principal 123, Miraflores, Lima</p>
            </div>
            <div className="contact-item">
              <h4>📞 Teléfono</h4>
              <p>+51 1 234 5678</p>
            </div>
            <div className="contact-item">
              <h4>✉️ Email</h4>
              <p>info@fitgym.com</p>
            </div>
            <div className="contact-item">
              <h4>🕐 Horarios</h4>
              <p>Lunes - Viernes: 6:00 AM - 10:00 PM<br />
              Sábados: 8:00 AM - 8:00 PM<br />
              Domingos: 9:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="home-footer">
        <div className="container">
          <p>&copy; 2024 FORCA & FITNESS. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
