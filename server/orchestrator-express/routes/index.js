"use strict";

const express = require("express");
const router = express.Router();

const user = require("./user");
const movie = require("./movie");
const genre = require("./genre");

router.use("/users", user);
router.use("/movies", movie);
router.use("/genres", genre);

module.exports = router;
