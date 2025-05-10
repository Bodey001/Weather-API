const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT;
const { swaggerSpec, swaggerUi } = require("../config/swaggerOptions.js");

const app = express();
app.use(express.json());

const weatherDataRoutes = require("./routes/weatherData.js");
app.use(weatherDataRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, async (req, res) => {
  try {
    console.log(`Server is running on https://localhost:${PORT}`);
  } catch (error) {
    console.error(error);
  }
});
