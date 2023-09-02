"use strict";

const express = require("express");
const Controller = require("../controller/genre.controller");
const router = express.Router();

router.get("/", Controller.genre);
router.post("/", Controller.createGenre);
router.get("/:id", Controller.genreById);
router.put("/:id", Controller.editGenre);
router.delete("/:id", Controller.deleteGenre);

module.exports = router;
