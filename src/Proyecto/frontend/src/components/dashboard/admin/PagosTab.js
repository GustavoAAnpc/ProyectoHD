import React, { useState } from 'react';
import { pagoService } from '../../../services/api';

const PagosTab = ({ pagos, membresias, onCreate }) => {
  const [comprobante, setComprobante] = useState(null);

  const handleGenerarComprobante = async (idPago) => {
    try {
      const res = await pagoService.generarComprobante(idPago);
      setComprobante(res.data);
    } catch (error) {
      console.error('Error generando comprobante:', error);
      alert('Error al generar comprobante');
    }
  };

  const handleImprimirComprobante = () => {
    if (!comprobante) return;
    const ventana = window.open('', '_blank');
    ventana.document.write(`
      <html>
        <head><title>Comprobante de Pago</title></head>
        <body style="font-family: Arial; padding: 20px;">
          <h2>FORCA & FITNESS - Comprobante de Pago</h2>
          <p><strong>Número:</strong> ${comprobante.numeroComprobante}</p>
          <p><strong>Fecha:</strong> ${new Date(comprobante.fechaPago).toLocaleDateString()}</p>
          <p><strong>Cliente:</strong> ${comprobante.cliente}</p>
          <p><strong>Membresía:</strong> ${comprobante.membresia}</p>
          <p><strong>Monto:</strong> S/ ${parseFloat(comprobante.monto).toFixed(2)}</p>
          <p><strong>Método de Pago:</strong> ${comprobante.metodoPago}</p>
          <hr>
          <p style="text-align: center; color: #666;">Gracias por su pago</p>
        </body>
      </html>
    `);
    ventana.document.close();
    ventana.print();
  };
  return (
    <div className="dashboard-section">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px'}}>
        <h2>Registro de Pagos</h2>
        <button className="btn-primary" onClick={() => onCreate()}>Registrar Pago</button>
      </div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Cliente</th>
              <th>Membresía</th>
              <th>Monto</th>
              <th>Método</th>
              <th>Estado</th>
              <th>Comprobante</th>
            </tr>
          </thead>
          <tbody>
            {pagos.length > 0 ? (
              pagos.map(pago => (
                <tr key={pago.idPago}>
                  <td>{new Date(pago.fechaPago).toLocaleDateString()}</td>
                  <td>{pago.membresia?.alumno?.nameAlumno} {pago.membresia?.alumno?.apellidosAlumno}</td>
                  <td>{pago.membresia?.tipoMembresia?.nombre}</td>
                  <td>S/ {parseFloat(pago.monto).toFixed(2)}</td>
                  <td>{pago.metodoPago}</td>
                  <td>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '500',
                      background: pago.estado === 'Pagado' ? '#d4edda' : '#f8d7da',
                      color: pago.estado === 'Pagado' ? '#155724' : '#721c24'
                    }}>
                      {pago.estado}
                    </span>
                  </td>
                  <td>
                    <button className="btn-secondary" style={{fontSize: '12px', padding: '6px 12px'}}
                      onClick={() => handleGenerarComprobante(pago.idPago)}>Generar</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{textAlign: 'center', padding: '30px'}}>No hay pagos registrados</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {comprobante && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'var(--bg-color)',
            padding: '30px',
            borderRadius: '12px',
            maxWidth: '500px',
            width: '90%',
            border: '2px solid var(--border-color)'
          }}>
            <h3 style={{marginBottom: '20px'}}>Comprobante de Pago</h3>
            <div style={{marginBottom: '20px'}}>
              <p><strong>Número:</strong> {comprobante.numeroComprobante}</p>
              <p><strong>Fecha:</strong> {new Date(comprobante.fechaPago).toLocaleDateString()}</p>
              <p><strong>Cliente:</strong> {comprobante.cliente}</p>
              <p><strong>Membresía:</strong> {comprobante.membresia}</p>
              <p><strong>Monto:</strong> S/ {parseFloat(comprobante.monto).toFixed(2)}</p>
              <p><strong>Método:</strong> {comprobante.metodoPago}</p>
            </div>
            <div style={{display: 'flex', gap: '10px'}}>
              <button className="btn-primary" onClick={handleImprimirComprobante} style={{flex: 1}}>Imprimir</button>
              <button className="btn-secondary" onClick={() => setComprobante(null)} style={{flex: 1}}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PagosTab;

