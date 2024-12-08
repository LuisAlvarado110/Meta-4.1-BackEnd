const { Profesor } = require('../models/profesor');

// Obtener todos los profesores
const getAllProfesores = async (req, res) => {
  try {
    const profesores = await Profesor.findAll();
    res.status(200).json(profesores);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los profesores' });
  }
};

// Obtener un profesor por ID
const getProfesor = async (req, res) => {
  try {
    const profesor = await Profesor.findByPk(req.params.id); // `findByPk` busca por clave primaria
    if (profesor) {
      res.status(200).json(profesor);
    } else {
      res.status(404).json({ error: `Profesor con id ${req.params.id} no encontrado` });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el profesor' });
  }
};

// Crear un nuevo profesor
const createProfesor = async (req, res) => {
  try {
    const newProfesor = await Profesor.create(req.body); // Crea un nuevo registro
    res.status(201).json(newProfesor);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el profesor' });
  }
};

// Actualizar un profesor
const updateProfesor = async (req, res) => {
  try {
    const profesor = await Profesor.findByPk(req.params.id);
    if (profesor) {
      const updatedProfesor = await profesor.update(req.body); // Actualiza el registro encontrado
      res.status(200).json(updatedProfesor);
    } else {
      res.status(404).json({ error: `Profesor con id ${req.params.id} no encontrado` });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el profesor' });
  }
};

// Eliminar un profesor
const deleteProfesor = async (req, res) => {
  try {
    const rowsDeleted = await Profesor.destroy({
      where: { id: req.params.id }, // Borra por condición
    });
    if (rowsDeleted) {
      res.status(200).json({ msg: `Profesor con id ${req.params.id} eliminado exitosamente` });
    } else {
      res.status(404).json({ error: `Profesor con id ${req.params.id} no encontrado` });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el profesor' });
  }
};

module.exports = {
  getAllProfesores,
  getProfesor,
  createProfesor,
  updateProfesor,
  deleteProfesor,
};
