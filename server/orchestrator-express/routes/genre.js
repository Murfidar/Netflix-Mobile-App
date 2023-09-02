"use strict";

const express = require("express");
const Controller = require("../controller/genre.controller");
const router = express.Router();

router.get("/", Controller.genre);
router.get("/:id", Controller.genreById);

module.exports = router;
