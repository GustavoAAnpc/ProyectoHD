export async function detectarConLogMeal(imageFile) {
  const API_KEY = "099dbe52ea4ccdb0b818798226c265efb7c2b1a4";

  const formData = new FormData();
  formData.append("image", imageFile);

  const res = await fetch("https://api.logmeal.com/v2/image/segmentation/complete", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
    body: formData
  });

  const data = await res.json();
  console.log("Respuesta LogMeal:", data);

  if (!data.foodItems) return [];

  return data.foodItems.map(item => item.foodName);
}
