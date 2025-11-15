import React from 'react';

const MembresiaTab = ({ membresiaActiva, pagos }) => {
  const pagosOrdenados = pagos.sort((a, b) => new Date(b.fechaPago) - new Date(a.fechaPago));

  return (
    <div className="dashboard-section">
      <h2>Mi Membresía</h2>
      {membresiaActiva ? (
        <div className="data-item" style={{marginBottom: '30px'}}>
          <h4>{membresiaActiva.tipoMembresia?.nombre}</h4>
          <p><strong>Fecha Inicio:</strong> {new Date(membresiaActiva.fechaInicio).toLocaleDateString()}</p>
          <p><strong>Fecha Fin:</strong> {new Date(membresiaActiva.fechaFin).toLocaleDateString()}</p>
          <p><strong>Estado:</strong> 
            <span style={{
              padding: '4px 10px',
              borderRadius: '4px',
              marginLeft: '10px',
              fontSize: '12px',
              fontWeight: '500',
              background: membresiaActiva.estado === 'Activa' ? '#d4edda' : '#f8d7da',
              color: membresiaActiva.estado === 'Activa' ? '#155724' : '#721c24'
            }}>
              {membresiaActiva.estado}
            </span>
          </p>
          {new Date(membresiaActiva.fechaFin) < new Date() && (
            <p style={{color: '#d32f2f', marginTop: '10px', fontWeight: 'bold'}}>
              ⚠️ Tu membresía ha vencido
            </p>
          )}
        </div>
      ) : (
        <p style={{marginBottom: '30px'}}>No tienes una membresía activa</p>
      )}

      <h3 style={{marginTop: '40px', marginBottom: '20px'}}>Historial de Pagos</h3>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Membresía</th>
              <th>Monto</th>
              <th>Método</th>
              <th>Estado</th>
              <th>Comprobante</th>
            </tr>
          </thead>
          <tbody>
            {pagosOrdenados.length > 0 ? (
              pagosOrdenados.map(pago => (
                <tr key={pago.idPago}>
                  <td>{new Date(pago.fechaPago).toLocaleDateString()}</td>
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
                <td colSpan="6" style={{textAlign: 'center', padding: '30px'}}>No hay pagos registrados</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MembresiaTab;

