const express = require("express");
const router = express.Router();
const Controller = require("../controller/user.controller");

router.get("/", Controller.getUsers);
router.post("/", Controller.createUser);
router.get("/:id", Controller.getUserById);
router.delete("/:id", Controller.deleteUserById);

module.exports = router;
