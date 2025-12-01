import React, { useState, useEffect } from 'react';
import { ejercicioService, rutinaEjercicioService } from '../../../services/api';

const VerRutinaModal = ({ rutina, ejerciciosRutina, onClose, onSave }) => {
  const [ejerciciosDisponibles, setEjerciciosDisponibles] = useState([]);
  const [ejerciciosSeleccionados, setEjerciciosSeleccionados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  useEffect(() => {
    loadEjercicios();
  }, [rutina]);

  const loadEjercicios = async () => {
    try {
      setLoading(true);
      const response = await ejercicioService.getAll();
      const todosEjercicios = response.data;

      // Filtrar ejercicios por grupo muscular (nombre de rutina)
      const ejerciciosFiltrados = todosEjercicios.filter(
        ej => ej.grupoMuscular === rutina?.nombre
      );

      setEjerciciosDisponibles(ejerciciosFiltrados);

      // Mapear ejercicios de la rutina con sus días seleccionados
      if (ejerciciosRutina && ejerciciosRutina.length > 0) {
        const ejerciciosConDias = ejerciciosFiltrados.map(ejercicio => {
          const ejerciciosEnRutina = ejerciciosRutina.filter(
            er => er.ejercicio?.idEjercicio === ejercicio.idEjercicio
          );

          if (ejerciciosEnRutina.length > 0) {
            const dias = ejerciciosEnRutina.map(er => er.diaSemana);
            const primeraConfig = ejerciciosEnRutina[0];

            return {
              ejercicio,
              seleccionado: true,
              dias: dias,
              series: primeraConfig.series || 3,
              repeticiones: primeraConfig.repeticiones || 10,
              peso: primeraConfig.peso || '',
              tiempoDescanso: primeraConfig.tiempoDescanso || '60s',
              orden: primeraConfig.orden || 0
            };
          }

          return {
            ejercicio,
            seleccionado: false,
            dias: [],
            series: 3,
            repeticiones: 10,
            peso: '',
            tiempoDescanso: '60s',
            orden: 0
          };
        });

        setEjerciciosSeleccionados(ejerciciosConDias);
      } else {
        const ejerciciosIniciales = ejerciciosFiltrados.map(ejercicio => ({
          ejercicio,
          seleccionado: false,
          dias: [],
          series: 3,
          repeticiones: 10,
          peso: '',
          tiempoDescanso: '60s',
          orden: 0
        }));
        setEjerciciosSeleccionados(ejerciciosIniciales);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error cargando ejercicios:', error);
      setLoading(false);
    }
  };

  const toggleEjercicio = (index) => {
    const nuevosEjercicios = [...ejerciciosSeleccionados];
    nuevosEjercicios[index].seleccionado = !nuevosEjercicios[index].seleccionado;

    // Si se deselecciona, limpiar los días
    if (!nuevosEjercicios[index].seleccionado) {
      nuevosEjercicios[index].dias = [];
    }

    setEjerciciosSeleccionados(nuevosEjercicios);
  };

  const toggleDia = (index, dia) => {
    const nuevosEjercicios = [...ejerciciosSeleccionados];
    const ejercicio = nuevosEjercicios[index];

    if (ejercicio.dias.includes(dia)) {
      ejercicio.dias = ejercicio.dias.filter(d => d !== dia);
    } else {
      ejercicio.dias = [...ejercicio.dias, dia];
    }

    setEjerciciosSeleccionados(nuevosEjercicios);
  };

  const updateField = (index, field, value) => {
    const nuevosEjercicios = [...ejerciciosSeleccionados];
    nuevosEjercicios[index][field] = value;
    setEjerciciosSeleccionados(nuevosEjercicios);
  };

  const handleGuardar = async () => {
    try {
      setSaving(true);

      // Eliminar ejercicios anteriores de la rutina
      if (ejerciciosRutina && ejerciciosRutina.length > 0) {
        await Promise.all(
          ejerciciosRutina.map(er =>
            rutinaEjercicioService.delete(er.idRutinaEjercicio)
          )
        );
      }

      // Crear nuevos ejercicios para la rutina
      const ejerciciosParaGuardar = ejerciciosSeleccionados
        .filter(item => item.seleccionado && item.dias.length > 0);

      for (const item of ejerciciosParaGuardar) {
        // Crear un registro por cada día seleccionado
        for (const dia of item.dias) {
          await rutinaEjercicioService.create({
            rutina: { idRutina: rutina.idRutina },
            ejercicio: { idEjercicio: item.ejercicio.idEjercicio },
            diaSemana: dia,
            series: item.series,
            repeticiones: item.repeticiones,
            peso: item.peso,
            tiempoDescanso: item.tiempoDescanso,
            orden: item.orden
          });
        }
      }

      alert('Rutina actualizada exitosamente');
      if (onSave) onSave();
      if (onClose) onClose();
    } catch (error) {
      console.error('Error guardando rutina:', error);
      alert('Error al guardar la rutina');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Cargando ejercicios...</div>;
  }

  return (
    <div>
      <h4>{rutina?.nombre}</h4>
      <p style={{ color: '#666', marginBottom: '20px' }}>
        Selecciona los ejercicios y los días de la semana para esta rutina
      </p>

      {ejerciciosSeleccionados.length > 0 ? (
        <div style={{ marginTop: '20px' }}>
          {ejerciciosSeleccionados.map((item, index) => (
            <div
              key={item.ejercicio.idEjercicio}
              style={{
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                padding: '15px',
                marginBottom: '15px',
                background: item.seleccionado ? '#f8f9fa' : 'white'
              }}
            >
              {/* Checkbox para seleccionar ejercicio */}
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <input
                  type="checkbox"
                  checked={item.seleccionado}
                  onChange={() => toggleEjercicio(index)}
                  style={{ marginRight: '10px', width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <strong style={{ fontSize: '16px' }}>{item.ejercicio.nombre}</strong>
                {item.ejercicio.videoUrl && (
                  <a
                    href={item.ejercicio.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      marginLeft: '10px',
                      fontSize: '14px',
                      color: '#2563eb',
                      textDecoration: 'none'
                    }}
                  >
                    🎥 Ver video
                  </a>
                )}
              </div>

              {/* Configuración del ejercicio (solo si está seleccionado) */}
              {item.seleccionado && (
                <>
                  {/* Selector de días */}
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '14px' }}>
                      Frecuencia (días de la semana):
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {diasSemana.map(dia => (
                        <button
                          key={dia}
                          type="button"
                          onClick={() => toggleDia(index, dia)}
                          style={{
                            padding: '8px 12px',
                            border: item.dias.includes(dia) ? '2px solid #2563eb' : '1px solid #ddd',
                            background: item.dias.includes(dia) ? '#e3f2fd' : 'white',
                            color: item.dias.includes(dia) ? '#1976d2' : '#666',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '13px',
                            fontWeight: item.dias.includes(dia) ? '600' : '400',
                            transition: 'all 0.2s'
                          }}
                        >
                          {dia.substring(0, 3)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Configuración de series, reps, etc. */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                    <div>
                      <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '4px' }}>
                        Series
                      </label>
                      <input
                        type="number"
                        value={item.series}
                        onChange={(e) => updateField(index, 'series', parseInt(e.target.value) || 0)}
                        style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid #ddd' }}
                        min="1"
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '4px' }}>
                        Repeticiones
                      </label>
                      <input
                        type="number"
                        value={item.repeticiones}
                        onChange={(e) => updateField(index, 'repeticiones', parseInt(e.target.value) || 0)}
                        style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid #ddd' }}
                        min="1"
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '4px' }}>
                        Peso (kg)
                      </label>
                      <input
                        type="text"
                        value={item.peso}
                        onChange={(e) => updateField(index, 'peso', e.target.value)}
                        style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid #ddd' }}
                        placeholder="Ej: 20kg"
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '4px' }}>
                        Descanso
                      </label>
                      <input
                        type="text"
                        value={item.tiempoDescanso}
                        onChange={(e) => updateField(index, 'tiempoDescanso', e.target.value)}
                        style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid #ddd' }}
                        placeholder="Ej: 60s"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div style={{
          padding: '30px',
          textAlign: 'center',
          color: '#666',
          background: '#fff3cd',
          borderRadius: '8px',
          border: '1px solid #ffc107'
        }}>
          ⚠️ No hay ejercicios disponibles para el grupo muscular "{rutina?.nombre}".
          <br />
          Por favor, crea ejercicios para este grupo muscular primero.
        </div>
      )}

      <div style={{ display: 'flex', gap: '10px', marginTop: '25px' }}>
        <button
          className="btn-primary"
          onClick={handleGuardar}
          disabled={saving || ejerciciosSeleccionados.filter(e => e.seleccionado && e.dias.length > 0).length === 0}
        >
          {saving ? 'Guardando...' : 'Guardar Rutina'}
        </button>
        {onClose && (
          <button
            className="btn-secondary"
            onClick={onClose}
            disabled={saving}
          >
            Cancelar
          </button>
        )}
      </div>
    </div>
  );
};

export default VerRutinaModal;
