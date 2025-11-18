import React, { useRef, useState } from 'react';

const NutricionTab = ({ 
  planActivo, 
  foodSearch, 
  setFoodSearch, 
  foodResults, 
  alimentosConsumidos, 
  onSearch, 
  onRegistrarAlimento,
  onDetectarImagen
}) => {
  const hoy = new Date().toISOString().split('T')[0];
  const alimentosHoy = alimentosConsumidos.filter(a => a.fecha === hoy);
  const totales = alimentosHoy.reduce((acc, alimento) => ({
    calorias: acc.calorias + (alimento.calorias || 0),
    proteinas: acc.proteinas + (alimento.proteinas || 0),
    carbohidratos: acc.carbohidratos + (alimento.carbohidratos || 0),
    grasas: acc.grasas + (alimento.grasas || 0)
  }), { calorias: 0, proteinas: 0, carbohidratos: 0, grasas: 0 });

  const caloriasRecomendadas = planActivo?.caloriasDiarias || 2000;

  // ---- CÁMARA ----
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const openCamera = async () => {
    setCameraOpen(true);
    setPreviewUrl(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error("Error al abrir la cámara:", err);
    }
  };

  const takePhoto = () => {
    if (!canvasRef.current || !videoRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    ctx.drawImage(videoRef.current, 0, 0);

    canvasRef.current.toBlob((blob) => {
      if (!blob) return;
      const file = new File([blob], "captura.jpg", { type: "image/jpeg" });
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      onDetectarImagen(file);
      closeCamera();
    }, "image/jpeg", 0.95);
  };

  const closeCamera = () => {
    setCameraOpen(false);
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(t => t.stop());
    }
  };

  return (
    <div className="dashboard-section">

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <h2>Mi Plan Nutricional</h2>
      </div>

      {planActivo ? (
        <div className="data-item" style={{ marginBottom: '30px' }}>
          <h4>{planActivo.namePlan}</h4>
          <p><strong>Objetivo:</strong> {planActivo.objetivo}</p>
          <p><strong>Calorías diarias recomendadas:</strong> {planActivo.caloriasDiarias} kcal</p>
          <p>{planActivo.descripcion}</p>
          {planActivo.notasPersonalizacion && (
            <p><strong>Notas del entrenador:</strong> {planActivo.notasPersonalizacion}</p>
          )}
        </div>
      ) : (
        <p style={{ marginBottom: '30px' }}>No tienes un plan nutricional asignado</p>
      )}

      {/* --- REGISTRAR ALIMENTOS --- */}
      <div style={{ marginTop: '40px', padding: '25px', background: '#fafafa', borderRadius: '12px' }}>
        <h3>Registrar Alimentos Consumidos</h3>

        <div style={{ display: 'flex', gap: '10px', marginTop: '15px', marginBottom: '20px' }}>
          <input
            type="text"
            value={foodSearch || ""}
            onChange={(e) => setFoodSearch(e.target.value)}
            placeholder="Buscar alimento (ej: apple, chicken, rice)"
            style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #e8e8e8' }}
            onKeyPress={(e) => e.key === 'Enter' && onSearch()}
          />
          <button className="btn-primary" onClick={() => onSearch()}>Buscar</button>
          <button className="btn-secondary" onClick={openCamera}>📷</button>
        </div>

        <input 
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (!file) return;
            setPreviewUrl(URL.createObjectURL(file));
            onDetectarImagen(file);
          }}
        />

        {previewUrl && (
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <p>Imagen seleccionada:</p>
            <img src={previewUrl} alt="preview" style={{ width: "200px", borderRadius: "12px", border: "1px solid #ccc" }} />
          </div>
        )}

        {/* --- CÁMARA MODAL --- */}
        {cameraOpen && (
          <div style={{
            position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
            background: "rgba(0,0,0,0.85)", display: "flex",
            flexDirection: "column", justifyContent: "center",
            alignItems: "center", overflow: "auto", zIndex: 9999
          }}>
            <video ref={videoRef} autoPlay style={{ width: "80%", maxWidth: "500px", borderRadius: "10px" }}></video>
            <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
            <div style={{ marginTop: "20px", display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
              <button className="btn-primary" onClick={takePhoto}>Capturar</button>
              <button className="btn-secondary" onClick={closeCamera}>Cerrar</button>
            </div>
          </div>
        )}

        {/* --- RESULTADOS USDA --- */}
        {foodResults.length > 0 && (
          <div className="table-container" style={{ marginTop: '20px', maxHeight: '300px', overflowY: 'auto' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Alimento</th>
                  <th>Calorías</th>
                  <th>Proteínas</th>
                  <th>Carbohidratos</th>
                  <th>Grasas</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {foodResults.slice(0, 10).map((food, idx) => {
                  const calorias = food.foodNutrients?.find(n => n.nutrientId === 1008)?.value || 0;
                  const proteinas = food.foodNutrients?.find(n => n.nutrientId === 1003)?.value || 0;
                  const carbohidratos = food.foodNutrients?.find(n => n.nutrientId === 1005)?.value || 0;
                  const grasas = food.foodNutrients?.find(n => n.nutrientId === 1004)?.value || 0;
                  return (
                    <tr key={idx}>
                      <td>{food.description}</td>
                      <td>{calorias.toFixed(1)} kcal</td>
                      <td>{proteinas.toFixed(1)}g</td>
                      <td>{carbohidratos.toFixed(1)}g</td>
                      <td>{grasas.toFixed(1)}g</td>
                      <td>
                        <button className="btn-secondary" style={{ fontSize: '12px', padding: '6px 12px' }}
                          onClick={() => onRegistrarAlimento(food)}>Agregar</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* --- ALIMENTOS REGISTRADOS HOY --- */}
        {alimentosHoy.length > 0 && (
          <div style={{marginTop: '30px'}}>
            <h4>Alimentos Registrados Hoy</h4>
            <div className="table-container" style={{marginTop: '15px'}}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Alimento</th>
                    <th>Calorías</th>
                    <th>Proteínas</th>
                    <th>Carbohidratos</th>
                    <th>Grasas</th>
                  </tr>
                </thead>
                <tbody>
                  {alimentosHoy.map((alimento, idx) => (
                    <tr key={idx}>
                      <td>{alimento.nombre}</td>
                      <td>{alimento.calorias.toFixed(1)} kcal</td>
                      <td>{alimento.proteinas.toFixed(1)}g</td>
                      <td>{alimento.carbohidratos.toFixed(1)}g</td>
                      <td>{alimento.grasas.toFixed(1)}g</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr style={{fontWeight: 'bold', background: '#f0f0f0'}}>
                    <td>Total</td>
                    <td>{totales.calorias.toFixed(1)} kcal</td>
                    <td>{totales.proteinas.toFixed(1)}g</td>
                    <td>{totales.carbohidratos.toFixed(1)}g</td>
                    <td>{totales.grasas.toFixed(1)}g</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* BARRA DE CALORÍAS */}
            <div style={{marginTop: '20px', padding: '20px', background: '#e8f5e9', borderRadius: '8px'}}>
              <h4>Comparación con Recomendación</h4>
              <p><strong>Calorías recomendadas:</strong> {caloriasRecomendadas} kcal</p>
              <p><strong>Calorías consumidas:</strong> {totales.calorias.toFixed(1)} kcal</p>
              <p><strong>Diferencia:</strong> <span style={{ color: totales.calorias > caloriasRecomendadas ? '#d32f2f' : '#2e7d32', fontWeight: 'bold' }}>
                {totales.calorias > caloriasRecomendadas ? '+' : ''} {(totales.calorias - caloriasRecomendadas).toFixed(1)} kcal
              </span></p>
              <div style={{ width: '100%', height: '20px', background: '#ddd', borderRadius: '10px', marginTop: '10px', overflow: 'hidden' }}>
                <div style={{
                  width: `${Math.min((totales.calorias / caloriasRecomendadas) * 100, 100)}%`,
                  height: '100%',
                  background: totales.calorias > caloriasRecomendadas ? '#d32f2f' : '#4caf50',
                  transition: 'width 0.3s'
                }}></div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default NutricionTab;
