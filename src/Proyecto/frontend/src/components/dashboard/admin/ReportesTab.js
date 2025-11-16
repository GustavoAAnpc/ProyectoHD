import React, { useState, useEffect } from 'react';
import { seguimientoFisicoService, alumnoInstructorService } from '../../../services/api';

const ReportesTab = ({ stats, pagos, membresias, alumnos, entrenadores, clases, onExport }) => {
  const [reportesData, setReportesData] = useState({
    usuariosActivos: 0,
    usuariosInactivos: 0,
    membresiasPorVencer: [],
    crecimientoMensual: [],
    progresoPromedio: {},
    entrenadoresTop: []
  });

  useEffect(() => {
    calcularReportes();
  }, [pagos, membresias, alumnos, entrenadores]);

  const calcularReportes = async () => {
    try {
      // Usuarios activos/inactivos
      const usuariosActivos = alumnos.filter(a => a.usuario?.estado).length;
      const usuariosInactivos = alumnos.filter(a => !a.usuario?.estado).length;

      // Membresías próximas a vencer (próximos 30 días)
      const hoy = new Date();
      const en30Dias = new Date();
      en30Dias.setDate(hoy.getDate() + 30);
      
      const membresiasPorVencer = membresias.filter(m => {
        const fechaFin = new Date(m.fechaFin);
        return fechaFin >= hoy && fechaFin <= en30Dias && m.estado === 'Activa';
      });

      // Crecimiento mensual (últimos 6 meses)
      const crecimientoMensual = [];
      for (let i = 5; i >= 0; i--) {
        const fecha = new Date();
        fecha.setMonth(fecha.getMonth() - i);
        const mes = fecha.toLocaleString('es-ES', { month: 'long', year: 'numeric' });
        const pagosMes = pagos.filter(p => {
          const fechaPago = new Date(p.fechaPago);
          return fechaPago.getMonth() === fecha.getMonth() && 
                 fechaPago.getFullYear() === fecha.getFullYear();
        });
        crecimientoMensual.push({
          mes,
          cantidad: pagosMes.length,
          ingresos: pagosMes.reduce((sum, p) => sum + parseFloat(p.monto || 0), 0)
        });
      }

      // Progreso promedio
      const seguimientosRes = await seguimientoFisicoService.getAll();
      const seguimientos = seguimientosRes.data;
      
      if (seguimientos.length > 0) {
        const progresoPromedio = {
          peso: seguimientos.reduce((sum, s) => sum + (parseFloat(s.peso) || 0), 0) / seguimientos.length,
          grasa: seguimientos.reduce((sum, s) => sum + (parseFloat(s.grasaCorporal) || 0), 0) / seguimientos.length,
          musculo: seguimientos.reduce((sum, s) => sum + (parseFloat(s.musculo) || 0), 0) / seguimientos.length
        };
        
        setReportesData(prev => ({ ...prev, progresoPromedio }));
      }

      // Entrenadores con más usuarios
      const asignacionesRes = await alumnoInstructorService.getAll();
      const asignaciones = asignacionesRes.data;
      
      const entrenadoresTop = entrenadores.map(entrenador => {
        const alumnosAsignados = asignaciones.filter(a => 
          a.instructor?.idInstructor === entrenador.idInstructor && a.estado === 'Activo'
        ).length;
        return {
          ...entrenador,
          usuariosActivos: alumnosAsignados
        };
      }).sort((a, b) => b.usuariosActivos - a.usuariosActivos).slice(0, 5);

      setReportesData({
        usuariosActivos,
        usuariosInactivos,
        membresiasPorVencer,
        crecimientoMensual,
        entrenadoresTop
      });
    } catch (error) {
      console.error('Error calculando reportes:', error);
    }
  };

  const pagosMes = pagos.filter(p => {
    const fecha = new Date(p.fechaPago);
    const ahora = new Date();
    return fecha.getMonth() === ahora.getMonth() && fecha.getFullYear() === ahora.getFullYear();
  });

  return (
    <div className="dashboard-section">
      <h2>Panel de Reportes</h2>
      
      <div className="dashboard-sections" style={{marginTop: '30px'}}>
        <section className="dashboard-section">
          <h3>Usuarios Activos/Inactivos</h3>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px'}}>
            <div className="stat-card">
              <h4>Activos</h4>
              <p className="stat-number">{reportesData.usuariosActivos}</p>
            </div>
            <div className="stat-card">
              <h4>Inactivos</h4>
              <p className="stat-number">{reportesData.usuariosInactivos}</p>
            </div>
          </div>
        </section>

        <section className="dashboard-section">
          <h3>Membresías Próximas a Vencer (30 días)</h3>
          <p style={{fontSize: '18px', fontWeight: 'bold', marginTop: '15px'}}>
            {reportesData.membresiasPorVencer.length} membresías
          </p>
          {reportesData.membresiasPorVencer.length > 0 && (
            <div style={{marginTop: '15px', maxHeight: '200px', overflowY: 'auto'}}>
              {reportesData.membresiasPorVencer.slice(0, 10).map(m => (
                <div key={m.idMembresia} style={{padding: '10px', borderBottom: '1px solid var(--border-color)'}}>
                  <strong>{m.alumno?.nameAlumno} {m.alumno?.apellidosAlumno}</strong> - 
                  Vence: {new Date(m.fechaFin).toLocaleDateString()}
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="dashboard-section">
          <h3>Crecimiento Mensual</h3>
          <div style={{marginTop: '15px'}}>
            {reportesData.crecimientoMensual.map((item, index) => (
              <div key={index} style={{padding: '10px', borderBottom: '1px solid var(--border-color)'}}>
                <strong>{item.mes}:</strong> {item.cantidad} pagos - S/ {item.ingresos.toFixed(2)}
              </div>
            ))}
          </div>
        </section>

        <section className="dashboard-section">
          <h3>Progreso Promedio de Usuarios</h3>
          <div style={{marginTop: '15px'}}>
            <p><strong>Peso promedio:</strong> {reportesData.progresoPromedio.peso?.toFixed(2) || '0'} kg</p>
            <p><strong>Grasa corporal promedio:</strong> {reportesData.progresoPromedio.grasa?.toFixed(2) || '0'}%</p>
            <p><strong>Músculo promedio:</strong> {reportesData.progresoPromedio.musculo?.toFixed(2) || '0'} kg</p>
          </div>
        </section>

        <section className="dashboard-section">
          <h3>Entrenadores con Más Usuarios</h3>
          <div style={{marginTop: '15px'}}>
            {reportesData.entrenadoresTop.map((entrenador, index) => (
              <div key={entrenador.idInstructor} style={{padding: '10px', borderBottom: '1px solid var(--border-color)'}}>
                <strong>{index + 1}.</strong> {entrenador.namaInstructor} {entrenador.apellidosInstructor} - 
                {entrenador.usuariosActivos} usuarios activos
              </div>
            ))}
          </div>
        </section>

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
      </div>
    </div>
  );
};

export default ReportesTab;
