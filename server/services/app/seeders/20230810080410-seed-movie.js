'use strict';

const data = require('../data/movie.json')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    data.forEach((el) => {
      el.slug = el.title.replace(/\W\s|\s/g, "-").toLowerCase();
      el.createdAt = new Date();
      el.updatedAt = new Date();
    });

    await queryInterface.bulkInsert("Movies", data);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Movies", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  }
};
