"use strict";

const { Movie, User, Genre, Cast, sequelize } = require("../models");

class Controller {
  static async movie(req, res, next) {
    try {
      let data = await Movie.findAll({
        include: [{ model: Genre, attributes: ["id", "name"] }],
      });

      for (const movie of data) {
        let castList = await Cast.findAll({ where: { movieId: movie.id } });
        movie.dataValues.Casts = castList;
      }

      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async movieById(req, res, next) {
    try {
      let movieData = await Movie.findByPk(req.params.id, {
        include: [{ model: Genre, attributes: ["id", "name"] }],
      });
      let castData = await Cast.findAll({ where: { movieId: req.params.id } });

      movieData.dataValues.Casts = castData;

      res.status(200).json(movieData);
    } catch (error) {
      next(error);
    }
  }

  static async createMovie(req, res, next) {
    const t = await sequelize.transaction();
    try {
      let {
        title,
        synopsis,
        trailerUrl,
        imgUrl,
        rating,
        authorId,
        genreId,
        userMongoId,
        casts,
      } = req.body;
      let movie = await Movie.create(
        {
          title,
          synopsis,
          trailerUrl,
          imgUrl,
          rating,
          authorId,
          genreId,
          userMongoId,
        },
        { transaction: t }
      );

      casts.forEach((el) => {
        el.movieId = movie.id;
      });
      let castList = await Cast.bulkCreate(casts, { transaction: t });

      await t.commit();

      res.status(201).json({ movie, castList });
    } catch (error) {
      next(error);
      await t.rollback();
    }
  }

  static async deleteMovie(req, res, next) {
    try {
      let movie = await Movie.findByPk(req.params.id);

      if (!movie) throw { name: "NotFound" };

      await Cast.destroy({ where: { movieId: movie.id } });
      await movie.destroy();
      res.status(200).json({ message: "Movie success to delete" });
    } catch (error) {
      next(error);
    }
  }

  static async editMovie(req, res, next) {
    try {
      let {
        title,
        synopsis,
        trailerUrl,
        imgUrl,
        rating,
        authorId,
        genreId,
        userMongoId,
        casts,
      } = req.body;
      let movie = await Movie.findByPk(req.params.id);
      let slug = movie.title.replace(/\W\s|\s/g, "-").toLowerCase();
      movie = await movie.update({
        title,
        slug,
        synopsis,
        trailerUrl,
        imgUrl,
        rating,
        authorId,
        genreId,
        userMongoId,
      });

      let castData = await Cast.findAll({ where: { movieId: movie.id } });

      for (let i = 0; i < casts.length; i++) {
        await castData[i].update(casts[i]);
      }

      res.status(201).json({ msg: 'success edit movie' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
