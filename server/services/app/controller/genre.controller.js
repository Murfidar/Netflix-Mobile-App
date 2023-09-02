"use strict";

const { Genre } = require("../models");

class Controller {
  static async genre(req, res, next) {
    try {
      let data = await Genre.findAll();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async genreById(req, res, next) {
    try {
      let data = await Genre.findByPk(req.params.id);
      if (!data) throw { name: "NotFound" };
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async createGenre(req, res, next) {
    try {
      let { name } = req.body;
      let genre = await Genre.create({
        name,
      });
      res.status(201).json({ genre });
    } catch (error) {
      next(error);
    }
  }

  static async editGenre(req, res, next) {
    try {
      let { name } = req.body;
      let genre = await Genre.findByPk(req.params.id);
      genre = await genre.update({
        name,
      });

      res.status(200).json({ genre });
    } catch (error) {
      next(error);
    }
  }

  static async deleteGenre(req, res, next) {
    try {
      let genre = await Genre.findByPk(req.params.id);

      if (!genre) throw { name: "NotFound" };

      await Genre.destroy({ where: { id: req.params.id } });
      res.status(200).json({ message: "Genre success to delete" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
