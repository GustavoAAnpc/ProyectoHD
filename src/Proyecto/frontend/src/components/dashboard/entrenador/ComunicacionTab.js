import React from 'react';

const ComunicacionTab = ({ mensajes, onMarcarLeido }) => {
  return (
    <div className="dashboard-section">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px'}}>
        <h2>Comunicación con Clientes</h2>
      </div>
      
      <div className="data-list">
        {mensajes.length > 0 ? (
          mensajes.map(mensaje => (
            <div key={mensaje.idMensaje} className="data-item">
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start'}}>
                <div>
                  <h4>De: {mensaje.remitente?.nameUsuario}</h4>
                  <p>{mensaje.contenido}</p>
                  <span>{new Date(mensaje.fechaEnvio).toLocaleDateString()} {new Date(mensaje.fechaEnvio).toLocaleTimeString()}</span>
                </div>
                {!mensaje.leido && (
                  <span style={{
                    padding: '4px 10px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    background: '#ff8787',
                    color: 'white'
                  }}>Nuevo</span>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No hay mensajes</p>
        )}
      </div>
    </div>
  );
};

export default ComunicacionTab;

