import React from 'react';

const NutricionTab = ({ 
  planActivo, 
  foodSearch, 
  setFoodSearch, 
  foodResults, 
  alimentosConsumidos, 
  onSearch, 
  onRegistrarAlimento 
}) => {
  const hoy = new Date().toISOString().split('T')[0];
  const alimentosHoy = alimentosConsumidos.filter(a => a.fecha === hoy);
  const totales = alimentosHoy.reduce((acc, alimento) => ({
    calorias: acc.calorias + (alimento.calorias || 0),
    proteinas: acc.proteinas + (alimento.proteinas || 0),
    carbohidratos: acc.carbohidratos + (alimento.carbohidratos || 0),
    grasas: acc.grasas + (alimento.grasas || 0)
  }), { calorias: 0, proteinas: 0, carbohidratos: 0, grasas: 0 });
  const caloriasRecomendadas = planActivo?.caloriasDiarias || 2000;

  return (
    <div className="dashboard-section">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px'}}>
        <h2>Mi Plan Nutricional</h2>
      </div>
      
      {planActivo ? (
        <div className="data-item" style={{marginBottom: '30px'}}>
          <h4>{planActivo.namePlan}</h4>
          <p><strong>Objetivo:</strong> {planActivo.objetivo}</p>
          <p><strong>Calorías diarias recomendadas:</strong> {planActivo.caloriasDiarias} kcal</p>
          <p>{planActivo.descripcion}</p>
          {planActivo.notasPersonalizacion && (
            <p><strong>Notas del entrenador:</strong> {planActivo.notasPersonalizacion}</p>
          )}
        </div>
      ) : (
        <p style={{marginBottom: '30px'}}>No tienes un plan nutricional asignado</p>
      )}

      <div style={{marginTop: '40px', padding: '25px', background: '#fafafa', borderRadius: '12px'}}>
        <h3>Registrar Alimentos Consumidos</h3>
        <div style={{display: 'flex', gap: '10px', marginTop: '15px', marginBottom: '20px'}}>
          <input
            type="text"
            value={foodSearch}
            onChange={(e) => setFoodSearch(e.target.value)}
            placeholder="Buscar alimento (ej: apple, chicken, rice)"
            style={{flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #e8e8e8'}}
            onKeyPress={(e) => e.key === 'Enter' && onSearch()}
          />
          <button className="btn-primary" onClick={onSearch}>Buscar</button>
        </div>

        {foodResults.length > 0 && (
          <div className="table-container" style={{marginTop: '20px', maxHeight: '300px', overflowY: 'auto'}}>
            <table className="table">
              <thead>
                <tr>
                  <th>Alimento</th>
                  <th>Calorías</th>
                  <th>Proteínas</th>
                  <th>Carbohidratos</th>
                  <th>Grasas</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {foodResults.slice(0, 10).map((food, idx) => {
                  const calorias = food.foodNutrients?.find(n => n.nutrientId === 1008)?.value || 0;
                  const proteinas = food.foodNutrients?.find(n => n.nutrientId === 1003)?.value || 0;
                  const carbohidratos = food.foodNutrients?.find(n => n.nutrientId === 1005)?.value || 0;
                  const grasas = food.foodNutrients?.find(n => n.nutrientId === 1004)?.value || 0;
                  return (
                    <tr key={idx}>
                      <td>{food.description}</td>
                      <td>{calorias.toFixed(1)} kcal</td>
                      <td>{proteinas.toFixed(1)}g</td>
                      <td>{carbohidratos.toFixed(1)}g</td>
                      <td>{grasas.toFixed(1)}g</td>
                      <td>
                        <button className="btn-secondary" style={{fontSize: '12px', padding: '6px 12px'}}
                          onClick={() => onRegistrarAlimento(food)}>Agregar</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {alimentosHoy.length > 0 && (
          <div style={{marginTop: '30px'}}>
            <h4>Alimentos Registrados Hoy</h4>
            <div className="table-container" style={{marginTop: '15px'}}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Alimento</th>
                    <th>Calorías</th>
                    <th>Proteínas</th>
                    <th>Carbohidratos</th>
                    <th>Grasas</th>
                  </tr>
                </thead>
                <tbody>
                  {alimentosHoy.map((alimento, idx) => (
                    <tr key={idx}>
                      <td>{alimento.nombre}</td>
                      <td>{alimento.calorias.toFixed(1)} kcal</td>
                      <td>{alimento.proteinas.toFixed(1)}g</td>
                      <td>{alimento.carbohidratos.toFixed(1)}g</td>
                      <td>{alimento.grasas.toFixed(1)}g</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr style={{fontWeight: 'bold', background: '#f0f0f0'}}>
                    <td>Total</td>
                    <td>{totales.calorias.toFixed(1)} kcal</td>
                    <td>{totales.proteinas.toFixed(1)}g</td>
                    <td>{totales.carbohidratos.toFixed(1)}g</td>
                    <td>{totales.grasas.toFixed(1)}g</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div style={{marginTop: '20px', padding: '20px', background: '#e8f5e9', borderRadius: '8px'}}>
              <h4>Comparación con Recomendación</h4>
              <p><strong>Calorías recomendadas:</strong> {caloriasRecomendadas} kcal</p>
              <p><strong>Calorías consumidas:</strong> {totales.calorias.toFixed(1)} kcal</p>
              <p><strong>Diferencia:</strong> 
                <span style={{
                  color: totales.calorias > caloriasRecomendadas ? '#d32f2f' : '#2e7d32',
                  fontWeight: 'bold'
                }}>
                  {totales.calorias > caloriasRecomendadas ? '+' : ''}
                  {(totales.calorias - caloriasRecomendadas).toFixed(1)} kcal
                </span>
              </p>
              <div style={{
                width: '100%',
                height: '20px',
                background: '#ddd',
                borderRadius: '10px',
                marginTop: '10px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${Math.min((totales.calorias / caloriasRecomendadas) * 100, 100)}%`,
                  height: '100%',
                  background: totales.calorias > caloriasRecomendadas ? '#d32f2f' : '#4caf50',
                  transition: 'width 0.3s'
                }}></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NutricionTab;

