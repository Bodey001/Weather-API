const express = require("express");
const router = express.Router();
const weatherDataController = require("../controllers/weatherData.js");

router.post("/weather/forecast", weatherDataController.getWeatherData);

module.exports = router;