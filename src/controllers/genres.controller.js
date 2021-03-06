require("dotenv").config();
const GenreDB = require("../models/genres.model");
const fs = require("fs");
const path = require("path");

async function addGenre(req, res) {
  const data = fs.readFileSync(
    path.join(__dirname, "../images/genres_images/input/", req.file.filename)
  );
  try {
    const newGenre = await GenreDB.create({
      name_genre: req.body.name_genre,
      image_genre: data,
    });

    res.status(200).json("Added correctly");
  } catch (error) {
    console.log(error);
  }
}

async function getGenres(req, res) {
  try {
    const genres = await GenreDB.findAll();
    genres.map((img) => {
      fs.writeFileSync(
        path.join(
          __dirname,
          "../images/genres_images/output/" + img.id_genre + "imagen.png"
        ),
        img.image_genre
      );
    });
    const imagesDir = fs.readdirSync(
      path.join(__dirname, "../images/genres_images/output/")
    );

    const info = genres.map((genre) => {
      return {
        information: [
          {
            Image: `http://localhost:3090/${imagesDir.find((img) =>
              img.includes(genre.id_genre)
            )}`,
            Name: genre.name_genre,
          },
        ],
      };
    });
    res.status(200).json(info);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getGenres,
  addGenre,
};
