const axios = require("axios");

async function getWeather(lat, lon) {
  if (!lat || !lon) {
    throw new Error("Coordinates missing");
  }

  const response = await axios.get(
    "https://api.openweathermap.org/data/2.5/weather",
    {
      params: {
        lat,
        lon,
        appid: process.env.OPENWEATHER_API_KEY,
        units: "metric"
      },
      timeout: 5000
    }
  );

  return {
    temperature: response.data.main.temp,
    feelsLike: response.data.main.feels_like,
    condition: response.data.weather[0].description
  };
}

module.exports = { getWeather };
