import React, { useState, useEffect } from 'react';
import { promocionService } from '../../../services/api';

const PromocionesTab = ({ promociones, onCreate, onEdit, onDelete, onToggleActiva }) => {

  return (
    <div className="dashboard-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <h2>Gestión de Promociones</h2>
        <button className="btn-primary" onClick={() => onCreate()}>Nueva Promoción</button>
      </div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descuento (%)</th>
              <th>Fecha Inicio</th>
              <th>Fecha Fin</th>
              <th>Estado</th>
              <th>Visibilidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {promociones && promociones.length > 0 ? (
              promociones.map(promocion => (
                <tr key={promocion.idPromocion}>
                  <td>{promocion.nombre || promocion.titulo}</td>
                  <td>
                    {promocion.descuentoPorcentaje ?
                      `${promocion.descuentoPorcentaje}%` :
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
                    <div style={{ fontSize: '11px' }}>
                      {promocion.mostrarEnWeb && <span>Web </span>}
                      {promocion.mostrarEnDashboardUsuario && <span>Usuario </span>}
                      {promocion.mostrarEnDashboardEntrenador && <span>Entrenador</span>}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                      <button className="btn-secondary" style={{ fontSize: '12px', padding: '6px 12px' }}
                        onClick={() => onEdit('promocion', promocion)}>Editar</button>
                      <button className="btn-secondary" style={{ fontSize: '12px', padding: '6px 12px' }}
                        onClick={() => onToggleActiva(promocion.idPromocion, promocion.activa)}>
                        {promocion.activa ? 'Desactivar' : 'Activar'}
                      </button>
                      <button className="btn-secondary" style={{ fontSize: '12px', padding: '6px 12px' }}
                        onClick={() => onDelete('promocion', promocion.idPromocion)}>Eliminar</button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '30px' }}>No hay promociones registradas</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PromocionesTab;

