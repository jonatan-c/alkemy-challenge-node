const { Router } = require("express");
const router = Router();

const { auth } = require("../middlewares/auth.middlewares");
const {
  isIdMSinDB,
  isQualificationInRange,
} = require("../middlewares/movies.middlewares");

const {
  getMovie,
  getMovieQuery,
  addMovie,
  editMovie,
  deleteMovie,
} = require("../controllers/movies.controller");

const fs = require("fs");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../images/moviesOrSerie_images/input"),
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});
const upload = multer({ storage });

router.get("/", auth, getMovieQuery);
router.get("/:id", auth, isIdMSinDB, getMovie); // funciona, no midificar
router.post(
  "/",
  auth,
  upload.single("image_ms"),
  isQualificationInRange,
  addMovie
);
router.put("/:id", auth, isIdMSinDB, editMovie);
router.delete("/:id", auth, isIdMSinDB, deleteMovie);
module.exports = router;

/**
 * @swagger
 * /movies:
 *  get:
 *    tags:
 *      - Movies or Series
 *    summary: Get all movies or series
 *    description: Get all movies or series
 *    parameters:
 *    - name : x-auth-token
 *      value :
 *      required : true
 *      dataType : string
 *      in : header
 *    - in: query
 *      name: name
 *      description:  name of the movie or serie
 *      required: false
 *      schema:
 *        type: string
 *    - in: query
 *      name: genre
 *      description: genre of the movies or series
 *      required: false
 *      schema:
 *        type: string
 *    - in: query
 *      name: order
 *      description: order of the movies or series
 *      required: false
 *      schema:
 *        type: string
 *    responses:
 *      200:
 *        description: Success
 */

/**
 * @swagger
 * /movies/{id}:
 *  get:
 *    tags:
 *      - Movies or Series
 *    summary: Get a movie or serie
 *    description: Get a movie or serie
 *    parameters:
 *    - name : x-auth-token
 *      value :
 *      required : true
 *      dataType : string
 *      in : header
 *    - name: id
 *      description: id of the movie or serie
 *      in: path
 *      required: true
 *      type: integer
 *    responses:
 *      200:
 *        description: Success
 */

/**
 * @swagger
 * /movies:
 *  post:
 *    tags:
 *      - Movies or Series
 *    summary: Add a movie or serie
 *    description: Add a movie or serie
 *    parameters:
 *    - name : x-auth-token
 *      value :
 *      required : true
 *      dataType : string
 *      in : header
 *    - name: title_ms
 *      description: title of the movie or serie
 *      in: formData
 *      required: true
 *      type: string
 *    - name : creation_date_ms
 *      description: creation date of the movie or serie
 *      in: formData
 *      required: true
 *      type: integer
 *    - name : qualification_ms
 *      description: qualification of the movie or serie
 *      in: formData
 *      required: true
 *      type: integer
 *    - name : id_genre
 *      description: if of genre
 *      in: formData
 *      required: false
 *      type: integer
 *    - name : image_ms
 *      description: image of the movie or serie
 *      in: formData
 *      required: true
 *      type: file
 *    responses:
 *      200:
 *        description: Success
 */

/**
 * @swagger
 * /movies/{id}:
 *  put:
 *    tags:
 *      - Movies or Series
 *    summary: Edit a movie or serie
 *    description: Edit a movie or serie
 *    parameters:
 *    - name : x-auth-token
 *      value :
 *      required : true
 *      dataType : string
 *      in : header
 *    - name: id
 *      description: id of the movie or serie
 *      in: path
 *      required: true
 *      type: integer
 *    - name: title_ms
 *      description: title of the movie or serie
 *      in: formData
 *      required: true
 *      type: string
 *    - name : creation_date_ms
 *      description: creation date of the movie or serie
 *      in: formData
 *      required: true
 *      type: integer
 *    - name : qualification_ms
 *      description: qualification of the movie or serie
 *      in: formData
 *      required: true
 *      type: integer
 *    - name : id_genre
 *      description: if of genre
 *      in: formData
 *      required: false
 *      type: integer
 *    responses:
 *      200:
 *        description: Success
 */

/**
 * @swagger
 * /movies/{id}:
 *  delete:
 *    tags:
 *      - Movies or Series
 *    summary: Delete a movie or serie
 *    description:  Delete a movie or serie
 *    parameters:
 *    - name : x-auth-token
 *      value :
 *      required : true
 *      dataType : string
 *      in : header
 *    - name: id
 *      description: id of the movie or serie
 *      in: path
 *      required: true
 *      type: integer
 *    responses:
 *      200:
 *        description: Success
 */
