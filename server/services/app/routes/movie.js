"use strict";

const express = require("express");
const Controller = require("../controller/movie.controller");
const router = express.Router();

router.get("/", Controller.movie);
router.post("/", Controller.createMovie);
router.get("/:id", Controller.movieById);
router.put("/:id", Controller.editMovie);
router.delete("/:id", Controller.deleteMovie);

module.exports = router;
