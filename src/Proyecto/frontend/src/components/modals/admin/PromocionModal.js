import React from 'react';

const PromocionModal = ({ formData, setFormData }) => {
  const canvasRef = React.useRef(null);
  const [generatedImage, setGeneratedImage] = React.useState(null);

  React.useEffect(() => {
    // Inject font
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Trash+Hand&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      // Optional: remove on unmount, but keeping it is fine too
      // document.head.removeChild(link); 
    };
  }, []);

  const formatearFecha = (fecha) => {
    if (!fecha) return "";
    const [yyyy, mm, dd] = fecha.split("-");
    const yy = yyyy.slice(2);
    return `${dd}/${mm}/${yy}`;
  };

  const generarImagen = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const plantilla = new Image();
    plantilla.src = "/Poster.png";
    plantilla.crossOrigin = "Anonymous"; // Handle CORS if needed

    const drawContent = () => {
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "left";

      // Nombre promoción (Trash Hand)
      ctx.font = "bold 90px 'Trash Hand', cursive";
      ctx.fillText(formData.nombre || '', 120, 330);

      // Fechas
      ctx.font = "bold 65px 'Trash Hand', cursive";
      const inicioFmt = formatearFecha(formData.fechaInicio);
      const finFmt = formatearFecha(formData.fechaFin);
      if (inicioFmt && finFmt) {
        ctx.fillText(`Del ${inicioFmt} al ${finFmt}`, 250, 510);
      }

      // Descuento
      if (formData.descuentoPorcentaje) {
        ctx.font = "bold 200px 'Trash Hand', cursive";
        ctx.fillText(formData.descuentoPorcentaje + "%", 1140, 1430);
      }

      // Descripción
      if (formData.descripcion) {
        ctx.font = "bold 85px 'Trash Hand', cursive";
        // Simple text wrapping or just truncate? User snippet didn't wrap.
        ctx.fillText(formData.descripcion, 290, 1900);
      }

      const url = canvas.toDataURL("image/png");
      setGeneratedImage(url);
      // IMPORTANTE: Guardar la imagen en formData para que se guarde en la base de datos
      setFormData({ ...formData, imagenUrl: url });
    };

    plantilla.onload = () => {
      ctx.drawImage(plantilla, 0, 0, canvas.width, canvas.height);
      document.fonts.ready.then(drawContent);
    };

    plantilla.onerror = () => {
      // Fallback if image fails
      ctx.fillStyle = "#333";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#fff";
      ctx.font = "bold 100px Arial";
      ctx.fillText("Poster no encontrado", 100, 200);
      document.fonts.ready.then(drawContent);
    };
  };

  const descargarImagen = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `Promocion-${formData.nombre || 'nueva'}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="form-group">
        <label>Nombre *</label>
        <input type="text" value={formData.nombre || ''}
          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} required />
      </div>
      <div className="form-group">
        <label>Descripción</label>
        <textarea value={formData.descripcion || ''}
          onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })} rows="3" />
      </div>
      <div className="form-group">
        <label>Descuento Porcentaje (%) *</label>
        <input type="number" step="0.01" min="0" max="100" value={formData.descuentoPorcentaje || ''}
          onChange={(e) => setFormData({ ...formData, descuentoPorcentaje: parseFloat(e.target.value) || 0 })} required />
      </div>
      <div className="form-group">
        <label>Fecha Inicio *</label>
        <input type="date" value={formData.fechaInicio || ''}
          onChange={(e) => setFormData({ ...formData, fechaInicio: e.target.value })} required />
      </div>
      <div className="form-group">
        <label>Fecha Fin *</label>
        <input type="date" value={formData.fechaFin || ''}
          onChange={(e) => setFormData({ ...formData, fechaFin: e.target.value })} required />
      </div>
      <div className="form-group">
        <label>
          <input type="checkbox" checked={formData.mostrarEnWeb !== false}
            onChange={(e) => setFormData({ ...formData, mostrarEnWeb: e.target.checked })} />
          Mostrar en Web
        </label>
      </div>
      <div className="form-group">
        <label>
          <input type="checkbox" checked={formData.mostrarEnDashboardUsuario !== false}
            onChange={(e) => setFormData({ ...formData, mostrarEnDashboardUsuario: e.target.checked })} />
          Mostrar en Dashboard Usuario
        </label>
      </div>
      <div className="form-group">
        <label>
          <input type="checkbox" checked={formData.mostrarEnDashboardEntrenador !== false}
            onChange={(e) => setFormData({ ...formData, mostrarEnDashboardEntrenador: e.target.checked })} />
          Mostrar en Dashboard Entrenador
        </label>
      </div>
      <div className="form-group">
        <label>
          <input type="checkbox" checked={formData.activa !== false}
            onChange={(e) => setFormData({ ...formData, activa: e.target.checked })} />
          Activa
        </label>
      </div>

      <div style={{ marginTop: '30px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
        <h4>Generador de Imagen Promocional</h4>
        <br />
        <div style={{ marginBottom: '30px' }}>
          <button type="button" className="btn-secondary" onClick={generarImagen} style={{ marginRight: '10px' }}>
            Generar Vista Previa
          </button>
          {generatedImage && (
            <button type="button" className="btn-primary" onClick={descargarImagen}>
              Descargar Imagen
            </button>
          )}
        </div>

        <canvas ref={canvasRef} width="1587" height="2245" style={{ display: 'none' }}></canvas>

        {generatedImage && (
          <div style={{ marginTop: '10px', textAlign: 'center' }}>
            <img src={generatedImage} alt="Vista previa" style={{ maxWidth: '100%', maxHeight: '800px', border: '1px solid #ccc' }} />
          </div>
        )}
      </div>
    </>
  );
};

export default PromocionModal;

