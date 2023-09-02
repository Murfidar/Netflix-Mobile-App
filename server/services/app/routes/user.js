"use strict";

const express = require("express");
const Controller = require("../controller/user.controller");
const router = express.Router();

router.get("/", Controller.user);

module.exports = router;
