'use strict';

const data = require('../data/genre.json')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    data.forEach((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
    });

    await queryInterface.bulkInsert("Genres", data);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Genres", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  }
};
