"use strict";

const axios = require("axios");
const appUrl = "http://localhost:4002";
const redis = require("../config/ioredis");
const redis_movies = "app:movies";


class Controller {
  static async getMovies(req, res, next) {
    try {
      const movieCache = await redis.get(redis_movies);

      if (movieCache) {
        const data = JSON.parse(movieCache);
        res.status(200).json(data);
      } else {
        const { data } = await axios.get(`${appUrl}/movies`);
        await redis.set(redis_movies, JSON.stringify(data), "EX", 1000);
        res.status(200).json(data);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async movieById(req, res, next) {
    try {
      const movieCache = await redis.get(`app:movie:${req.params.id}`);

      if (movieCache) {
        const data = JSON.parse(movieCache);
        res.status(200).json(data);
      } else {
        const { data } = await axios.get(`${appUrl}/movies/${req.params.id}`);
        if (!data) throw { name: "NotFound" };
        await redis.set(
          `app:movie:${req.params.id}`,
          JSON.stringify(data),
          "EX",
          1000
        );

        res.status(200).json(data);
      }

    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async createMovie(req, res, next) {
    try {
      let {
        title,
        synopsis,
        trailerUrl,
        imgUrl,
        rating,
        authorId,
        genreId,
        cast,
      } = req.body;

      const data = await axios.post(`${appUrl}/movies`, {
        title,
        synopsis,
        trailerUrl,
        imgUrl,
        rating,
        authorId,
        genreId,
        cast,
      });

      console.log(data);
      await redis.del(redis_movies);

      res.status(201).json({ msg: "Success create movie" });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  static async deleteMovie(req, res, next) {
    try {
      await axios.delete(`${appUrl}/movies/${req.params.id}`);
      await redis.del(redis_movies);
      await redis.del(`app:movie:${req.params.id}`);

      res.status(200).json({ message: "Movie success to delete" });
    } catch (error) {
      res.status(500).json(error);
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
        cast,
      } = req.body;

      const data = await axios.put(`${appUrl}/movies/${req.params.id}`, {
        title,
        synopsis,
        trailerUrl,
        imgUrl,
        rating,
        authorId,
        genreId,
        cast,
      });

      console.log(data);

      await redis.del(redis_movies);
      await redis.del(`app:movie:${req.params.id}`);

      res.status(200).json({ msg: "movie success update" });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = Controller;
