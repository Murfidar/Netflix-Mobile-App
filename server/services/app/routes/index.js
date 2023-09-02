"use strict";

const express = require("express");
const router = express.Router();

const user = require("./user");
const client = require("./client");
const movie = require("./movie");
const genre = require("./genre");
const errorHandler = require("../middlewares/error.middleware");

router.use("/client", client);
router.use("/users", user);
router.use("/movies", movie);
router.use("/genres", genre);
router.use(errorHandler);

module.exports = router;
