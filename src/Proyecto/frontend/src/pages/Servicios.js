import React from 'react';
import './Servicios.css';

const Servicios = () => {
  const servicios = [
    {
      id: 1,
      title: "Entrenamiento Personal",
      description: "Sesiones personalizadas con entrenadores certificados para alcanzar tus objetivos específicos.",
      features: ["Evaluación inicial", "Plan personalizado", "Seguimiento constante", "Técnica perfecta"],
      price: "S/ 80/sesión",
      icon: "💪"
    },
    {
      id: 2,
      title: "CrossFit",
      description: "Entrenamiento funcional de alta intensidad que combina fuerza, resistencia y agilidad.",
      features: ["WOD diarios", "Comunidad activa", "Escalable para todos", "Resultados rápidos"],
      price: "S/ 120/mes",
      icon: "🔥"
    },
    {
      id: 3,
      title: "Clases Grupales",
      description: "Diversas clases grupales para mantenerte motivado y en forma junto a otros miembros.",
      features: ["Zumba", "Spinning", "Yoga", "Pilates", "Body Combat"],
      price: "Incluido en membresía",
      icon: "👥"
    },
    {
      id: 4,
      title: "Sala de Musculación",
      description: "Acceso completo a nuestra sala de musculación con equipos de última generación.",
      features: ["Máquinas modernas", "Pesas libres", "Zona cardio", "Vestuarios"],
      price: "S/ 60/mes",
      icon: "🏋️‍♂️"
    },
    {
      id: 5,
      title: "Rehabilitación Física",
      description: "Programas de recuperación y fortalecimiento con fisioterapeutas especializados.",
      features: ["Evaluación médica", "Terapia manual", "Ejercicios terapéuticos", "Seguimiento"],
      price: "S/ 100/sesión",
      icon: "🏥"
    },
    {
      id: 6,
      title: "Entrenamiento Funcional",
      description: "Movimientos naturales que mejoran tu rendimiento en actividades cotidianas.",
      features: ["Movimientos naturales", "Mejora postural", "Prevención lesiones", "Fuerza real"],
      price: "S/ 90/mes",
      icon: "⚡"
    }
  ];

  return (
    <div className="servicios">
      <div className="hero-section">
        <div className="container">
          <h1>Nuestros Servicios</h1>
          <p>Descubre todas las opciones que Forca & Fitness tiene para ofrecerte</p>
        </div>
      </div>

      <div className="services-grid">
        <div className="container">
          {servicios.map(servicio => (
            <div key={servicio.id} className="service-card">
              <div className="service-icon">{servicio.icon}</div>
              <h3>{servicio.title}</h3>
              <p className="service-description">{servicio.description}</p>
              <ul className="service-features">
                {servicio.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <div className="service-price">{servicio.price}</div>
              <button className="btn-service">Más Información</button>
            </div>
          ))}
        </div>
      </div>

      <div className="schedule-section">
        <div className="container">
          <h2>Horarios de Clases</h2>
          <div className="schedule-grid">
            <div className="schedule-card">
              <h3>Lunes - Viernes</h3>
              <div className="schedule-times">
                <div className="time-slot">
                  <span className="time">6:00 AM</span>
                  <span className="class">CrossFit</span>
                </div>
                <div className="time-slot">
                  <span className="time">7:00 AM</span>
                  <span className="class">Yoga</span>
                </div>
                <div className="time-slot">
                  <span className="time">6:00 PM</span>
                  <span className="class">Zumba</span>
                </div>
                <div className="time-slot">
                  <span className="time">7:00 PM</span>
                  <span className="class">Spinning</span>
                </div>
              </div>
            </div>
            
            <div className="schedule-card">
              <h3>Sábados</h3>
              <div className="schedule-times">
                <div className="time-slot">
                  <span className="time">8:00 AM</span>
                  <span className="class">CrossFit</span>
                </div>
                <div className="time-slot">
                  <span className="time">9:00 AM</span>
                  <span className="class">Pilates</span>
                </div>
                <div className="time-slot">
                  <span className="time">10:00 AM</span>
                  <span className="class">Body Combat</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <div className="container">
          <h2>¿Listo para comenzar?</h2>
          <p>Elige el servicio que mejor se adapte a tus objetivos</p>
          <button className="btn-primary large">Ver Membresías</button>
        </div>
      </div>
    </div>
  );
};

export default Servicios;
