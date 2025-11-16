import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Planes = () => {
  const { user } = useAuth();

  return (
    <section className="plans-section" style={{paddingTop: '100px'}}>
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
            {!user && <Link to="/contacto" className="btn-plan">Elegir Plan</Link>}
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
            {!user && <Link to="/contacto" className="btn-plan btn-plan-primary">Elegir Plan</Link>}
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
            {!user && <Link to="/contacto" className="btn-plan">Elegir Plan</Link>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Planes;

