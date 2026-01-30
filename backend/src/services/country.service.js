const axios = require("axios");

async function getCountryInfo(countryName) {
  console.log(`➡️ Calling REST Countries for ${countryName}`);

  const response = await axios.get(
    `https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}`,
    {
      params: { fullText: true },
      timeout: 5000
    }
  );

  console.log("✅ REST Countries responded");

  const country = response.data[0];

  return {
    name: country.name.common,
    capital: country.capital?.[0],
    lat: country.capitalInfo?.latlng?.[0],
    lon: country.capitalInfo?.latlng?.[1]
  };
}

module.exports = { getCountryInfo };
