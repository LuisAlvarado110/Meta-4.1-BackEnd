'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProfesoresCurso extends Model {
    static associate(models) {
      // Relación con Profesor
      this.belongsTo(models.Profesor, {
        foreignKey: 'numEmpleado',
        as: 'Profesor' // Alias para la relación con Profesor
      });

      // Relación con Curso
      this.belongsTo(models.Curso, {
        foreignKey: 'claveCurso',
        as: 'Curso' // Alias para la relación con Curso
      });
    }
  }

  ProfesoresCurso.init(
    {
      numEmpleado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Profesors', // Nombre exacto de la tabla Profesores en la base de datos
          key: 'numEmpleado',
        }
      },
      claveCurso: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Cursos', // Nombre exacto de la tabla Cursos en la base de datos
          key: 'claveCurso',
        }
      },
    },
    {
      sequelize,
      modelName: 'ProfesoresCurso',
      tableName: 'ProfesoresCursos', // Nombre de la tabla en la base de datos
      timestamps: false, // Evitar columnas createdAt y updatedAt si no son necesarias
    }
  );

  return ProfesoresCurso;
};
