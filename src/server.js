const express = require('express');
const axios = require('axios');
const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 60 * 60 }); // Cache for 1 hour

const app = express();

app.get('/air-quality', async (req, res) => {
  const city = req.query.city;

  // if the response for this city is already cached
  const cachedResponse = cache.get(city);
  if (cachedResponse) {
    console.log(`Returning cached response for ${city}`);
    return res.json(cachedResponse);
  }

  // If nor then make a new API call
  try {
    const response = await axios.get(`https://api.waqi.info/feed/${city}/?token=6162fe42bbef7e13590930efa4ac710203c66590`);
    const airQualityData = response.data.data;
    console.log(`Fetched new data for ${city}`);
    // Cache the response future 
    cache.set(city, airQualityData);
    res.json(airQualityData);
  } catch (error) {
    console.error(`Error fetching data for ${city}: ${error.message}`);
    res.status(500).json({ error: `Error fetching data for ${city}` });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
