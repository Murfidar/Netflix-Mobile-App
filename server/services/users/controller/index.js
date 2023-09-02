const { ObjectId } = require("mongodb");
const { getDb } = require("../config/mongoConnection");
var bcrypt = require("bcryptjs");

class Controller {
  static async findUsers(req, res, next) {
    try {
      const db = await getDb();
      const users = await db.collection("users").find().toArray();

      users.forEach((el) => delete el.password);

      res.status(200).json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
  static async findUserById(req, res, next) {
    try {
      const { id } = req.params;

      const db = await getDb();
      const user = await db
        .collection("users")
        .findOne({ _id: new ObjectId(id) });

      delete user.password;
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
  static async createUser(req, res, next) {
    try {
      let { username, email, password, role, phoneNumber, address } = req.body;
      password = bcrypt.hashSync(password, 8);

      const db = await getDb();
      db.collection("users").insertOne({
        username,
        email,
        password,
        role,
        phoneNumber,
        address,
      });
      res.status(201).json({ msg: "Success create user" });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
  static async deleteUserById(req, res, next) {
    try {
      const { id } = req.params;
      const db = await getDb();
      db.collection("users").deleteOne({ _id: new ObjectId(id) });
      res.status(201).json({ msg: "Success delete data" });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
}

module.exports = Controller;
