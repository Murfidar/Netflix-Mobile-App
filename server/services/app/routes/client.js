"use strict";

const express = require("express");
const Controller = require("../controller/client.controller");
const router = express.Router();

// client
router.get("/movies", Controller.getMovie);
router.get("/genres", Controller.genre);
router.get("/movies/:id", Controller.getMovieById);
router.get("/cast/:movieId", Controller.castByMovieId);

module.exports = router;
