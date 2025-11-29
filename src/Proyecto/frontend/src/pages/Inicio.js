import React, { useState, useEffect } from 'react';
import './Home.css';
import logoTigreClaro from '../assets/tigrewhite.png';
import logoTigreOscuro from '../assets/tigreblack.png';
import { useTheme } from '../context/ThemeContext';

// Datos iniciales simulados (MOCK DATA)
const MOCK_REVIEWS = [
  {
    id: 1001,
    nombreCompleto: "Alejandra Torres",
    email: "alejandra.t@gmail.com",
    mensaje: "¡Excelente gimnasio! El equipo es moderno y los entrenadores son muy atentos. ¡Lo recomiendo a todos!",
    fechaCreacion: new Date().toISOString(),
  },
  {
    id: 1002,
    nombreCompleto: "Ricardo López",
    email: "ricardo.l@gmail.com",
    mensaje: "El ambiente es motivador y las clases de Spinning son increíbles. Definitivamente el mejor de la ciudad.",
    fechaCreacion: new Date(Date.now() - 86400000 * 7).toISOString(),
  }
];

const Inicio = () => {
  const user = null;
  const { darkMode } = useTheme();
  const logoSrc = darkMode ? logoTigreOscuro : logoTigreClaro;

  const [resenas, setResenas] = useState(MOCK_REVIEWS);
  const [loadingResenas, setLoadingResenas] = useState(true);
  const [errorResenas, setErrorResenas] = useState(null);

  // Función para obtener las iniciales del nombre
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Función para cargar reseñas
  const fetchResenas = async () => {
    try {
      setLoadingResenas(true);
      const response = await fetch('http://localhost:8080/api/comentarios');

      if (response.ok) {
        const data = await response.json();

        if (data && data.length > 0) {
          const sortedData = data.sort((a, b) =>
            new Date(b.fechaCreacion) - new Date(a.fechaCreacion)
          );
          setResenas(sortedData);
          setErrorResenas(null);
        } else {
          setResenas(MOCK_REVIEWS);
        }
      } else {
        setErrorResenas(`Error al cargar las reseñas: ${response.statusText}`);
        setResenas(MOCK_REVIEWS);
      }
    } catch (error) {
      console.error('Error de red al cargar reseñas:', error);
      setErrorResenas('No se pudo conectar al servidor. Mostrando comentarios de ejemplo.');
      setResenas(MOCK_REVIEWS);
    } finally {
      setLoadingResenas(false);
    }
  };

  // Cargar reseñas al montar el componente
  useEffect(() => {
    fetchResenas();
  }, []);

  // Auto-refresh cada 30 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      fetchResenas();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-logo-container">
            <img
              src={logoSrc}
              alt="Logo del Tigre"
              className="hero-logo-tigre"
            />
          </div>
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
                <a href="/planes" className="btn-primary btn-hero">Únete Ahora</a>
                <a href="/planes" className="btn-secondary btn-hero">Ver Planes</a>
              </>
            ) : (
              <a href="/dashboard" className="btn-primary btn-hero">
                Ir a Mi Dashboard
              </a>
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

      <hr />

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">¿Por qué elegirnos?</h2>
            <p className="section-subtitle">Tenemos todo lo que necesitas para alcanzar tus metas</p>
          </div>
          <div className="features-grid">
            <div className="feature-card" data-number="01">
              <div className="feature-icon">💪</div>
              <h3>Equipamiento Premium</h3>
              <p>Máquinas de última generación de marcas reconocidas mundialmente</p>
            </div>
            <div className="feature-card" data-number="02">
              <div className="feature-icon">👨‍🏫</div>
              <h3>Entrenadores Certificados</h3>
              <p>Personal altamente calificado para guiarte en cada paso</p>
            </div>
            <div className="feature-card" data-number="03">
              <div className="feature-icon">📅</div>
              <h3>Horarios Flexibles</h3>
              <p>Abierto 7 días a la semana con horarios extendidos</p>
            </div>
            <div className="feature-card" data-number="04">
              <div className="feature-icon">🏋️</div>
              <h3>Clases Grupales</h3>
              <p>Yoga, Spinning, CrossFit, Zumba y más de 20 disciplinas</p>
            </div>
            <div className="feature-card" data-number="05">
              <div className="feature-icon">🎯</div>
              <h3>Planes Personalizados</h3>
              <p>Rutinas diseñadas específicamente para tus objetivos</p>
            </div>
            <div className="feature-card" data-number="06">
              <div className="feature-icon">🏆</div>
              <h3>Ambiente Motivador</h3>
              <p>Comunidad activa que te impulsa a dar lo mejor</p>
            </div>
          </div>
        </div>
      </section>

      <hr />

      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Nuestros Servicios</h2>
            <p className="section-subtitle">Todo lo que necesitas en un solo lugar</p>
          </div>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🏃‍♂️</div>
              <h3>Área Cardiovascular</h3>
              <p>Caminadoras, elípticas, bicicletas y más equipos cardio</p>
              <ul className="service-features">
                <li>✓ Pantallas táctiles</li>
                <li>✓ Programas personalizados</li>
                <li>✓ Monitoreo cardíaco</li>
              </ul>
            </div>
            <div className="service-card">
              <div className="service-icon">💪</div>
              <h3>Zona de Pesas Libres</h3>
              <p>Amplia variedad de mancuernas, barras y discos</p>
              <ul className="service-features">
                <li>✓ Hasta 50kg por mancuerna</li>
                <li>✓ Racks olímpicos</li>
                <li>✓ Plataformas de levantamiento</li>
              </ul>
            </div>
            <div className="service-card">
              <div className="service-icon">🤸</div>
              <h3>Área Funcional</h3>
              <p>Espacio dedicado al entrenamiento funcional</p>
              <ul className="service-features">
                <li>✓ TRX y bandas</li>
                <li>✓ Kettlebells</li>
                <li>✓ Cajas pliométricas</li>
              </ul>
            </div>
            <div className="service-card">
              <div className="service-icon">🧘</div>
              <h3>Salas de Clases</h3>
              <p>Estudios especializados para diferentes disciplinas</p>
              <ul className="service-features">
                <li>✓ Yoga y Pilates</li>
                <li>✓ Spinning</li>
                <li>✓ Clases de baile</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <hr />

      {/* Testimonials Section - MEJORADO */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Lo que dicen nuestros visitantes</h2>
            <p className="section-subtitle">
              Comentarios recientes de nuestra comunidad
              <button
                onClick={fetchResenas}
                disabled={loadingResenas}
                style={{
                  marginLeft: '15px',
                  padding: '8px 16px',
                  background: loadingResenas ? '#ccc' : 'var(--primary-color)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: loadingResenas ? 'not-allowed' : 'pointer',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s'
                }}
              >
                {loadingResenas ? '⏳ Cargando...' : '🔄 Actualizar'}
              </button>
            </p>
          </div>

          {loadingResenas && (
            <p className="loading-message">Cargando comentarios recientes...</p>
          )}

          {errorResenas && (
            <p className="error-message">⚠️ {errorResenas}</p>
          )}

          {!loadingResenas && resenas.length > 0 && (
            <div className="testimonials-grid">
              {resenas.map((resena) => (
                <div key={resena.id} className="testimonial-card-improved">
                  {/* HEADER: Avatar + Nombre + Email en la misma línea */}
                  <div className="testimonial-header">
                    <div className="testimonial-avatar">
                      {getInitials(resena.nombreCompleto)}
                    </div>
                    <div className="testimonial-user-info">
                      <strong className="testimonial-name">{resena.nombreCompleto}</strong>
                      <span className="testimonial-email">{resena.email}</span>
                    </div>
                  </div>

                  {/* CENTRO: Mensaje principal */}
                  <p className="testimonial-message">
                    {resena.mensaje}
                  </p>

                  {/* FOOTER: Fecha */}
                  <div className="testimonial-footer">
                    <span className="testimonial-date">
                      {new Date(resena.fechaCreacion).toLocaleDateString('es-PE', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loadingResenas && resenas.length === 0 && !errorResenas && (
            <p className="no-resenas-message">
              Aún no hay comentarios. ¡Sé el primero en dejarnos tu opinión en la página de Contacto!
            </p>
          )}
        </div>
      </section>

      <hr />

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>¿Listo para transformar tu vida?</h2>
            <p>Únete a nuestra comunidad hoy y obtén 7 días gratis para probar todas nuestras instalaciones</p>
            <div className="cta-buttons">
              <a href="/planes" className="btn-primary">Comenzar Ahora</a>
              <a href="/contacto" className="btn-secondary">Contactar</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Inicio;