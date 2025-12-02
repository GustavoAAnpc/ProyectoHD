import React from 'react';

const PromocionModal = ({ formData, setFormData }) => {
  const canvasRef = React.useRef(null);
  const [generatedImage, setGeneratedImage] = React.useState(null);

  React.useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Trash+Hand&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
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

    // Usa la plantilla elegida o por defecto
    const ruta = formData.plantillaSeleccionada || "Poster.png";
    plantilla.src = `/${ruta}`;
    plantilla.crossOrigin = "Anonymous";

    const drawContent = () => {
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "left";

      ctx.font = "bold 90px 'Trash Hand', cursive";
      ctx.fillText(formData.nombre || '', 120, 330);

      ctx.font = "bold 65px 'Trash Hand', cursive";
      const inicioFmt = formatearFecha(formData.fechaInicio);
      const finFmt = formatearFecha(formData.fechaFin);
      if (inicioFmt && finFmt) ctx.fillText(`Del ${inicioFmt} al ${finFmt}`, 170, 510);

      if (formData.descuentoPorcentaje) {
        ctx.font = "bold 200px 'Trash Hand', cursive";
        ctx.fillText(formData.descuentoPorcentaje + "%", 1140, 1430);
      }

      if (formData.descripcion) {
        ctx.font = "bold 85px 'Trash Hand', cursive";
        ctx.fillText(formData.descripcion, 290, 1900);
      }

      const url = canvas.toDataURL("image/png");
      setGeneratedImage(url);
      setFormData({ ...formData, imagenUrl: url });
    };

    plantilla.onload = () => {
      ctx.drawImage(plantilla, 0, 0, canvas.width, canvas.height);
      document.fonts.ready.then(drawContent);
    };

    plantilla.onerror = () => {
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
      {/* Plantilla */}
      <div className="form-group">
        <label>Plantilla</label>
        <select
          value={formData.plantillaSeleccionada || ""}
          onChange={(e) =>
            setFormData({ ...formData, plantillaSeleccionada: e.target.value })
          }
        >
          <option value="Poster.png">General</option>
          <option value="Navidad.png">Navidad</option>
          <option value="Verano.png">Verano</option>
        </select>
      </div>

      {/* Campos existentes */}
      <div className="form-group">
        <label>Nombre *</label>
        <input value={formData.nombre || ''} onChange={(e) =>
          setFormData({ ...formData, nombre: e.target.value })} />
      </div>

      <div className="form-group">
        <label>Descripción</label>
        <textarea value={formData.descripcion || ''} onChange={(e) =>
          setFormData({ ...formData, descripcion: e.target.value })} rows="3" />
      </div>

      <div className="form-group">
        <label>Descuento Porcentaje (%) *</label>
        <input type="number" min="0" max="100" value={formData.descuentoPorcentaje || ''} onChange={(e) =>
          setFormData({ ...formData, descuentoPorcentaje: parseFloat(e.target.value) || 0 })} />
      </div>

      <div className="form-group">
        <label>Duración en Meses *</label>
        <input type="number" min="1" value={formData.duracionMeses || 1} onChange={(e) =>
          setFormData({ ...formData, duracionMeses: parseInt(e.target.value) || 1 })} />
      </div>

      <div className="form-group">
        <label>Fecha Inicio *</label>
        <input type="date" value={formData.fechaInicio || ''} onChange={(e) =>
          setFormData({ ...formData, fechaInicio: e.target.value })} />
      </div>

      <div className="form-group">
        <label>Fecha Fin *</label>
        <input type="date" value={formData.fechaFin || ''} onChange={(e) =>
          setFormData({ ...formData, fechaFin: e.target.value })} />
      </div>

      {/* Vista previa */}
      <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
        <h4>Generador de Imagen Promocional</h4>
        <br />

        <button type="button" className="btn-secondary" onClick={generarImagen}>
          Generar Vista Previa
        </button>

        {generatedImage && (
          <button type="button" className="btn-primary" onClick={descargarImagen} style={{ marginLeft: '10px' }}>
            Descargar Imagen
          </button>
        )}

        <canvas ref={canvasRef} width="1587" height="2245" style={{ display: 'none' }} />

        {generatedImage && (
          <div style={{ marginTop: '10px', textAlign: 'center' }}>
            <img src={generatedImage} style={{ maxWidth: '100%', maxHeight: '800px', border: '1px solid #ccc' }} />
          </div>
        )}
      </div>
    </>
  );
};

export default PromocionModal;
