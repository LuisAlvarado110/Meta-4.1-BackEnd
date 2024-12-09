'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProfesoresCurso extends Model {
    static associate(models) {
      // Relación con Profesor
      this.belongsTo(models.Profesor, { foreignKey: 'numEmpleado' });
      // Relación con Curso
      this.belongsTo(models.Curso, { foreignKey: 'claveCurso' });
    }
  }

  ProfesoresCurso.init(
    {
      numEmpleado: DataTypes.INTEGER,
      claveCurso: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'ProfesoresCurso', // Importante: Nombre exacto usado en las asociaciones
    }
  );
  

  return ProfesoresCurso;
};
