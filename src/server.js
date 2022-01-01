const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

//***********************SWAGGER**********************/
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Challenge Alkemy Node Js",
      version: "1.0.0",
    },
  },
  apis: ["./src/routes/*.routes.js"],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
//*****************************************************

module.exports = app;
