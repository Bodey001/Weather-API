const express = require("express");
const router = express.Router();
const weatherDataController = require("../controllers/weatherData.js");

/**
* @swagger
* /weather/forecast:
*   post:
*          summary: Post some parameters to retrieve weather forecasts
*          requestBody:
*              required: true
*              content:
*                  application/json:
*                      schema:
*                          type: object
*                          properties:
*                              location:
*                                  type: string
*                                  description: The location of weather forecast
*                              date1:
*                                  type: string
*                                  description: The starting date for the forecast (YYYY-MM-DD)
*                              date2:
*                                  type: string
*                                  description: The end date for the forecast
*                              last30days:
*                                  type: string
*                                  description: true or false
*          responses:
*              400:
*                  description: Location field cannot be empty
*                  content:
*                      application/json:
*                          schema:
*                              type: object
*                              properties:
*                                  message:
*                                      type: string
*                                      example: "Unknown Location"
*              200:
*                  description: Forecast successfully retrieved
*                  content:
*                      application/json:
*                          schema:
*                              type: object
*                              properties:
*                                  message:
*                                      type: string
*                                      example: Weather Data has been retrieved
*              500:
*                  description: Internal Server Error
*                  content:
*                      application/json:
*                          schema:
*                              type: object
*                              properties:
*                                  message:
*                                      type: string
*                                      example: "Internal Server Error Something went wrong"
*/

module.exports = router.post(
  "/weather/forecast",
  weatherDataController.getWeatherData
);
