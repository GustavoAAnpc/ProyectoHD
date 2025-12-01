import React, { useState, useEffect } from 'react';

const RutinaModal = ({ rutina, ejerciciosRutina, onMarcarCompletado, onClose }) => {
  const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const [selectedDia, setSelectedDia] = useState('');

  useEffect(() => {
    // Establecer día actual por defecto
    const today = new Date().getDay(); // 0 = Domingo, 1 = Lunes...
    // Mapear getDay() a nuestro array diasSemana
    // Domingo (0) -> Domingo (index 6)
    // Lunes (1) -> Lunes (index 0)
    const mapDay = {
      1: 'Lunes', 2: 'Martes', 3: 'Miércoles', 4: 'Jueves', 5: 'Viernes', 6: 'Sábado', 0: 'Domingo'
    };
    setSelectedDia(mapDay[today]);
  }, []);

  const ejerciciosHoy = selectedDia
    ? ejerciciosRutina.filter(e => e.diaSemana === selectedDia).sort((a, b) => (a.orden || 0) - (b.orden || 0))
    : [];

  // Función para extraer el ID del video de YouTube
  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '10px', fontWeight: '500' }}>Día de Entrenamiento:</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {diasSemana.map(dia => (
            <button
              key={dia}
              onClick={() => setSelectedDia(dia)}
              style={{
                padding: '8px 12px',
                border: selectedDia === dia ? '2px solid #2563eb' : '1px solid #ddd',
                background: selectedDia === dia ? '#e3f2fd' : 'white',
                color: selectedDia === dia ? '#1976d2' : '#666',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: selectedDia === dia ? '600' : '400',
                flex: '1 0 auto',
                textAlign: 'center'
              }}
            >
              {dia}
            </button>
          ))}
        </div>
      </div>

      {selectedDia && ejerciciosHoy.length > 0 ? (
        <div>
          <h4 style={{ marginBottom: '15px', color: '#2c3e50' }}>
            Ejercicios para {selectedDia}
            <span style={{ fontSize: '14px', fontWeight: 'normal', color: '#666', marginLeft: '10px' }}>
              ({ejerciciosHoy.length} ejercicios)
            </span>
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {ejerciciosHoy.map(ej => {
              const videoId = getYouTubeVideoId(ej.ejercicio?.videoUrl);

              return (
                <div key={ej.idRutinaEjercicio} style={{
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  padding: '15px',
                  background: ej.completado ? '#f0fff4' : 'white',
                  borderLeft: ej.completado ? '4px solid #4caf50' : '1px solid #e0e0e0',
                  transition: 'all 0.2s'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <h5 style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#333' }}>
                        {ej.ejercicio?.nombre}
                      </h5>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '10px' }}>
                        <div style={{ fontSize: '13px', color: '#666' }}>
                          <strong>Series:</strong> {ej.series}
                        </div>
                        <div style={{ fontSize: '13px', color: '#666' }}>
                          <strong>Reps:</strong> {ej.repeticiones}
                        </div>
                        <div style={{ fontSize: '13px', color: '#666' }}>
                          <strong>Peso:</strong> {ej.peso || '-'}
                        </div>
                        <div style={{ fontSize: '13px', color: '#666' }}>
                          <strong>Descanso:</strong> {ej.tiempoDescanso}
                        </div>
                      </div>

                      <label style={{
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                        marginTop: '10px',
                        userSelect: 'none'
                      }}>
                        <input
                          type="checkbox"
                          checked={ej.completado || false}
                          onChange={() => onMarcarCompletado(ej.idRutinaEjercicio, ej.completado)}
                          style={{ width: '18px', height: '18px', marginRight: '8px' }}
                        />
                        <span style={{
                          color: ej.completado ? '#2e7d32' : '#666',
                          fontWeight: ej.completado ? '600' : '400'
                        }}>
                          {ej.completado ? '¡Completado!' : 'Marcar como completado'}
                        </span>
                      </label>
                    </div>

                    {/* Video Thumbnail */}
                    {videoId && (
                      <div style={{ marginLeft: '15px', width: '120px', flexShrink: 0 }}>
                        <a
                          href={ej.ejercicio.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ display: 'block', position: 'relative', borderRadius: '6px', overflow: 'hidden' }}
                        >
                          <img
                            src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
                            alt="Video"
                            style={{ width: '100%', display: 'block' }}
                          />
                          <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            background: 'rgba(0,0,0,0.6)',
                            borderRadius: '50%',
                            width: '30px',
                            height: '30px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '12px'
                          }}>▶</div>
                        </a>
                        <div style={{ textAlign: 'center', marginTop: '4px' }}>
                          <a
                            href={ej.ejercicio.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ fontSize: '11px', color: '#2563eb', textDecoration: 'none' }}
                          >
                            Ver video
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : selectedDia ? (
        <div style={{
          padding: '40px',
          textAlign: 'center',
          background: '#f8f9fa',
          borderRadius: '8px',
          color: '#666'
        }}>
          <p style={{ fontSize: '16px', marginBottom: '5px' }}>💤 Descanso</p>
          <p>No hay ejercicios programados para este día.</p>
        </div>
      ) : null}

      <button className="btn-secondary" onClick={onClose} style={{ marginTop: '20px', width: '100%' }}>Cerrar</button>
    </div>
  );
};

export default RutinaModal;
