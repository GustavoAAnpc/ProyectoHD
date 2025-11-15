import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import UserMenu from '../components/UserMenu';
import ThemeToggle from '../components/ThemeToggle';
import './Home.css';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="home-page">
      <header className="home-header">
        <nav className="home-nav">
          <Link to="/" className="logo">
            <span className="logo-icon">💪</span>
            <span className="logo-text">FORCA & FITNESS</span>
          </Link>
          <div className="nav-links">
            <a href="#inicio" className="nav-link">Inicio</a>
            <a href="#servicios" className="nav-link">Servicios</a>
            <a href="#planes" className="nav-link">Planes</a>
            <a href="#contacto" className="nav-link">Contacto</a>
            <ThemeToggle />
            {user ? (
              <UserMenu />
            ) : (
              <Link to="/login" className="btn-login">Iniciar Sesión</Link>
            )}
          </div>
        </nav>
      </header>

      <section id="inicio" className="hero-section">
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
                <Link to="/login" className="btn-primary btn-hero">Únete Ahora</Link>
                <a href="#planes" className="btn-secondary btn-hero">Ver Planes</a>
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

      <section id="servicios" className="services-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">¿Por qué elegir FORCA & FITNESS?</h2>
            <p className="section-subtitle">Todo lo que necesitas para alcanzar tus objetivos</p>
          </div>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🏋️‍♂️</div>
              <h3>Entrenamiento Personalizado</h3>
              <p>Rutinas diseñadas específicamente para tus objetivos con seguimiento profesional constante</p>
              <div className="service-features">
                <span className="feature-tag">Personalizado</span>
                <span className="feature-tag">Seguimiento 24/7</span>
              </div>
            </div>
            <div className="service-card">
              <div className="service-icon">🥗</div>
              <h3>Planes Nutricionales</h3>
              <p>Asesoría nutricional personalizada para complementar tu entrenamiento y maximizar resultados</p>
              <div className="service-features">
                <span className="feature-tag">Plan Personalizado</span>
                <span className="feature-tag">Tracking Calórico</span>
              </div>
            </div>
            <div className="service-card">
              <div className="service-icon">👥</div>
              <h3>Clases Grupales</h3>
              <p>Zumba, Spinning, Yoga, Pilates y más clases para todos los niveles. Diviértete entrenando</p>
              <div className="service-features">
                <span className="feature-tag">Diversidad</span>
                <span className="feature-tag">Comunidad</span>
              </div>
            </div>
            <div className="service-card">
              <div className="service-icon">📊</div>
              <h3>Seguimiento de Progreso</h3>
              <p>Monitorea tu evolución física con nuestro sistema de seguimiento avanzado y métricas detalladas</p>
              <div className="service-features">
                <span className="feature-tag">Análisis Detallado</span>
                <span className="feature-tag">Reportes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="planes" className="plans-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Planes que se adaptan a ti</h2>
            <p className="section-subtitle">Elige el plan perfecto para alcanzar tus objetivos</p>
          </div>
          <div className="plans-grid">
            <div className="plan-card">
              <div className="plan-header">
                <h3>Básico</h3>
                <div className="plan-price">
                  <span className="price-amount">S/ 80</span>
                  <span className="price-period">/mes</span>
                </div>
              </div>
              <ul className="plan-features">
                <li>✅ Acceso a todas las instalaciones</li>
                <li>✅ Clases grupales incluidas</li>
                <li>✅ App móvil gratuita</li>
                <li>✅ Sin permanencia</li>
              </ul>
              {!user && <Link to="/login" className="btn-plan">Elegir Plan</Link>}
            </div>
            <div className="plan-card featured">
              <div className="plan-badge">MÁS POPULAR</div>
              <div className="plan-header">
                <h3>Premium</h3>
                <div className="plan-price">
                  <span className="price-amount">S/ 120</span>
                  <span className="price-period">/mes</span>
                </div>
              </div>
              <ul className="plan-features">
                <li>✅ Todo del plan Básico</li>
                <li>✅ Entrenador personal (2 sesiones/mes)</li>
                <li>✅ Plan nutricional personalizado</li>
                <li>✅ Análisis de composición corporal</li>
                <li>✅ Acceso prioritario</li>
              </ul>
              {!user && <Link to="/login" className="btn-plan btn-plan-primary">Elegir Plan</Link>}
            </div>
            <div className="plan-card">
              <div className="plan-header">
                <h3>VIP</h3>
                <div className="plan-price">
                  <span className="price-amount">S/ 200</span>
                  <span className="price-period">/mes</span>
                </div>
              </div>
              <ul className="plan-features">
                <li>✅ Todo del plan Premium</li>
                <li>✅ Entrenador personal ilimitado</li>
                <li>✅ Nutricionista personal</li>
                <li>✅ Acceso prioritario 24/7</li>
                <li>✅ Suplementos incluidos</li>
                <li>✅ Consultas ilimitadas</li>
              </ul>
              {!user && <Link to="/login" className="btn-plan">Elegir Plan</Link>}
            </div>
          </div>
        </div>
      </section>

      <section id="contacto" className="contact-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Contáctanos</h2>
            <p className="section-subtitle">Estamos aquí para ayudarte</p>
          </div>
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
      </section>

      <footer className="home-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="footer-logo">💪 FORCA & FITNESS</div>
              <p>Transformando vidas desde 2020</p>
            </div>
            <div className="footer-section">
              <h5>Enlaces</h5>
              <a href="#inicio">Inicio</a>
              <a href="#servicios">Servicios</a>
              <a href="#planes">Planes</a>
              <a href="#contacto">Contacto</a>
            </div>
            <div className="footer-section">
              <h5>Legal</h5>
              <a href="#privacy">Privacidad</a>
              <a href="#terms">Términos</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 FORCA & FITNESS. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
