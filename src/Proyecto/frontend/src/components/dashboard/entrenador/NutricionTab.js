import React from 'react';

const NutricionTab = ({ planes, foodSearch, setFoodSearch, foodResults, onSearch, onEdit, onCreate }) => {
  return (
    <div className="dashboard-section">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px'}}>
        <h2>Planes Nutricionales</h2>
        <button className="btn-primary" onClick={() => onCreate()}>Nuevo Plan</button>
      </div>
      
      <div className="data-list">
        {planes.length > 0 ? (
          planes.map(plan => (
            <div key={plan.idPlan} className="data-item">
              <h4>{plan.namePlan} - {plan.alumno?.nameAlumno} {plan.alumno?.apellidosAlumno}</h4>
              <p><strong>Objetivo:</strong> {plan.objetivo}</p>
              <p><strong>Calorías diarias:</strong> {plan.caloriasDiarias}</p>
              <p>{plan.descripcion}</p>
              <p><strong>Notas:</strong> {plan.notasPersonalizacion}</p>
              <span>Estado: {plan.estado}</span>
              <div style={{marginTop: '10px'}}>
                <button className="btn-secondary" onClick={() => onEdit(plan)}>Editar</button>
              </div>
            </div>
          ))
        ) : (
          <p>No hay planes nutricionales creados</p>
        )}
      </div>

      <div style={{marginTop: '40px', padding: '25px', background: '#fafafa', borderRadius: '12px'}}>
        <h3>Búsqueda de Alimentos - FoodData Central</h3>
        <div style={{display: 'flex', gap: '10px', marginTop: '15px'}}>
          <input 
            type="text" 
            value={foodSearch} 
            onChange={(e) => setFoodSearch(e.target.value)}
            placeholder="Buscar alimento..."
            style={{flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #e8e8e8'}}
          />
          <button className="btn-primary" onClick={onSearch}>Buscar</button>
        </div>
        
        {foodResults.length > 0 && (
          <div style={{marginTop: '20px'}}>
            <h4>Resultados:</h4>
            <div className="table-container" style={{marginTop: '15px'}}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Descripción</th>
                    <th>Marca</th>
                    <th>Calorías</th>
                  </tr>
                </thead>
                <tbody>
                  {foodResults.slice(0, 10).map((food, idx) => (
                    <tr key={idx}>
                      <td>{food.description}</td>
                      <td>{food.brandOwner || 'N/A'}</td>
                      <td>
                        {food.foodNutrients?.find(n => n.nutrientId === 1008)?.value || 'N/A'} kcal
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NutricionTab;

