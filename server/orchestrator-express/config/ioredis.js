const Redis = require("ioredis");

const redis = new Redis(
  `redis://default:${process.env.PASS_REDIS}@redis-19671.c1.ap-southeast-1-1.ec2.cloud.redislabs.com:19671`
);

module.exports = redis;
