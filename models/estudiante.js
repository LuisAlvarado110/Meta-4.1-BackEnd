'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Estudiante extends Model {
    static associate(models) {
      // Relación muchos a muchos con Curso mediante la tabla intermedia EstudianteCursos
      /*this.belongsToMany(models.Curso, {
        through: models.EstudianteCursos, // Modelo intermedio
        foreignKey: 'matricula', // Llave foránea para Estudiante
      });*/
      this.belongsToMany(models.Curso, { through: 'EstudianteCurso' });
    }
  }

  Estudiante.init(
    {
      matricula: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      semestre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      creditos: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: 'Estudiante',
    }
  );

  return Estudiante;
};
