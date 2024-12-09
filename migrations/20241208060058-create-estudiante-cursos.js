'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('estudiantecursos', {
      matricula: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'estudiante',
          key: 'matricula',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      claveCurso: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'cursos',
          key: 'claveCurso',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      calificacion: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // Clave primaria compuesta
    await queryInterface.addConstraint('estudiantecursos', {
      fields: ['matricula', 'claveCurso'],
      type: 'primary key',
      name: 'estudiantecursos',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('estudiantecursos');
  },
};
