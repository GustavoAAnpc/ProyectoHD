import React from 'react';

const EjerciciosTab = ({ ejercicios, filterGrupoMuscular, setFilterGrupoMuscular, 
  filterNivel, setFilterNivel, gruposMusculares, niveles, onEdit, onDelete, onCreate }) => {
  
  const ejerciciosFiltrados = ejercicios.filter(ej => {
    return (!filterGrupoMuscular || ej.grupoMuscular === filterGrupoMuscular) &&
           (!filterNivel || ej.nivel === filterNivel);
  });

  return (
    <div className="dashboard-section">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px'}}>
        <h2>Base de Datos de Ejercicios</h2>
        <button className="btn-primary" onClick={() => onCreate()}>Nuevo Ejercicio</button>
      </div>
      
      <div style={{display: 'flex', gap: '15px', marginBottom: '25px'}}>
        <div className="form-group" style={{flex: 1}}>
          <label>Filtrar por Grupo Muscular</label>
          <select value={filterGrupoMuscular} onChange={(e) => setFilterGrupoMuscular(e.target.value)}>
            <option value="">Todos</option>
            {gruposMusculares.map(g => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
        <div className="form-group" style={{flex: 1}}>
          <label>Filtrar por Nivel</label>
          <select value={filterNivel} onChange={(e) => setFilterNivel(e.target.value)}>
            <option value="">Todos</option>
            {niveles.map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Grupo Muscular</th>
              <th>Nivel</th>
              <th>Descripción</th>
              <th>Video</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ejerciciosFiltrados.length > 0 ? (
              ejerciciosFiltrados.map(ejercicio => (
                <tr key={ejercicio.idEjercicio}>
                  <td>{ejercicio.nombre}</td>
                  <td>{ejercicio.grupoMuscular}</td>
                  <td>{ejercicio.nivel}</td>
                  <td>{ejercicio.descripcion?.substring(0, 50)}...</td>
                  <td>
                    {ejercicio.videoUrl ? (
                      <a href={ejercicio.videoUrl} target="_blank" rel="noopener noreferrer">Ver Video</a>
                    ) : 'N/A'}
                  </td>
                  <td>
                    <button className="btn-secondary" style={{marginRight: '8px', fontSize: '12px', padding: '6px 12px'}}
                      onClick={() => onEdit(ejercicio)}>Editar</button>
                    <button className="btn-secondary" style={{fontSize: '12px', padding: '6px 12px'}}
                      onClick={() => onDelete(ejercicio.idEjercicio)}>Eliminar</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{textAlign: 'center', padding: '30px'}}>No hay ejercicios registrados</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EjerciciosTab;

