"use strict";

const { Op } = require("sequelize");
const { Movie, Genre } = require("../models");
const getPagination = require("../helpers/pagination");

class Controller {
  // register

  static async getMovie(req, res, next) {
    try {
      let { page, size, name } = req.query;

      var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

      let { limit, offset } = getPagination(page, size);

      let data = await Movie.findAndCountAll({
        include: {
          model: Genre,
          attributes: ["id", "name"],
          required: true,
        },
        order: ["genreId"],
        limit,
        offset,
      });
      console.log("masuk");

      const { count, rows } = data;
      let movies = rows;
      let totalItems = count;

      if (condition) {
        movies = await Movie.findAll({
          include: [{ model: Genre, attributes: ["id", "name"] }],
          where: condition,
        });
        totalItems = movies.length;
      }

      const currentPage = page ? +page : 0;
      const totalPages = Math.ceil(totalItems / limit);

      data = { totalItems, movies, totalPages, currentPage };

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getMovieById(req, res, next) {
    try {
      let id = req.params.id;
      let data = await Movie.findByPk(id);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async genre(req, res, next) {
    try {
      let data = await Genre.findAll({ attributes: ["id", "name"] });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async castByMovieId(req, res, next) {
    try {
      let { movieId } = req.params;
      let data = await Cast.findAll({ where: { movieId } });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
