import React, { useState, useEffect } from 'react';
import { promocionService } from '../../../services/api';

const PromocionesTab = ({ promociones, onCreate, onEdit, onDelete }) => {
  const [promocionesList, setPromocionesList] = useState([]);

  useEffect(() => {
    loadPromociones();
  }, []);

  const loadPromociones = async () => {
    try {
      const res = await promocionService.getAll();
      setPromocionesList(res.data);
    } catch (error) {
      console.error('Error cargando promociones:', error);
    }
  };

  const handleToggleActiva = async (promocion) => {
    try {
      await promocionService.update(promocion.idPromocion, {
        ...promocion,
        activa: !promocion.activa
      });
      loadPromociones();
    } catch (error) {
      console.error('Error actualizando promoción:', error);
      alert('Error al actualizar promoción');
    }
  };

  return (
    <div className="dashboard-section">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px'}}>
        <h2>Gestión de Promociones</h2>
        <button className="btn-primary" onClick={() => onCreate()}>Nueva Promoción</button>
      </div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Tipo</th>
              <th>Descuento</th>
              <th>Fecha Inicio</th>
              <th>Fecha Fin</th>
              <th>Estado</th>
              <th>Visibilidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {promocionesList.length > 0 ? (
              promocionesList.map(promocion => (
                <tr key={promocion.idPromocion}>
                  <td>{promocion.titulo}</td>
                  <td>{promocion.tipoPromocion}</td>
                  <td>
                    {promocion.descuentoPorcentaje ? 
                      `${promocion.descuentoPorcentaje}%` : 
                      promocion.descuentoMonto ? 
                      `S/ ${parseFloat(promocion.descuentoMonto).toFixed(2)}` : 
                      'N/A'}
                  </td>
                  <td>{new Date(promocion.fechaInicio).toLocaleDateString()}</td>
                  <td>{new Date(promocion.fechaFin).toLocaleDateString()}</td>
                  <td>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '500',
                      background: promocion.activa ? '#d4edda' : '#f8d7da',
                      color: promocion.activa ? '#155724' : '#721c24'
                    }}>
                      {promocion.activa ? 'Activa' : 'Inactiva'}
                    </span>
                  </td>
                  <td>
                    <div style={{fontSize: '11px'}}>
                      {promocion.mostrarEnWeb && <span>Web </span>}
                      {promocion.mostrarEnDashboardUsuario && <span>Usuario </span>}
                      {promocion.mostrarEnDashboardEntrenador && <span>Entrenador</span>}
                    </div>
                  </td>
                  <td>
                    <div style={{display: 'flex', gap: '5px', flexWrap: 'wrap'}}>
                      <button className="btn-secondary" style={{fontSize: '12px', padding: '6px 12px'}}
                        onClick={() => onEdit('promocion', promocion)}>Editar</button>
                      <button className="btn-secondary" style={{fontSize: '12px', padding: '6px 12px'}}
                        onClick={() => handleToggleActiva(promocion)}>
                        {promocion.activa ? 'Desactivar' : 'Activar'}
                      </button>
                      <button className="btn-secondary" style={{fontSize: '12px', padding: '6px 12px'}}
                        onClick={() => onDelete('promocion', promocion.idPromocion)}>Eliminar</button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{textAlign: 'center', padding: '30px'}}>No hay promociones registradas</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PromocionesTab;

