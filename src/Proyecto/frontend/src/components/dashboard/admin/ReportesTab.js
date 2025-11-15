import React from 'react';

const ReportesTab = ({ stats, pagos, membresias, alumnos, entrenadores, clases, onExport }) => {
  const pagosMes = pagos.filter(p => {
    const fecha = new Date(p.fechaPago);
    const ahora = new Date();
    return fecha.getMonth() === ahora.getMonth() && fecha.getFullYear() === ahora.getFullYear();
  });

  return (
    <div className="dashboard-section">
      <h2>Reportes y Estadísticas</h2>
      <div className="dashboard-sections" style={{marginTop: '30px'}}>
        <section className="dashboard-section">
          <h3>Reporte de Ingresos</h3>
          <p>Ingresos totales: S/ {stats.ingresos.toFixed(2)}</p>
          <p>Total de pagos: {pagos.length}</p>
          <p>Pagos del mes: {pagosMes.length}</p>
          <p>Monto del mes: S/ {pagosMes.reduce((sum, p) => sum + parseFloat(p.monto || 0), 0).toFixed(2)}</p>
          <button className="btn-secondary" onClick={() => onExport('ingresos')} style={{marginTop: '15px'}}>
            Exportar a PDF
          </button>
        </section>
        <section className="dashboard-section">
          <h3>Reporte de Asistencia</h3>
          <p>Clientes activos: {alumnos.length}</p>
          <p>Membresías activas: {membresias.filter(m => m.estado === 'Activa').length}</p>
          <p>Membresías vencidas: {membresias.filter(m => m.estado === 'Vencida').length}</p>
          <button className="btn-secondary" onClick={() => onExport('asistencia')} style={{marginTop: '15px'}}>
            Exportar a Excel
          </button>
        </section>
        <section className="dashboard-section">
          <h3>Desempeño de Entrenadores</h3>
          <p>Total entrenadores: {entrenadores.length}</p>
          <p>Clases activas: {clases.length}</p>
          <button className="btn-secondary" onClick={() => onExport('entrenadores')} style={{marginTop: '15px'}}>
            Ver Detalles
          </button>
        </section>
      </div>
    </div>
  );
};

export default ReportesTab;

