'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('estudiantes', [
      {
        id: 1,
        matricula: "1169324",
        semestre: "11",
        creditos: 111,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        matricula: "1168421",
        semestre: "11",
        creditos: 112,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
