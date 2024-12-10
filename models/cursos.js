'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Curso extends Model {
    static associate(models) {
      // Relación muchos a muchos con Estudiante mediante la tabla intermedia EstudianteCursos
      /*this.belongsToMany(models.Estudiante, {
        through: models.EstudianteCursos, // Modelo intermedio
        foreignKey: 'claveCurso', // Llave foránea para Curso
      });*/
      this.belongsToMany(models.Estudiante, { through: 'EstudianteCurso' });

      // Relación muchos a muchos con Profesor
      this.belongsToMany(models.Profesor, {
        through: models.ProfesoresCurso, // Nombre exacto del modelo intermedio
        foreignKey: 'claveCurso', // Clave en ProfesoresCurso para Curso
        otherKey: 'numEmpleado', // Clave en ProfesoresCurso para Profesor
        as: 'Profesores', // Alias para la relación
      });
      
    }
  }

  Curso.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      claveCurso: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      nombreCurso: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      creditos: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Curso',
    }
  );

  return Curso;
};
