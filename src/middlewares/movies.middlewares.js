const MovieOrSerieDB = require("../models/moviesOrSeries.model");

const isIdMSinDB = async (req, res, next) => {
  const id = req.params.id;
  const movieOrSerieDB = await MovieOrSerieDB.findOne({
    where: { id_ms: id },
  });
  if (!movieOrSerieDB) {
    return res.status(404).json({
      status: "error",
      message: "Movie or serie not found",
    });
  }
  next();
};

const isQualificationInRange = (req, res, next) => {
  const { qualification_ms } = req.body;
  if (qualification_ms < 1 || qualification_ms > 5) {
    return res.status(400).json({
      status: "error",
      message: "Qualification must be between 1 and 5",
    });
  }
  next();
};

module.exports = { isIdMSinDB, isQualificationInRange };
