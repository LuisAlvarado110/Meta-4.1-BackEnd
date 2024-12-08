'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class EstudianteCursos extends Model {
    static associate(models) {
      this.belongsTo(models.Estudiante, { foreignKey: 'matricula' });
      this.belongsTo(models.Curso, { foreignKey: 'claveCurso' });
    }
  }

  EstudianteCursos.init(
    {
      matricula: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true, // Parte de la clave primaria compuesta
      },
      claveCurso: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true, // Parte de la clave primaria compuesta
      },
      calificacion: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'EstudianteCursos',
      tableName: 'estudiantecursos',
      timestamps: true,
    }
  );

  return EstudianteCursos;
};
