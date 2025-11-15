import React from 'react';

const ProgresoTab = ({ seguimientos }) => {
  const seguimientosOrdenados = seguimientos.sort((a, b) => new Date(b.fechaRegistro) - new Date(a.fechaRegistro));

  return (
    <div className="dashboard-section">
      <h2>Mi Progreso Físico</h2>
      
      {seguimientos.length > 0 ? (
        <>
          <div className="table-container" style={{marginTop: '25px'}}>
            <table className="table">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Peso (kg)</th>
                  <th>Altura (cm)</th>
                  <th>Grasa (%)</th>
                  <th>Músculo (kg)</th>
                  <th>Pecho (cm)</th>
                  <th>Cintura (cm)</th>
                  <th>Cadera (cm)</th>
                  <th>Notas del Entrenador</th>
                </tr>
              </thead>
              <tbody>
                {seguimientosOrdenados.map(seg => (
                  <tr key={seg.idSeguimiento}>
                    <td>{new Date(seg.fechaRegistro).toLocaleDateString()}</td>
                    <td>{seg.peso || 'N/A'}</td>
                    <td>{seg.altura || 'N/A'}</td>
                    <td>{seg.grasaCorporal || 'N/A'}</td>
                    <td>{seg.musculo || 'N/A'}</td>
                    <td>{seg.medidaPecho || 'N/A'}</td>
                    <td>{seg.medidaCintura || 'N/A'}</td>
                    <td>{seg.medidaCadera || 'N/A'}</td>
                    <td>{seg.notas || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{marginTop: '40px', padding: '25px', background: '#fafafa', borderRadius: '12px'}}>
            <h3>Evolución de Peso</h3>
            <div style={{display: 'flex', alignItems: 'flex-end', gap: '10px', height: '200px', marginTop: '20px'}}>
              {seguimientos
                .filter(s => s.peso)
                .sort((a, b) => new Date(a.fechaRegistro) - new Date(b.fechaRegistro))
                .slice(-10)
                .map((seg, idx) => {
                  const pesos = seguimientos.filter(s => s.peso).map(s => s.peso);
                  const maxPeso = Math.max(...pesos);
                  const minPeso = Math.min(...pesos);
                  const altura = maxPeso !== minPeso 
                    ? ((seg.peso - minPeso) / (maxPeso - minPeso)) * 180 + 20
                    : 100;
                  return (
                    <div key={idx} style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                      <div style={{
                        width: '100%',
                        height: `${altura}px`,
                        background: '#ff8787',
                        borderRadius: '4px 4px 0 0',
                        minHeight: '20px'
                      }}></div>
                      <span style={{fontSize: '10px', marginTop: '5px', color: '#666'}}>
                        {new Date(seg.fechaRegistro).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}
                      </span>
                      <span style={{fontSize: '11px', marginTop: '2px', fontWeight: 'bold'}}>{seg.peso}kg</span>
                    </div>
                  );
                })}
            </div>
          </div>
        </>
      ) : (
        <p>No hay registros de progreso físico aún</p>
      )}
    </div>
  );
};

export default ProgresoTab;

