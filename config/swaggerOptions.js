require("dotenv").config();
const PORT = process.env.PORT;
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Weather-API",
      version: "1.0.0",
      description: "A RESTful API to retrieve weather forecasts",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`, //Base URL
        description: "Development Server",
      },
    ],
  },
  //Path to the API docs
  apis: ["./routes/*.js"], //Location of the JSDoc comments with respect to the main file
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };
