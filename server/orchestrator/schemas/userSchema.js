"use strict";

const axios = require("axios");
const usersUrl = process.env.USER_URL;
const redis = require("../config/ioredis");
const redis_users = "app:users";

const typeDefs = `#graphql

  type User {
    _id: ID
    username: String
    email: String
    password: String
    role: String
    phoneNumber: String
    address: String
  }

  type Query {
    getUsers: [User]
    getUserById(id: ID): User
  }

  type Msg {
    msg: String
  }

  type Mutation {
    addUser(username: String,
    email: String,
    password: String,
    role: String,
    phoneNumber: String,
    address: String): Msg,

    deleteUser(id:ID): Msg
  }
`;

const resolvers = {
  Query: {
    getUsers: async () => {
      const userCache = await redis.get(redis_users);

      if (userCache) {
        const data = JSON.parse(userCache);
        return data;
      } else {
        const { data } = await axios.get(`${usersUrl}/users`);
        await redis.set(redis_users, JSON.stringify(data), "EX", 1000);
        return data;
      }
    },
    getUserById: async (_, args) => {
      const { id } = args;

      const userCache = await redis.get(`app:user:${id}`);

      if (userCache) {
        const data = JSON.parse(userCache);
        return data;
      } else {
        const { data } = await axios.get(`${usersUrl}/users/${id}`);

        await redis.set(`app:user:${id}`, JSON.stringify(data), "EX", 1000);

        return data;
      }
    },
  },

  Mutation: {
    addUser: async (_, args) => {
      const { username, email, password, role, phoneNumber, address } = args;
      const data = await axios.post(`${usersUrl}/users`, {
        username,
        email,
        password,
        role,
        phoneNumber,
        address,
      });
      await redis.del(redis_users);
      return { msg: "Success create user" };
    },

    deleteUser: async (_, args) => {
      const { id } = args;
      await axios.delete(`${usersUrl}/users/${id}`);
      await redis.del(redis_users);
      await redis.del(`app:user:${id}`);

      return { msg: "Success delete data" };
    },
  },
};

module.exports = [typeDefs, resolvers];
