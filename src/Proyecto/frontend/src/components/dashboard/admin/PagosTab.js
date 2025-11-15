import React from 'react';

const PagosTab = ({ pagos, membresias, onCreate }) => {
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
                  <td>{pago.comprobante || 'N/A'}</td>
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
    </div>
  );
};

export default PagosTab;

