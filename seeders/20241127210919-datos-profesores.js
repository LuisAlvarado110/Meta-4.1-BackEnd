'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('profesores', [
      {
        id: 11,
        numEmpleado: 8882,
        nombre: "Yesenia",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 12,
        numEmpleado: 8883,
        nombre: "Rene",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

  },

  async down (queryInterface, Sequelize) {

  }
};
