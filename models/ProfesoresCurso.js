'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProfesoresCurso extends Model {
    static associate(models) {
      // Relación con Profesor
      this.belongsTo(models.Profesor, { foreignKey: 'profesorId' });
      // Relación con Curso
      this.belongsTo(models.Curso, { foreignKey: 'cursoId' });
    }
  }

  ProfesoresCurso.init(
    {
      profesorId: DataTypes.INTEGER,
      cursoId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'ProfesoresCurso', // Importante: Nombre exacto usado en las asociaciones
    }
  );
  

  return ProfesoresCurso;
};
