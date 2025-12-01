import React from 'react';

const EjercicioModal = ({ formData, setFormData }) => {
  const ejerciciosPorGrupo = {
    'Pecho': [
      'Press de banca',
      'Press inclinado',
      'Aperturas con mancuernas',
      'Fondos en paralelas',
      'Flexiones'
    ],
    'Espalda': [
      'Dominadas',
      'Remo con barra',
      'Remo con mancuerna',
      'Jalón al pecho',
      'Peso muerto rumano'
    ],
    'Hombros': [
      'Press militar',
      'Elevaciones laterales',
      'Elevaciones frontales',
      'Remo al cuello',
      'Face pulls'
    ],
    'Brazos': [
      'Curl de bíceps con barra',
      'Curl de bíceps alternado',
      'Extensión de tríceps en polea',
      'Fondos de tríceps',
      'Press cerrado'
    ],
    'Piernas': [
      'Sentadilla',
      'Prensa de piernas',
      'Zancadas',
      'Peso muerto sumo',
      'Elevación de talones (gemelos)'
    ],
    'Core': [
      'Plancha',
      'Crunch',
      'Elevación de piernas',
      'Russian twist',
      'Mountain climbers'
    ],
    'Cardio': [
      'Cinta de correr',
      'Bicicleta estática',
      'Elíptica',
      'Remo ergométrico',
      'Saltar soga'
    ]
  };

  // Función para extraer el ID del video de YouTube
  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYouTubeVideoId(formData.videoUrl);

  return (
    <>
      <div className="form-group">
        <label>Grupo Muscular *</label>
        <select
          value={formData.grupoMuscular || ''}
          onChange={(e) => {
            setFormData({
              ...formData,
              grupoMuscular: e.target.value,
              nombre: '' // Resetear el nombre cuando cambia el grupo
            });
          }}
          required
        >
          <option value="">Seleccionar grupo muscular</option>
          <option value="Pecho">Pecho</option>
          <option value="Espalda">Espalda</option>
          <option value="Hombros">Hombros</option>
          <option value="Brazos">Brazos</option>
          <option value="Piernas">Piernas</option>
          <option value="Core">Core</option>
          <option value="Cardio">Cardio</option>
        </select>
      </div>

      {formData.grupoMuscular && (
        <div className="form-group">
          <label>Nombre del Ejercicio *</label>
          <select
            value={formData.nombre || ''}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            required
          >
            <option value="">Seleccionar ejercicio</option>
            {ejerciciosPorGrupo[formData.grupoMuscular]?.map((ejercicio, index) => (
              <option key={index} value={ejercicio}>{ejercicio}</option>
            ))}
          </select>
        </div>
      )}

      <div className="form-group">
        <label>Descripción</label>
        <textarea
          value={formData.descripcion || ''}
          onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
          rows="4"
          placeholder="Instrucciones de ejecución, consejos, etc."
        />
      </div>

      <div className="form-group">
        <label>Nivel</label>
        <select
          value={formData.nivel || ''}
          onChange={(e) => setFormData({ ...formData, nivel: e.target.value })}
        >
          <option value="">Seleccionar nivel</option>
          <option value="Principiante">Principiante</option>
          <option value="Intermedio">Intermedio</option>
          <option value="Avanzado">Avanzado</option>
        </select>
      </div>

      <div className="form-group">
        <label>URL del Video (YouTube)</label>
        <input
          type="url"
          value={formData.videoUrl || ''}
          onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
          placeholder="https://www.youtube.com/watch?v=..."
        />
        <small style={{ color: '#666', display: 'block', marginTop: '5px' }}>
          Pega el enlace de YouTube del ejercicio
        </small>
      </div>

      {/* Previsualización del video */}
      {formData.videoUrl && (
        <div className="form-group">
          <label>Vista Previa del Video</label>
          {videoId ? (
            <div style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              overflow: 'hidden',
              marginTop: '10px'
            }}>
              <a
                href={formData.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  position: 'relative',
                  textDecoration: 'none'
                }}
              >
                <img
                  src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
                  alt="Vista previa del video"
                  style={{
                    width: '100%',
                    display: 'block',
                    maxWidth: '320px'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  background: 'rgba(0,0,0,0.7)',
                  borderRadius: '50%',
                  width: '60px',
                  height: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '24px'
                }}>
                  ▶
                </div>
              </a>
              <div style={{
                padding: '10px',
                background: '#f5f5f5',
                fontSize: '14px'
              }}>
                <a
                  href={formData.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#2563eb',
                    textDecoration: 'none',
                    fontWeight: '500'
                  }}
                >
                  🎥 Ver video en YouTube →
                </a>
              </div>
            </div>
          ) : (
            <div style={{
              padding: '15px',
              background: '#fff3cd',
              border: '1px solid #ffc107',
              borderRadius: '4px',
              color: '#856404',
              marginTop: '10px'
            }}>
              ⚠️ URL de YouTube no válida
            </div>
          )}
        </div>
      )}

      {!formData.videoUrl && (
        <div style={{
          padding: '12px',
          background: '#f8f9fa',
          border: '1px solid #dee2e6',
          borderRadius: '4px',
          color: '#6c757d',
          fontSize: '14px',
          marginTop: '10px'
        }}>
          📹 Video: No disponible
        </div>
      )}
    </>
  );
};

export default EjercicioModal;
