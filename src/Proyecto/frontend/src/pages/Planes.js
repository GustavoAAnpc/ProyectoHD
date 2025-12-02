import React, { useState } from 'react';
import './planes.css';

const Planes = () => {
  const user = null;
  const [selectedPlan, setSelectedPlan] = useState(null);

  const planesDetalle = {
    basico: {
      nombre: 'Básico',
      precio: 'S/ 80',
      descripcion: 'Perfecto para comenzar tu transformación',
      incluye: [
        { titulo: 'Acceso Gimnasio', desc: 'Acceso completo a todas las instalaciones del gimnasio durante horarios regulares' },
        { titulo: 'Clases Grupales', desc: 'Participa en más de 20 clases diferentes: Yoga, Spinning, CrossFit, Zumba y más' },
        { titulo: 'App Móvil', desc: 'Acceso a nuestra aplicación móvil para reservar clases y seguir tu progreso' },
        { titulo: 'Sin Permanencia', desc: 'Cancela cuando quieras sin costos adicionales ni penalizaciones' }
      ],
      beneficios: [
        'Vestuarios y duchas',
        'Wi-Fi gratuito',
        'Estacionamiento incluido',
        'Agua purificada'
      ],
      horarios: 'Lun-Vie: 6:00 AM - 10:00 PM | Sáb: 8:00 AM - 8:00 PM | Dom: 9:00 AM - 6:00 PM'
    },
    premium: {
      nombre: 'Premium',
      precio: 'S/ 120',
      descripcion: 'El equilibrio perfecto entre servicio y precio',
      incluye: [
        { titulo: 'Todo del Plan Básico', desc: 'Incluye todos los beneficios del plan básico más las siguientes características premium' },
        { titulo: 'Entrenador Personal', desc: '2 sesiones mensuales con entrenador certificado para optimizar tus resultados' },
        { titulo: 'Plan Nutricional', desc: 'Plan de alimentación personalizado diseñado por nutricionistas profesionales' },
        { titulo: 'Análisis Corporal', desc: 'Evaluación mensual de composición corporal con InBody' },
        { titulo: 'Acceso Prioritario', desc: 'Reserva anticipada en clases populares y eventos especiales' }
      ],
      beneficios: [
        'Todos los beneficios del plan Básico',
        'Toalla premium incluida',
        'Descuentos en productos',
        'Invitaciones a eventos exclusivos'
      ],
      horarios: 'Acceso extendido: Lun-Dom 5:30 AM - 11:00 PM'
    },
    vip: {
      nombre: 'VIP',
      precio: 'S/ 200',
      descripcion: 'Experiencia premium sin límites',
      incluye: [
        { titulo: 'Todo del Plan Premium', desc: 'Incluye todos los beneficios premium más servicios VIP exclusivos' },
        { titulo: 'Entrenador Personal Ilimitado', desc: 'Sesiones ilimitadas con tu entrenador personal dedicado' },
        { titulo: 'Nutricionista Personal', desc: 'Seguimiento nutricional constante con consultas ilimitadas' },
        { titulo: 'Acceso 24/7', desc: 'Acceso completo las 24 horas, los 7 días de la semana' },
        { titulo: 'Suplementos Incluidos', desc: 'Kit mensual de suplementos deportivos premium' },
        { titulo: 'Consultas Ilimitadas', desc: 'Asesoría constante por WhatsApp con tu equipo de profesionales' }
      ],
      beneficios: [
        'Todos los beneficios Premium',
        'Locker privado',
        'Zona VIP exclusiva',
        'Servicio de toallas ilimitado',
        'Bebidas isotónicas incluidas',
        'Masajes de recuperación (2/mes)',
        'Prioridad en todos los servicios'
      ],
      horarios: 'Acceso ilimitado 24/7 todos los días del año'
    }
  };

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setTimeout(() => {
      document.getElementById('plan-detalle')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <>
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
              <button onClick={() => handleSelectPlan('basico')} className="btn-plan">
                Ver Detalles
              </button>
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
              <button onClick={() => handleSelectPlan('premium')} className="btn-plan btn-plan-primary">
                Ver Detalles
              </button>
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
              <button onClick={() => handleSelectPlan('vip')} className="btn-plan">
                Ver Detalles
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Detalles del Plan */}
      {selectedPlan && (
        <section id="plan-detalle" className="plan-detail-section">
          <div className="container">
            <div className="plan-detail-header">
              <div className="plan-detail-title">
                <h2>Plan {planesDetalle[selectedPlan].nombre}</h2>
                <p>{planesDetalle[selectedPlan].descripcion}</p>
              </div>
              <div className="plan-detail-price">
                <span className="detail-price">{planesDetalle[selectedPlan].precio}</span>
                <span className="detail-period">/mes</span>
              </div>
            </div>

            <div className="plan-detail-content">
              <div className="detail-section">
                <h3 className="detail-section-title">📋 ¿Qué incluye?</h3>
                <div className="detail-cards-grid">
                  {planesDetalle[selectedPlan].incluye.map((item, index) => (
                    <div key={index} className="detail-card">
                      <h4>{item.titulo}</h4>
                      <p>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="detail-section">
                <h3 className="detail-section-title">🎁 Beneficios Adicionales</h3>
                <div className="benefits-grid">
                  {planesDetalle[selectedPlan].beneficios.map((beneficio, index) => (
                    <div key={index} className="benefit-item">
                      <span className="benefit-icon">✓</span>
                      <span>{beneficio}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="detail-section">
                <h3 className="detail-section-title">🕐 Horarios de Acceso</h3>
                <div className="horarios-box">
                  <p>{planesDetalle[selectedPlan].horarios}</p>
                </div>
              </div>

              <div className="detail-actions">
                <a href="/contacto" className="btn-detail-primary">
                  Contratar Plan {planesDetalle[selectedPlan].nombre}
                </a>
                <button onClick={() => setSelectedPlan(null)} className="btn-detail-secondary">
                  Ver Otros Planes
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Sección de Comparación */}
      <section className="comparison-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Compara nuestros planes</h2>
            <p className="section-subtitle">Encuentra las diferencias entre cada plan</p>
          </div>
          <div className="comparison-table-wrapper">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Características</th>
                  <th>Básico</th>
                  <th className="featured-column">Premium</th>
                  <th>VIP</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Acceso gimnasio</td>
                  <td>✅</td>
                  <td className="featured-column">✅</td>
                  <td>✅ 24/7</td>
                </tr>
                <tr>
                  <td>Clases grupales</td>
                  <td>✅</td>
                  <td className="featured-column">✅</td>
                  <td>✅ Prioritario</td>
                </tr>
                <tr>
                  <td>Entrenador personal</td>
                  <td>❌</td>
                  <td className="featured-column">2 sesiones/mes</td>
                  <td>Ilimitado</td>
                </tr>
                <tr>
                  <td>Plan nutricional</td>
                  <td>❌</td>
                  <td className="featured-column">✅</td>
                  <td>✅ + Nutricionista</td>
                </tr>
                <tr>
                  <td>Análisis corporal</td>
                  <td>❌</td>
                  <td className="featured-column">Mensual</td>
                  <td>Quincenal</td>
                </tr>
                <tr>
                  <td>Suplementos</td>
                  <td>❌</td>
                  <td className="featured-column">❌</td>
                  <td>✅ Kit mensual</td>
                </tr>
                <tr>
                  <td>Masajes</td>
                  <td>❌</td>
                  <td className="featured-column">❌</td>
                  <td>2 por mes</td>
                </tr>
                <tr>
                  <td>Locker privado</td>
                  <td>❌</td>
                  <td className="featured-column">❌</td>
                  <td>✅ Permanente</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Sección de FAQ */}
      <section className="faq-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Preguntas Frecuentes</h2>
            <p className="section-subtitle">Resolvemos tus dudas</p>
          </div>
          <div className="faq-grid">
            <div className="faq-item">
              <h4>¿Puedo cambiar de plan?</h4>
              <p>Sí, puedes cambiar de plan en cualquier momento. El cambio se hará efectivo en tu próximo ciclo de facturación.</p>
            </div>
            <div className="faq-item">
              <h4>¿Hay periodo de prueba?</h4>
              <p>Sí, ofrecemos 7 días gratis para que pruebes nuestras instalaciones antes de decidir.</p>
            </div>
            <div className="faq-item">
              <h4>¿Cómo cancelo mi membresía?</h4>
              <p>Puedes cancelar en cualquier momento sin penalización. Solo debes notificarnos con 15 días de anticipación.</p>
            </div>
            <div className="faq-item">
              <h4>¿Los planes incluyen invitados?</h4>
              <p>El plan Premium y VIP incluyen 2 pases de invitado al mes. El plan Básico puede adquirirlos por S/ 15 cada uno.</p>
            </div>
            <div className="faq-item">
              <h4>¿Qué métodos de pago aceptan?</h4>
              <p>Aceptamos efectivo, tarjetas de crédito/débito, transferencias bancarias y pagos con Yape o Plin.</p>
            </div>
            <div className="faq-item">
              <h4>¿Hay descuentos por pago anual?</h4>
              <p>Sí, pagando anualmente obtienes 2 meses gratis en cualquier plan.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Planes;