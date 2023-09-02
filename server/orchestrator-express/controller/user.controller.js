"use strict";

const axios = require("axios");
const usersUrl = "http://localhost:4001";
const redis = require("../config/ioredis");
const redis_users = "app:users";

module.exports = class Controller {
  static async getUsers(req, res) {
    try {
      const userCache = await redis.get(redis_users);

      if (userCache) {
        const data = JSON.parse(userCache);
        res.status(200).json(data);
      } else {
        const { data } = await axios.get(`${usersUrl}/users`);
        await redis.set(redis_users, JSON.stringify(data), "EX", 1000);
        res.status(200).json(data);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async getUserById(req, res) {
    try {
      const { id } = req.params;

      const userCache = await redis.get(`app:user:${id}`);

      if (userCache) {
        const data = JSON.parse(userCache);
        res.status(200).json(data);
      } else {
        const { data } = await axios.get(`${usersUrl}/users/${id}`);

        if (!data) throw { name: "NotFound" };

        await redis.set(`app:user:${id}`, JSON.stringify(data), "EX", 1000);

        res.status(200).json(data);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async createUser(req, res, next) {
    try {
      let { username, email, password, role, phoneNumber, address } = req.body;

      const data = await axios.post(`${usersUrl}/users`, {
        username,
        email,
        password,
        role,
        phoneNumber,
        address,
      });

      console.log(data);
      await redis.del(redis_users);

      res.status(201).json({ msg: "Success create user" });
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async deleteUserById(req, res, next) {
    try {
      const { id } = req.params;

      const data = await axios.delete(`${usersUrl}/users/${id}`);
      await redis.del(redis_users);
      await redis.del(`app:user:${id}`);

      console.log(data);

      res.status(201).json({ msg: "Success delete data" });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
};
