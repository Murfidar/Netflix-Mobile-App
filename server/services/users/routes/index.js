const express = require("express");
const router = express.Router();
const Controller = require("../controller/index");

router.get("/users", Controller.findUsers);
router.post("/users", Controller.createUser);
router.get("/users/:id", Controller.findUserById);
router.delete("/users/:id", Controller.deleteUserById);

module.exports = router;
