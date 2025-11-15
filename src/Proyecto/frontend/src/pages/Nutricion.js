import React, { useState } from 'react';
import './Nutricion.css';

const Nutricion = () => {
  const [activeTab, setActiveTab] = useState('planes');

  const planesNutricionales = [
    {
      id: 1,
      name: "Plan Básico",
      description: "Para principiantes que buscan mejorar sus hábitos alimenticios",
      price: "S/ 150/mes",
      features: [
        "Evaluación nutricional inicial",
        "Plan de alimentación personalizado",
        "Lista de compras semanal",
        "Recetas saludables",
        "Seguimiento mensual"
      ],
      duration: "3 meses"
    },
    {
      id: 2,
      name: "Plan Avanzado",
      description: "Para deportistas y personas con objetivos específicos",
      price: "S/ 250/mes",
      features: [
        "Todo del Plan Básico",
        "Cálculo de macronutrientes",
        "Suplementación personalizada",
        "Seguimiento semanal",
        "Ajustes según progreso",
        "Recetas gourmet saludables"
      ],
      duration: "6 meses"
    },
    {
      id: 3,
      name: "Plan Premium",
      description: "Acompañamiento completo con nutricionista especializado",
      price: "S/ 400/mes",
      features: [
        "Todo del Plan Avanzado",
        "Consultas ilimitadas",
        "Análisis de composición corporal",
        "Plan de hidratación",
        "Estrategias de competencia",
        "Soporte 24/7"
      ],
      duration: "12 meses"
    }
  ];

  const consejosNutricionales = [
    {
      categoria: "Hidratación",
      titulo: "La importancia del agua",
      contenido: "Mantén una hidratación adecuada bebiendo al menos 2-3 litros de agua al día. El agua es esencial para el transporte de nutrientes y la eliminación de toxinas.",
      icon: "💧"
    },
    {
      categoria: "Proteínas",
      titulo: "Proteínas de calidad",
      contenido: "Incluye proteínas magras en cada comida: pollo, pescado, huevos, legumbres. Las proteínas son fundamentales para la recuperación muscular.",
      icon: "🥩"
    },
    {
      categoria: "Carbohidratos",
      titulo: "Carbohidratos complejos",
      contenido: "Prefiere carbohidratos complejos como quinoa, avena, camote y arroz integral. Proporcionan energía sostenida para tus entrenamientos.",
      icon: "🌾"
    },
    {
      categoria: "Grasas",
      titulo: "Grasas saludables",
      contenido: "Incluye grasas saludables: aguacate, nueces, aceite de oliva, pescados grasos. Son esenciales para la absorción de vitaminas liposolubles.",
      icon: "🥑"
    },
    {
      categoria: "Frutas y Verduras",
      titulo: "Vitaminas y minerales",
      contenido: "Consume al menos 5 porciones de frutas y verduras al día. Proporcionan vitaminas, minerales y antioxidantes esenciales.",
      icon: "🥗"
    },
    {
      categoria: "Timing",
      titulo: "Timing nutricional",
      contenido: "Come 2-3 horas antes del entrenamiento y dentro de 30 minutos después. Optimiza el rendimiento y la recuperación.",
      icon: "⏰"
    }
  ];

  const recetasSaludables = [
    {
      nombre: "Bowl de Quinoa con Pollo",
      tiempo: "25 min",
      dificultad: "Fácil",
      ingredientes: ["Quinoa", "Pechuga de pollo", "Aguacate", "Tomate", "Lechuga", "Aceite de oliva"],
      preparacion: "Cocina la quinoa, asa el pollo, corta las verduras y mezcla todo en un bowl con aceite de oliva."
    },
    {
      nombre: "Smoothie Verde Energético",
      tiempo: "10 min",
      dificultad: "Fácil",
      ingredientes: ["Espinacas", "Plátano", "Leche de almendras", "Proteína en polvo", "Miel"],
      preparacion: "Licúa todos los ingredientes hasta obtener una mezcla homogénea y cremosa."
    },
    {
      nombre: "Salmón al Horno con Vegetales",
      tiempo: "35 min",
      dificultad: "Intermedio",
      ingredientes: ["Salmón", "Brócoli", "Zanahoria", "Aceite de oliva", "Limón", "Especias"],
      preparacion: "Marina el salmón, coloca en una bandeja con vegetales, hornea a 180°C por 25 minutos."
    }
  ];

  return (
    <div className="nutricion">
      <div className="hero-section">
        <div className="container">
          <h1>Nutrición Deportiva</h1>
          <p>Alimenta tu rendimiento con nuestros planes nutricionales personalizados</p>
        </div>
      </div>

      <div className="tabs-section">
        <div className="container">
          <div className="tabs">
            <button 
              className={`tab ${activeTab === 'planes' ? 'active' : ''}`}
              onClick={() => setActiveTab('planes')}
            >
              Planes Nutricionales
            </button>
            <button 
              className={`tab ${activeTab === 'consejos' ? 'active' : ''}`}
              onClick={() => setActiveTab('consejos')}
            >
              Consejos
            </button>
            <button 
              className={`tab ${activeTab === 'recetas' ? 'active' : ''}`}
              onClick={() => setActiveTab('recetas')}
            >
              Recetas
            </button>
          </div>
        </div>
      </div>

      <div className="content-section">
        <div className="container">
          {activeTab === 'planes' && (
            <div className="planes-content">
              <h2>Nuestros Planes Nutricionales</h2>
              <div className="planes-grid">
                {planesNutricionales.map(plan => (
                  <div key={plan.id} className="plan-card">
                    <div className="plan-header">
                      <h3>{plan.name}</h3>
                      <div className="plan-price">{plan.price}</div>
                    </div>
                    <p className="plan-description">{plan.description}</p>
                    <ul className="plan-features">
                      {plan.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                    <div className="plan-duration">Duración: {plan.duration}</div>
                    <button className="btn-plan">Elegir Plan</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'consejos' && (
            <div className="consejos-content">
              <h2>Consejos Nutricionales</h2>
              <div className="consejos-grid">
                {consejosNutricionales.map((consejo, index) => (
                  <div key={index} className="consejo-card">
                    <div className="consejo-icon">{consejo.icon}</div>
                    <div className="consejo-categoria">{consejo.categoria}</div>
                    <h3>{consejo.titulo}</h3>
                    <p>{consejo.contenido}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'recetas' && (
            <div className="recetas-content">
              <h2>Recetas Saludables</h2>
              <div className="recetas-grid">
                {recetasSaludables.map((receta, index) => (
                  <div key={index} className="receta-card">
                    <h3>{receta.nombre}</h3>
                    <div className="receta-meta">
                      <span className="tiempo">⏱️ {receta.tiempo}</span>
                      <span className="dificultad">📊 {receta.dificultad}</span>
                    </div>
                    <div className="ingredientes">
                      <h4>Ingredientes:</h4>
                      <ul>
                        {receta.ingredientes.map((ingrediente, i) => (
                          <li key={i}>{ingrediente}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="preparacion">
                      <h4>Preparación:</h4>
                      <p>{receta.preparacion}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="cta-section">
        <div className="container">
          <h2>¿Necesitas un plan nutricional personalizado?</h2>
          <p>Nuestros nutricionistas certificados están listos para ayudarte</p>
          <button className="btn-primary large">Consultar Ahora</button>
        </div>
      </div>
    </div>
  );
};

export default Nutricion;






