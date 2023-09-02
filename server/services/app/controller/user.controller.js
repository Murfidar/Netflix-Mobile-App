"use strict";

class Controller {
  static async user(req, res, next) {
    try {
      res.status(200).json(req.user);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller