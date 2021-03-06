const express = require("express");
const cors = require("cors");
const db = require("./models/Relations");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync().then(() => {
  console.log("DB has been created successfully.");
});

const authRoutes = require("./routes/auth.routes");
const charactersRoutes = require("./routes/character.routes");
const moviesRoutes = require("./routes/movies.routes");
const characterMovieRoutes = require("./routes/table.character.movies.routes");
const genreRoutes = require("./routes/genre.routes");

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
app.use("/auth", authRoutes);
app.use("/characters", charactersRoutes);
app.use("/movies", moviesRoutes);
app.use("/character_movies", characterMovieRoutes);
app.use("/genres", genreRoutes);

module.exports = app;
