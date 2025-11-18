import React, { useState } from 'react';
import './Servicio.css';

const Servicios = () => {
  const [selectedService, setSelectedService] = useState(null);

  const serviciosDetalle = {
    entrenamiento: {
      titulo: 'Entrenamiento Personalizado',
      icon: '🏋️‍♂️',
      descripcion: 'Rutinas diseñadas específicamente para cada grupo muscular con resultados comprobados',
      tiposEntrenamiento: [
        {
          nombre: 'Entrenamiento de Piernas',
          beneficios: [
            'Fortalece cuádriceps y glúteos',
            'Mejora la estabilidad y balance',
            'Aumenta la densidad ósea',
            'Acelera el metabolismo basal'
          ],
          ejercicios: ['Sentadillas', 'Peso muerto', 'Zancadas', 'Prensa']
        },
        {
          nombre: 'Entrenamiento de Pecho',
          beneficios: [
            'Desarrolla pectorales mayores y menores',
            'Mejora la postura corporal',
            'Aumenta fuerza en empuje',
            'Fortalece el core indirectamente'
          ],
          ejercicios: ['Press de banca', 'Aperturas', 'Fondos', 'Flexiones']
        },
        {
          nombre: 'Entrenamiento de Espalda',
          beneficios: [
            'Fortalece dorsales y trapecios',
            'Corrige problemas posturales',
            'Previene dolores lumbares',
            'Mejora la fuerza de agarre'
          ],
          ejercicios: ['Dominadas', 'Remo', 'Peso muerto', 'Pulldowns']
        },
        {
          nombre: 'Entrenamiento de Brazos',
          beneficios: [
            'Desarrolla bíceps y tríceps',
            'Aumenta fuerza funcional',
            'Mejora definición muscular',
            'Fortalece antebrazos'
          ],
          ejercicios: ['Curl bíceps', 'Press francés', 'Martillo', 'Fondos']
        }
      ]
    },
    nutricion: {
      titulo: 'Planes Nutricionales',
      icon: '🥗',
      descripcion: 'Alimentación balanceada diseñada por nutricionistas certificados',
      planesNutricionales: [
        {
          nombre: 'Plan Alto en Proteínas (2000-2500 cal)',
          beneficios: [
            'Favorece el crecimiento muscular',
            'Aumenta la saciedad y reduce antojos',
            'Acelera la recuperación post-entrenamiento',
            'Mejora la composición corporal'
          ],
          alimentos: ['Pollo', 'Pescado', 'Huevos', 'Legumbres', 'Lácteos']
        },
        {
          nombre: 'Plan Bajo en Carbohidratos (1500-1800 cal)',
          beneficios: [
            'Optimiza la quema de grasa',
            'Estabiliza niveles de azúcar en sangre',
            'Reduce inflamación',
            'Mejora claridad mental'
          ],
          alimentos: ['Aguacate', 'Frutos secos', 'Vegetales', 'Carnes magras']
        },
        {
          nombre: 'Plan Balanceado Mediterráneo (1800-2200 cal)',
          beneficios: [
            'Mejora la salud cardiovascular',
            'Reduce riesgo de enfermedades crónicas',
            'Fortalece el sistema inmune',
            'Mejora la función cognitiva'
          ],
          alimentos: ['Aceite de oliva', 'Pescado', 'Frutas', 'Vegetales', 'Cereales integrales']
        },
        {
          nombre: 'Plan Vegetariano/Vegano (1600-2000 cal)',
          beneficios: [
            'Rico en antioxidantes y fibra',
            'Reduce colesterol naturalmente',
            'Mejora la digestión',
            'Fortalece articulaciones'
          ],
          alimentos: ['Legumbres', 'Tofu', 'Quinoa', 'Semillas', 'Vegetales variados']
        }
      ]
    },
    clases: {
      titulo: 'Clases Grupales',
      icon: '👥',
      descripcion: 'Variedad de disciplinas para todos los niveles y preferencias',
      tiposClases: [
        {
          nombre: 'Baile y Danza',
          disciplinas: ['Zumba', 'Salsa', 'Bachata', 'Hip Hop', 'Reggaeton Fitness'],
          beneficios: [
            'Quema hasta 600 calorías por sesión',
            'Mejora coordinación y ritmo',
            'Reduce estrés y ansiedad',
            'Fortalece sistema cardiovascular'
          ]
        },
        {
          nombre: 'Mente y Cuerpo',
          disciplinas: ['Yoga', 'Pilates', 'Meditación', 'Stretching', 'Tai Chi'],
          beneficios: [
            'Aumenta flexibilidad muscular',
            'Mejora postura y alineación',
            'Reduce tensión y estrés',
            'Fortalece core profundo'
          ]
        },
        {
          nombre: 'Alta Intensidad',
          disciplinas: ['CrossFit', 'HIIT', 'Spinning', 'Body Combat', 'Bootcamp'],
          beneficios: [
            'Quema grasa rápidamente',
            'Aumenta resistencia cardiovascular',
            'Desarrolla fuerza explosiva',
            'Mejora capacidad anaeróbica'
          ]
        },
        {
          nombre: 'Funcional y Rehabilitación',
          disciplinas: ['Entrenamiento Funcional', 'GAP', 'Stretching Terapéutico', 'Movilidad'],
          beneficios: [
            'Previene lesiones deportivas',
            'Mejora movimientos cotidianos',
            'Fortalece músculos estabilizadores',
            'Aumenta rango de movimiento'
          ]
        }
      ]
    },
    seguimiento: {
      titulo: 'Seguimiento de Progreso',
      icon: '📊',
      descripcion: 'Sistema avanzado de monitoreo y análisis de resultados',
      metricas: [
        {
          categoria: 'Composición Corporal',
          mediciones: [
            'Porcentaje de grasa corporal',
            'Masa muscular magra',
            'Índice de masa corporal (IMC)',
            'Medidas corporales (perímetros)'
          ],
          beneficios: [
            'Seguimiento preciso de cambios',
            'Ajuste personalizado de rutinas',
            'Motivación visual del progreso',
            'Detección temprana de estancamientos'
          ]
        },
        {
          categoria: 'Rendimiento Físico',
          mediciones: [
            'Fuerza máxima por ejercicio',
            'Resistencia cardiovascular',
            'Flexibilidad y movilidad',
            'Velocidad de recuperación'
          ],
          beneficios: [
            'Optimiza cargas de entrenamiento',
            'Previene sobreentrenamiento',
            'Marca objetivos realistas',
            'Celebra logros alcanzados'
          ]
        },
        {
          categoria: 'Bienestar General',
          mediciones: [
            'Calidad del sueño',
            'Niveles de energía',
            'Estado de ánimo',
            'Adherencia al plan'
          ],
          beneficios: [
            'Identifica factores de estrés',
            'Mejora calidad de vida integral',
            'Ajusta intensidad según recuperación',
            'Mantiene motivación alta'
          ]
        },
        {
          categoria: 'Nutrición y Hábitos',
          mediciones: [
            'Ingesta calórica diaria',
            'Distribución de macronutrientes',
            'Hidratación',
            'Adherencia al plan nutricional'
          ],
          beneficios: [
            'Asegura déficit/superávit adecuado',
            'Optimiza timing de nutrientes',
            'Mejora hábitos alimenticios',
            'Maximiza resultados físicos'
          ]
        }
      ]
    }
  };

  const handleSelectService = (service) => {
    setSelectedService(service);
    setTimeout(() => {
      document.getElementById('servicio-detalle')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <>
      <section className="services-section" style={{paddingTop: '100px'}}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">¿Por qué elegir FORCA & FITNESS?</h2>
            <p className="section-subtitle">Todo lo que necesitas para alcanzar tus objetivos</p>
          </div>
          <div className="services-grid">
            <div className="service-card" onClick={() => handleSelectService('entrenamiento')}>
              <div className="service-icon">🏋️‍♂️</div>
              <h3>Entrenamiento Personalizado</h3>
              <p>Rutinas diseñadas específicamente para tus objetivos con seguimiento profesional constante</p>
              <div className="service-features">
                <span className="feature-tag">Personalizado</span>
                <span className="feature-tag">Seguimiento 24/7</span>
              </div>
              <button className="service-more-btn">Ver Detalles →</button>
            </div>
            <div className="service-card" onClick={() => handleSelectService('nutricion')}>
              <div className="service-icon">🥗</div>
              <h3>Planes Nutricionales</h3>
              <p>Asesoría nutricional personalizada para complementar tu entrenamiento y maximizar resultados</p>
              <div className="service-features">
                <span className="feature-tag">Plan Personalizado</span>
                <span className="feature-tag">Tracking Calórico</span>
              </div>
              <button className="service-more-btn">Ver Detalles →</button>
            </div>
            <div className="service-card" onClick={() => handleSelectService('clases')}>
              <div className="service-icon">👥</div>
              <h3>Clases Grupales</h3>
              <p>Zumba, Spinning, Yoga, Pilates y más clases para todos los niveles. Diviértete entrenando</p>
              <div className="service-features">
                <span className="feature-tag">Diversidad</span>
                <span className="feature-tag">Comunidad</span>
              </div>
              <button className="service-more-btn">Ver Detalles →</button>
            </div>
            <div className="service-card" onClick={() => handleSelectService('seguimiento')}>
              <div className="service-icon">📊</div>
              <h3>Seguimiento de Progreso</h3>
              <p>Monitorea tu evolución física con nuestro sistema de seguimiento avanzado y métricas detalladas</p>
              <div className="service-features">
                <span className="feature-tag">Análisis Detallado</span>
                <span className="feature-tag">Reportes</span>
              </div>
              <button className="service-more-btn">Ver Detalles →</button>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Detalles del Servicio */}
      {selectedService && (
        <section id="servicio-detalle" className="service-detail-section">
          <div className="container">
            <div className="service-detail-header">
              <div className="service-detail-icon">{serviciosDetalle[selectedService].icon}</div>
              <div>
                <h2>{serviciosDetalle[selectedService].titulo}</h2>
                <p>{serviciosDetalle[selectedService].descripcion}</p>
              </div>
            </div>

            {/* Entrenamiento Personalizado */}
            {selectedService === 'entrenamiento' && (
              <div className="training-detail-grid">
                {serviciosDetalle.entrenamiento.tiposEntrenamiento.map((tipo, index) => (
                  <div key={index} className="training-card">
                    <h3>{tipo.nombre}</h3>
                    <div className="training-benefits">
                      <h4>💪 Beneficios:</h4>
                      <ul>
                        {tipo.beneficios.map((beneficio, idx) => (
                          <li key={idx}>{beneficio}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="training-exercises">
                      <h4>🎯 Ejercicios Clave:</h4>
                      <div className="exercise-tags">
                        {tipo.ejercicios.map((ejercicio, idx) => (
                          <span key={idx} className="exercise-tag">{ejercicio}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Planes Nutricionales */}
            {selectedService === 'nutricion' && (
              <div className="nutrition-detail-grid">
                {serviciosDetalle.nutricion.planesNutricionales.map((plan, index) => (
                  <div key={index} className="nutrition-card">
                    <h3>{plan.nombre}</h3>
                    <div className="nutrition-benefits">
                      <h4>✨ Beneficios:</h4>
                      <ul>
                        {plan.beneficios.map((beneficio, idx) => (
                          <li key={idx}>{beneficio}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="nutrition-foods">
                      <h4>🍽️ Alimentos Principales:</h4>
                      <div className="food-tags">
                        {plan.alimentos.map((alimento, idx) => (
                          <span key={idx} className="food-tag">{alimento}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Clases Grupales */}
            {selectedService === 'clases' && (
              <div className="classes-detail-grid">
                {serviciosDetalle.clases.tiposClases.map((tipo, index) => (
                  <div key={index} className="class-card">
                    <h3>{tipo.nombre}</h3>
                    <div className="class-disciplines">
                      <h4>💃 Disciplinas:</h4>
                      <div className="discipline-tags">
                        {tipo.disciplinas.map((disciplina, idx) => (
                          <span key={idx} className="discipline-tag">{disciplina}</span>
                        ))}
                      </div>
                    </div>
                    <div className="class-benefits">
                      <h4>🌟 Beneficios:</h4>
                      <ul>
                        {tipo.beneficios.map((beneficio, idx) => (
                          <li key={idx}>{beneficio}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Seguimiento de Progreso */}
            {selectedService === 'seguimiento' && (
              <div className="tracking-detail-grid">
                {serviciosDetalle.seguimiento.metricas.map((metrica, index) => (
                  <div key={index} className="tracking-card">
                    <h3>{metrica.categoria}</h3>
                    <div className="tracking-measurements">
                      <h4>📏 Mediciones:</h4>
                      <ul>
                        {metrica.mediciones.map((medicion, idx) => (
                          <li key={idx}>{medicion}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="tracking-benefits">
                      <h4>🎯 Ventajas:</h4>
                      <ul>
                        {metrica.beneficios.map((beneficio, idx) => (
                          <li key={idx}>{beneficio}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="service-detail-cta">
              <a href="/planes" className="btn-service-primary">Ver Planes y Precios</a>
              <button onClick={() => setSelectedService(null)} className="btn-service-secondary">
                Volver a Servicios
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Servicios;