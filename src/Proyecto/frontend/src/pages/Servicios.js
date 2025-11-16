import React from 'react';
import './Home.css';

const Servicios = () => {
  return (
    <section className="services-section" style={{paddingTop: '100px'}}>
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
  );
};

export default Servicios;

