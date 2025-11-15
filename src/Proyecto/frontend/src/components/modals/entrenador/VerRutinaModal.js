import React from 'react';

const VerRutinaModal = ({ rutina, ejerciciosRutina, selectedDia, setSelectedDia, onClose }) => {
  const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const ejerciciosHoy = selectedDia 
    ? ejerciciosRutina.filter(e => e.diaSemana === selectedDia).sort((a, b) => (a.orden || 0) - (b.orden || 0))
    : [];

  return (
    <div>
      <h4>{rutina?.nombre}</h4>
      <div style={{marginBottom: '20px', marginTop: '20px'}}>
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
        <div className="table-container" style={{marginTop: '20px'}}>
          <table className="table">
            <thead>
              <tr>
                <th>Ejercicio</th>
                <th>Día</th>
                <th>Series</th>
                <th>Repeticiones</th>
                <th>Peso</th>
                <th>Descanso</th>
                <th>Orden</th>
              </tr>
            </thead>
            <tbody>
              {ejerciciosHoy.map(ej => (
                <tr key={ej.idRutinaEjercicio}>
                  <td>{ej.ejercicio?.nombre}</td>
                  <td>{ej.diaSemana}</td>
                  <td>{ej.series}</td>
                  <td>{ej.repeticiones}</td>
                  <td>{ej.peso}</td>
                  <td>{ej.tiempoDescanso}</td>
                  <td>{ej.orden}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : selectedDia ? (
        <p>No hay ejercicios programados para {selectedDia}</p>
      ) : null}
      
      {onClose && <button className="btn-secondary" onClick={onClose} style={{marginTop: '20px'}}>Cerrar</button>}
    </div>
  );
};

export default VerRutinaModal;

