"use strict";

const axios = require("axios");
const appUrl = process.env.APP_URL;
const redis = require("../config/ioredis");
const redis_movies = "app:movies";
const redis_genres = "app:genres";

const typeDefs = `#graphql
  type Cast {
    id: ID
    name: String
    profilePict: String
    movieId: Int
  }

  type Genre {
    id: ID
    name: String
  }
  
  type Movie {
    id: ID
    title: String
    slug: String
    synopsis: String
    trailerUrl: String
    imgUrl: String
    rating: Int
    genreId: Int
    authorId: Int
    userMongoId: String
    Genre: Genre
    Casts: [Cast]
  }

  type Query {
    movies: [Movie]
    movie(id: ID): Movie
    genres: [Genre]
    genre(id: ID): Genre
  }

  type Msg {
    msg: String
  }

  input CastList {
    name: String
    profilePict: String
  }

  type Mutation {
    addMovie(title: String,
    synopsis: String,
    trailerUrl: String,
    imgUrl: String,
    rating: Int,
    genreId: Int,
    authorId: Int,
    userMongoId: String,
    casts: [CastList]): Msg

    editMovie(id: ID,
    title: String,
    synopsis: String,
    trailerUrl: String,
    imgUrl: String,
    rating: Int,
    genreId: Int,
    authorId: Int,
    userMongoId: String,
    casts: [CastList]): Msg

    deleteMovie(id: ID): Msg
  }
`;

const resolvers = {
  Query: {
    movies: async () => {
      const movieCache = await redis.get(redis_movies);

      if (movieCache) {
        const data = JSON.parse(movieCache);
        return data;
      } else {
        const { data } = await axios.get(`${appUrl}/movies`);
        await redis.set(redis_movies, JSON.stringify(data), "EX", 1000);
        return data;
      }
    },

    movie: async (_, args) => {
      const { id } = args;
      const movieCache = await redis.get(`app:movie:${id}`);

      if (movieCache) {
        const data = JSON.parse(movieCache);
        return data;
      } else {
        const { data } = await axios.get(`${appUrl}/movies/${id}`);
        await redis.set(`app:movie:${id}`, JSON.stringify(data), "EX", 1000);

        return data;
      }
    },

    genres: async () => {
      const genreCache = await redis.get(redis_genres);

      if (genreCache) {
        const data = JSON.parse(genreCache);
        return data;
      } else {
        const { data } = await axios.get(`${appUrl}/genres`);
        await redis.set(redis_genres, JSON.stringify(data), "EX", 1000);
        return data;
      }
    },
    genre: async (_, args) => {
      const { id } = args;

      const genreCache = await redis.get(`app:genre:${id}`);

      if (genreCache) {
        const data = JSON.parse(genreCache);
        return data;
      } else {
        const { data } = await axios.get(`${appUrl}/genres/${id}`);
        await redis.set(`app:genre:${id}`, JSON.stringify(data), "EX", 1000);
        return data;
      }
    },
  },

  Mutation: {
    addMovie: async (_, args) => {
      const {
        title,
        synopsis,
        trailerUrl,
        imgUrl,
        rating,
        authorId,
        genreId,
        userMongoId,
        casts,
      } = args;
      await axios.post(`${appUrl}/movies`, {
        title,
        synopsis,
        trailerUrl,
        imgUrl,
        rating,
        authorId,
        genreId,
        userMongoId,
        casts,
      });

      await redis.del(redis_movies);

      return { msg: "Success create movie" };
    },

    editMovie: async (_, args) => {
      const {
        id,
        title,
        synopsis,
        trailerUrl,
        imgUrl,
        rating,
        authorId,
        genreId,
        userMongoId,
        casts,
      } = args;

      await axios.put(`${appUrl}/movies/${id}`, {
        title,
        synopsis,
        trailerUrl,
        imgUrl,
        rating,
        authorId,
        genreId,
        userMongoId,
        casts,
      });

      await redis.del(redis_movies);
      await redis.del(`app:movie:${id}`);

      return { msg: "movie success update" };
    },

    deleteMovie: async (_, args) => {
      const { id } = args;
      await axios.delete(`${appUrl}/movies/${id}`);
      await redis.del(redis_movies);
      await redis.del(`app:movie:${id}`);

      return { msg: "Success delete data" };
    },
  },
};

module.exports = [typeDefs, resolvers];
