import React from 'react';

const RutinaModal = ({ rutina, selectedDia, setSelectedDia, ejerciciosRutina, onMarcarCompletado, onClose }) => {
  const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const ejerciciosHoy = selectedDia 
    ? ejerciciosRutina.filter(e => e.diaSemana === selectedDia).sort((a, b) => (a.orden || 0) - (b.orden || 0))
    : [];

  return (
    <div>
      <div style={{marginBottom: '20px'}}>
        <label style={{display: 'block', marginBottom: '10px', fontWeight: '500'}}>Seleccionar Día:</label>
        <select 
          value={selectedDia} 
          onChange={(e) => setSelectedDia(e.target.value)}
          style={{width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e8e8e8'}}
        >
          <option value="">Seleccionar día</option>
          {diasSemana.map(dia => (
            <option key={dia} value={dia}>{dia}</option>
          ))}
        </select>
      </div>

      {selectedDia && ejerciciosHoy.length > 0 ? (
        <div>
          <h4>Ejercicios para {selectedDia}</h4>
          <div className="table-container" style={{marginTop: '20px'}}>
            <table className="table">
              <thead>
                <tr>
                  <th>Ejercicio</th>
                  <th>Series</th>
                  <th>Repeticiones</th>
                  <th>Peso</th>
                  <th>Descanso</th>
                  <th>Completado</th>
                </tr>
              </thead>
              <tbody>
                {ejerciciosHoy.map(ej => (
                  <tr key={ej.idRutinaEjercicio}>
                    <td>
                      <strong>{ej.ejercicio?.nombre}</strong>
                      {ej.ejercicio?.videoUrl && (
                        <a href={ej.ejercicio.videoUrl} target="_blank" rel="noopener noreferrer" 
                          style={{marginLeft: '10px', fontSize: '12px', color: '#ff8787'}}>
                          Ver video
                        </a>
                      )}
                    </td>
                    <td>{ej.series}</td>
                    <td>{ej.repeticiones}</td>
                    <td>{ej.peso}</td>
                    <td>{ej.tiempoDescanso}</td>
                    <td>
                      <input 
                        type="checkbox" 
                        checked={ej.completado || false}
                        onChange={() => onMarcarCompletado(ej.idRutinaEjercicio, ej.completado)}
                        style={{cursor: 'pointer'}}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : selectedDia ? (
        <p>No hay ejercicios programados para {selectedDia}</p>
      ) : null}
      
      <button className="btn-secondary" onClick={onClose} style={{marginTop: '20px'}}>Cerrar</button>
    </div>
  );
};

export default RutinaModal;

