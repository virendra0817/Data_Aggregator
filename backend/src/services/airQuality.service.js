const axios = require("axios");

async function getAirQuality(lat, lon) {
  console.log("➡️ Calling Air Quality API");

  const response = await axios.get(
    "https://api.openaq.org/v2/latest",
    {
      params: {
        coordinates: `${lat},${lon}`,
        radius: 50000,
        limit: 5
      },
      timeout: 5000
    }
  );

  const measurements = response.data.results[0]?.measurements || [];

  const pm25 = measurements.find(m => m.parameter === "pm25")?.value ?? null;
  const pm10 = measurements.find(m => m.parameter === "pm10")?.value ?? null;

  return {
    pm25,
    pm10,
    category: pm25 ? getAQICategory(pm25) : "Unknown"
  };
}

function getAQICategory(pm25) {
  if (pm25 <= 12) return "Good";
  if (pm25 <= 35) return "Moderate";
  if (pm25 <= 55) return "Unhealthy for Sensitive Groups";
  if (pm25 <= 150) return "Unhealthy";
  return "Very Unhealthy";
}

module.exports = { getAirQuality };
