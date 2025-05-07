const axios = require("axios");
require("dotenv").config();

const visualCrossingApiKey = process.env.VISUAL_CROSSING_API_KEY;
const visualCrossingBaseUrl =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";



//GET Weather by location and date
exports.getWeatherData = async (req, res) => {
    const { location, date1, date2, last30days } = req.body;
        
    try {
      if (!location) {
        return res.status(400).json({ message: "Unknown Location" });
      };
      if (last30days === "true") {
        const visualCrossingUrl = `${visualCrossingBaseUrl}/${location}/last30days?key=${visualCrossingApiKey}`;
        const response = await axios.get(visualCrossingUrl);
        const forecastData = response.data;
        return res.status(200).json({ message: 'Weather data for last 30 days:', forecastData });
      };
      if (!date1) {
        const visualCrossingUrl = `${visualCrossingBaseUrl}/${location}?key=${visualCrossingApiKey}`;
        const response = await axios.get(visualCrossingUrl);
        const forecastData = response.data.currentConditions;        
        return res
          .status(200)
          .json({ message: "Weather forecast for today:", forecastData });
        };
      if (!date2) {
        const visualCrossingUrl = `${visualCrossingBaseUrl}/${location}/${date1}?key=${visualCrossingApiKey}`;
        const response = await axios.get(visualCrossingUrl);
        const forecastData = response.data;        
        return res
          .status(200)
          .json({
            message: `Weather Conditions from ${date1} till date:`,
            forecastData
          });
        };
        const visualCrossingUrl = `${visualCrossingBaseUrl}/${location}/${date1}/${date2}?key=${visualCrossingApiKey}`;
        const response = await axios.get(visualCrossingUrl);
        const forecastData = response.data;
        return res.status(200).json({message: `Weather data from ${date1} till ${date2}`, forecastData});

    } catch (error) {
        console.error('Error fetching weather data from Visual Crossing: ', error);
        res.status(500).json({ error: "Failed to fetch current weather data." });
    };
};