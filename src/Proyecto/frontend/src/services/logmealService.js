/**
 * Detecta alimentos en una imagen usando LogMeal API
 * @param {File} imageFile - Archivo de imagen a analizar
 * @returns {Array<string>} - Array con los nombres de los alimentos detectados
 */
export async function detectarConLogMeal(imageFile) {
  const API_KEY = "099dbe52ea4ccdb0b818798226c265efb7c2b1a4";

  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const res = await fetch("https://api.logmeal.com/v2/image/segmentation/complete", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
      body: formData
    });

    if (!res.ok) {
      throw new Error(`Error en LogMeal API: ${res.status}`);
    }

    const data = await res.json();
    console.log("Respuesta LogMeal completa:", data);

    // Extraer alimentos de la estructura real de LogMeal
    const alimentos = extraerAlimentos(data);

    console.log("Alimentos extraídos:", alimentos);
    return alimentos;

  } catch (error) {
    console.error("Error en detectarConLogMeal:", error);
    return [];
  }
}

/**
 * Extrae los nombres de alimentos del JSON complejo de LogMeal
 * @param {Object} data - Respuesta completa de LogMeal API
 * @returns {Array<string>} - Array con nombres únicos de alimentos ordenados por probabilidad
 */
function extraerAlimentos(data) {
  const alimentosConProb = [];

  // Verificar si hay resultados de segmentación
  if (!data.segmentation_results || !Array.isArray(data.segmentation_results)) {
    return [];
  }

  // Iterar sobre cada segmento detectado
  data.segmentation_results.forEach(segment => {
    // Verificar si hay resultados de reconocimiento
    if (!segment.recognition_results || !Array.isArray(segment.recognition_results)) {
      return;
    }

    // Iterar sobre cada alimento reconocido
    segment.recognition_results.forEach(result => {
      if (result.name && result.prob) {
        alimentosConProb.push({
          nombre: result.name,
          probabilidad: result.prob
        });
      }
    });
  });

  // Si no se encontraron alimentos, retornar array vacío
  if (alimentosConProb.length === 0) {
    return [];
  }

  // Ordenar por probabilidad (mayor a menor)
  alimentosConProb.sort((a, b) => b.probabilidad - a.probabilidad);

  // Eliminar duplicados manteniendo el de mayor probabilidad
  const alimentosUnicos = [];
  const nombresVistos = new Set();

  alimentosConProb.forEach(alimento => {
    if (!nombresVistos.has(alimento.nombre)) {
      nombresVistos.add(alimento.nombre);
      alimentosUnicos.push(alimento.nombre);
    }
  });

  return alimentosUnicos;
}
