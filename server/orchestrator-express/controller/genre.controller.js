"use strict";
const axios = require("axios");
const appUrl = "http://localhost:4002";
const redis = require("../config/ioredis");
const redis_genres = "app:genres";


class Controller {
  static async genre(req, res, next) {
    try {
      const genreCache = await redis.get(redis_genres);

      if (genreCache) {
        const data = JSON.parse(genreCache);
        res.status(200).json(data);
      } else {
        const { data } = await axios.get(`${appUrl}/genres`);
        await redis.set(redis_genres, JSON.stringify(data), "EX", 1000);
        res.status(200).json(data);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async genreById(req, res, next) {
    try {
      const genreCache = await redis.get(`app:genre:${req.params.id}`);
      
      if (genreCache) {
        const data = JSON.parse(genreCache);
        res.status(200).json(data);
      } else {
        const { data } = await axios.get(`${appUrl}/genres/${req.params.id}`);
        if (!data) throw { name: "NotFound" };
        await redis.set(
          `app:genre:${req.params.id}`,
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
}

module.exports = Controller;
