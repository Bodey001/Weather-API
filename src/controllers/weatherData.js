const axios = require("axios");
require("dotenv").config();
const redisClient = require("../../config/redisClient.js");

const visualCrossingApiKey = process.env.VISUAL_CROSSING_API_KEY;
const visualCrossingBaseUrl =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

//GET Weather by location and date
exports.getWeatherData = async (req, res) => {
  const { location, date1, date2, last30days } = req.body;

  try {
    //Invalid location
    if (!location) {
      return res.status(400).json({ message: "Unknown Location" });
    }

    //Retrieve last 30 days
    if (last30days === "true") {
      const key = `${location.toUpperCase()}last30days`;
      const value = await redisClient.get(key);

      if (!value) {
        const visualCrossingUrl = `${visualCrossingBaseUrl}/${location}/last30days?key=${visualCrossingApiKey}`;
        const response = await axios.get(visualCrossingUrl);
        const forecastData = response.data;

        const valueInString = JSON.stringify(forecastData);
        const expirationInSeconds = 24 * 60 * 60;
        //Set the key=value that expires in 24 hours
        await redisClient.set(key, valueInString, "EX", expirationInSeconds);
        return res
          .status(200)
          .json({ message: "Weather data for last 30 days:", forecastData });
      }
      const forecastData = JSON.parse(value);
      return res.status(200).json({
        message: "Weather data for last 30 days retrieved from redis:",
        forecastData,
      });
    }

    //Return current conditions if no starting date is inputted
    if (!date1) {
      const key = `${location.toUpperCase()}current`;
      const value = await redisClient.get(key);

      if (!value) {
        const visualCrossingUrl = `${visualCrossingBaseUrl}/${location}?key=${visualCrossingApiKey}`;
        const response = await axios.get(visualCrossingUrl);
        const forecastData = response.data.currentConditions;

        const valueInString = JSON.stringify(forecastData);
        const expirationInSeconds = 1 * 60 * 60;
        //Set the key=value that expires in 1 hour
        await redisClient.set(key, valueInString, "EX", expirationInSeconds);
        return res.status(200).json({
          message: `Current Conditions for ${location}:`,
          forecastData,
        });
      }

      const forecastData = JSON.parse(value); //Value in JSON
      return res.status(200).json({
        message: `Current Conditions for ${location} from redis:`,
        forecastData,
      });
    }

    //Return the weather conditions from the date1 till date
    if (!date2) {
      const key = `${location.toUpperCase()}${date1}`;
      const value = await redisClient.get(key);

      if (!value) {
        const visualCrossingUrl = `${visualCrossingBaseUrl}/${location}/${date1}?key=${visualCrossingApiKey}`;
        const response = await axios.get(visualCrossingUrl);
        const forecastData = response.data;

        const valueInString = JSON.stringify(forecastData);
        const expirationInSeconds = 24 * 60 * 60;
        //Set the key=value that expires in 24 hours
        await redisClient.set(key, valueInString, "EX", expirationInSeconds);
        return res.status(200).json({
          message: `Weather Data from ${date1} till date:`,
          forecastData,
        });
      }
      const forecastData = JSON.parse(value);
      return res.status(200).json({
        message: `Redis cached Weather Data from ${date1} till date :`,
        forecastData,
      });
    }

    // Return the weather conditions within the date range
    const key = `${location.toUpperCase()}${date1}to${date2}`;
    const value = await redisClient.get(key);

    if (!value) {
      const visualCrossingUrl = `${visualCrossingBaseUrl}/${location}/${date1}/${date2}?key=${visualCrossingApiKey}`;
      const response = await axios.get(visualCrossingUrl);
      const forecastData = response.data;

      const valueInString = JSON.stringify(forecastData);
      //Set the key=value that expires in 24 hours
      const expirationInSeconds = 24 * 60 * 60;
      await redisClient.set(key, valueInString, "EX", expirationInSeconds);
      return res.status(200).json({
        message: `Weather data from ${date1} till ${date2}`,
        forecastData,
      });
    }
    const forecastData = JSON.parse(value);
    return res.status(200).json({
      message: `Redis cached Weather data from ${date1} till ${date2}`,
      forecastData,
    });
  } catch (error) {
    console.error("Error fetching weather data from Visual Crossing:", error);
    res.status(500).json({ error: "Failed to fetch current weather data." });
  }
};
