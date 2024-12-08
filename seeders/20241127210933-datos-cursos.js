'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('cursos', [
      {
        id: 111,
        claveCurso: 9636,
        nombreCurso: "Matematicas",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 112,
        claveCurso: 9736,
        nombreCurso: "Programacion",
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
