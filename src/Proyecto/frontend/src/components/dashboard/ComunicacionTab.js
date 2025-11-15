import React from 'react';

const ComunicacionTab = ({ miEntrenador, mensajes, onEnviarMensaje, onEnviarFeedback, onMarcarLeido }) => {
  return (
    <div className="dashboard-section">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px'}}>
        <h2>Comunicación</h2>
        <div style={{display: 'flex', gap: '10px'}}>
          {miEntrenador && (
            <button className="btn-primary" onClick={() => onEnviarMensaje()}>Enviar Mensaje</button>
          )}
          <button className="btn-secondary" onClick={() => onEnviarFeedback()}>Enviar Feedback</button>
        </div>
      </div>

      {miEntrenador && (
        <div style={{padding: '20px', background: '#fafafa', borderRadius: '12px', marginBottom: '30px'}}>
          <h4>Mi Entrenador</h4>
          <p><strong>{miEntrenador.namaInstructor} {miEntrenador.apellidosInstructor}</strong></p>
          <p>Teléfono: {miEntrenador.telefono || 'N/A'}</p>
          <p>Email: {miEntrenador.email || 'N/A'}</p>
        </div>
      )}

      <h3 style={{marginBottom: '20px'}}>Mensajes</h3>
      <div className="data-list">
        {mensajes.length > 0 ? (
          mensajes.map(mensaje => (
            <div 
              key={mensaje.idMensaje} 
              className="data-item" 
              style={{
                opacity: mensaje.leido ? 0.8 : 1,
                borderLeft: mensaje.leido ? 'none' : '4px solid #ff8787'
              }}
              onClick={() => !mensaje.leido && onMarcarLeido(mensaje)}
            >
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start'}}>
                <div style={{flex: 1}}>
                  <h4>{mensaje.asunto || 'Sin asunto'}</h4>
                  <p>{mensaje.contenido}</p>
                  <span>De: {mensaje.remitente?.nameUsuario}</span>
                  <span>Fecha: {new Date(mensaje.fechaEnvio).toLocaleDateString()} {new Date(mensaje.fechaEnvio).toLocaleTimeString()}</span>
                </div>
                {!mensaje.leido && (
                  <span style={{
                    padding: '4px 10px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    background: '#ff8787',
                    color: 'white',
                    fontWeight: '500'
                  }}>Nuevo</span>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No tienes mensajes</p>
        )}
      </div>
    </div>
  );
};

export default ComunicacionTab;

