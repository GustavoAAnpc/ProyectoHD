import React from 'react';
import './Home.css';

const Inicio = () => {
  const user = null;

  return (
    <>
      {/* Hero Section */}
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

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Lo que dicen nuestros miembros</h2>
            <p className="section-subtitle">Historias reales de transformación</p>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-rating">★★★★★</div>
              <p className="testimonial-text">
                "Increíble transformación. Bajé 15kg en 6 meses con el apoyo de los entrenadores. El ambiente es súper motivador."
              </p>
              <div className="testimonial-author">
                <div className="testimonial-author-info">
                  <strong>María González</strong>
                  <span>Miembro desde 2022</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-rating">★★★★★</div>
              <p className="testimonial-text">
                "Los equipos son de primera, siempre limpios y en buen estado. Las clases grupales son lo mejor."
              </p>
              <div className="testimonial-author">
                <div className="testimonial-author-info">
                  <strong>Carlos Ramírez</strong>
                  <span>Miembro desde 2021</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-rating">★★★★★</div>
              <p className="testimonial-text">
                "Mejor decisión que he tomado. Los entrenadores son profesionales y te ayudan a lograr tus objetivos."
              </p>
              <div className="testimonial-author">
                <div className="testimonial-author-info">
                  <strong>Ana Martínez</strong>
                  <span>Miembro desde 2023</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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