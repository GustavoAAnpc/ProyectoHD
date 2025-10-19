import React, { useState } from 'react';
import './Membresias.css';

const Membresias = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const planesMembresia = [
    {
      id: 1,
      name: "Básica",
      price: "S/ 80",
      period: "mensual",
      description: "Perfecta para comenzar tu transformación",
      features: [
        "Acceso a sala de musculación",
        "Clases grupales incluidas",
        "Vestuarios y duchas",
        "Horario: 5:00 AM - 10:00 PM",
        "WiFi gratuito"
      ],
      popular: false,
      color: "#6c757d"
    },
    {
      id: 2,
      name: "Premium",
      price: "S/ 120",
      period: "mensual",
      description: "La opción más popular para resultados óptimos",
      features: [
        "Todo de la membresía Básica",
        "Acceso a CrossFit",
        "1 sesión de entrenamiento personal/mes",
        "Asesoría nutricional básica",
        "Acceso a clases premium",
        "Descuentos en suplementos"
      ],
      popular: true,
      color: "#ff6b35"
    },
    {
      id: 3,
      name: "VIP",
      price: "S/ 200",
      period: "mensual",
      description: "Experiencia completa con todos los beneficios",
      features: [
        "Todo de la membresía Premium",
        "Entrenamiento personal ilimitado",
        "Asesoría nutricional completa",
        "Acceso 24/7",
        "Masajes deportivos incluidos",
        "Plan nutricional personalizado",
        "Seguimiento con app móvil"
      ],
      popular: false,
      color: "#f7931e"
    }
  ];

  const beneficiosAdicionales = [
    {
      icon: "🏋️‍♀️",
      title: "Equipos de Última Generación",
      description: "Máquinas modernas y tecnología avanzada para optimizar tu entrenamiento"
    },
    {
      icon: "👨‍⚕️",
      title: "Entrenadores Certificados",
      description: "Profesionales altamente capacitados para guiarte en cada paso"
    },
    {
      icon: "🥗",
      title: "Asesoría Nutricional",
      description: "Planes alimenticios personalizados según tus objetivos"
    },
    {
      icon: "📱",
      title: "App Móvil",
      description: "Seguimiento de progreso, reservas y comunidad en una sola app"
    },
    {
      icon: "🚗",
      title: "Estacionamiento Gratuito",
      description: "Espacio seguro para tu vehículo sin costo adicional"
    },
    {
      icon: "👥",
      title: "Comunidad Activa",
      description: "Únete a una comunidad motivada y comprometida con el fitness"
    }
  ];

  const testimonios = [
    {
      name: "María González",
      age: 28,
      plan: "Premium",
      testimonial: "Llevo 6 meses con la membresía Premium y he logrado bajar 15 kilos. Los entrenadores son increíbles y la comunidad me motiva cada día.",
      rating: 5
    },
    {
      name: "Carlos Mendoza",
      age: 35,
      plan: "VIP",
      testimonial: "La membresía VIP vale cada sol. El entrenamiento personal y la asesoría nutricional han transformado completamente mi vida.",
      rating: 5
    },
    {
      name: "Ana Rodríguez",
      age: 24,
      plan: "Básica",
      testimonial: "Perfecto para mi presupuesto. Tengo acceso a todo lo que necesito para mantenerme en forma y saludable.",
      rating: 4
    }
  ];

  return (
    <div className="membresias">
      <div className="hero-section">
        <div className="container">
          <h1>Membresías</h1>
          <p>Elige el plan que mejor se adapte a tus objetivos y presupuesto</p>
        </div>
      </div>

      <div className="pricing-section">
        <div className="container">
          <div className="pricing-grid">
            {planesMembresia.map(plan => (
              <div 
                key={plan.id} 
                className={`pricing-card ${plan.popular ? 'popular' : ''}`}
                style={{ borderColor: plan.color }}
              >
                {plan.popular && <div className="popular-badge">Más Popular</div>}
                <div className="plan-header">
                  <h3>{plan.name}</h3>
                  <div className="plan-price">
                    <span className="price">{plan.price}</span>
                    <span className="period">/{plan.period}</span>
                  </div>
                </div>
                <p className="plan-description">{plan.description}</p>
                <ul className="plan-features">
                  {plan.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <button 
                  className={`btn-plan ${plan.popular ? 'btn-popular' : ''}`}
                  style={{ backgroundColor: plan.color }}
                  onClick={() => setSelectedPlan(plan)}
                >
                  Elegir Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="benefits-section">
        <div className="container">
          <h2>Beneficios Incluidos</h2>
          <div className="benefits-grid">
            {beneficiosAdicionales.map((beneficio, index) => (
              <div key={index} className="benefit-card">
                <div className="benefit-icon">{beneficio.icon}</div>
                <h3>{beneficio.title}</h3>
                <p>{beneficio.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="testimonials-section">
        <div className="container">
          <h2>Lo que dicen nuestros miembros</h2>
          <div className="testimonials-grid">
            {testimonios.map((testimonio, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-header">
                  <div className="member-info">
                    <h4>{testimonio.name}</h4>
                    <span className="age">{testimonio.age} años</span>
                    <span className="plan">{testimonio.plan}</span>
                  </div>
                  <div className="rating">
                    {[...Array(testimonio.rating)].map((_, i) => (
                      <span key={i} className="star">⭐</span>
                    ))}
                  </div>
                </div>
                <p className="testimonial-text">"{testimonio.testimonial}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="faq-section">
        <div className="container">
          <h2>Preguntas Frecuentes</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h4>¿Puedo cambiar de plan en cualquier momento?</h4>
              <p>Sí, puedes cambiar tu plan de membresía en cualquier momento. Los cambios se aplicarán en el próximo ciclo de facturación.</p>
            </div>
            <div className="faq-item">
              <h4>¿Hay período de prueba?</h4>
              <p>Ofrecemos 3 días de prueba gratuita para que conozcas nuestras instalaciones y servicios antes de comprometerte.</p>
            </div>
            <div className="faq-item">
              <h4>¿Qué incluye la asesoría nutricional?</h4>
              <p>Incluye evaluación inicial, plan alimenticio personalizado, seguimiento mensual y acceso a recetas saludables.</p>
            </div>
            <div className="faq-item">
              <h4>¿Puedo congelar mi membresía?</h4>
              <p>Sí, puedes congelar tu membresía por hasta 3 meses al año por motivos médicos o viajes prolongados.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <div className="container">
          <h2>¿Listo para comenzar tu transformación?</h2>
          <p>Únete a más de 500 miembros que ya han transformado sus vidas</p>
          <div className="cta-buttons">
            <button className="btn-primary large">Comenzar Ahora</button>
            <button className="btn-secondary large">Prueba Gratuita</button>
          </div>
        </div>
      </div>

      {selectedPlan && (
        <div className="modal-overlay" onClick={() => setSelectedPlan(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>Confirmar Membresía {selectedPlan.name}</h3>
            <p>Precio: {selectedPlan.price}/{selectedPlan.period}</p>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setSelectedPlan(null)}>
                Cancelar
              </button>
              <button className="btn-confirm">Confirmar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Membresias;
