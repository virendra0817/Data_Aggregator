const { redisClient } = require("../config/redis");
const { getCountryInfo } = require("../services/country.service");
const { getWeather } = require("../services/weather.service");
const { getAirQuality } = require("../services/airQuality.service");

async function getSummary(req, res) {
  try {
    const { country } = req.query;
    if (!country) {
      return res.status(400).json({ error: "country is required" });
    }

    const cacheKey = `summary:${country.toLowerCase()}`;

    // 1️⃣ Check Redis cache
    const cached = await redisClient.get(cacheKey);
    if (cached) {
      return res.json({ ...JSON.parse(cached), cached: true });
    }

    // 2️⃣ Call APIs
    const countryData = await getCountryInfo(country);

    const [weatherResult, airQualityResult] = await Promise.allSettled([
      getWeather(countryData.lat, countryData.lon),
      getAirQuality(countryData.lat, countryData.lon)
    ]);

    const response = {
      country: countryData.name,
      capital: countryData.capital,
      weather:
        weatherResult.status === "fulfilled"
          ? weatherResult.value
          : null,
      airQuality:
        airQualityResult.status === "fulfilled"
          ? airQualityResult.value
          : null
    };

    // 3️⃣ Store in Redis (TTL = 5 minutes)
    await redisClient.setEx(
      cacheKey,
      300,
      JSON.stringify(response)
    );

    return res.json({ ...response, cached: false });

  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: "Aggregation failed" });
  }
}

module.exports = { getSummary };
