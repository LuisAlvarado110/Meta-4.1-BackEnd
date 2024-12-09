const { Profesor, Curso, Estudiante } = require('../models');

// Obtener todos los profesores
const getAllProfesores = async (req, res) => {
  try {
    const profesores = await Profesor.findAll();
    res.status(200).json({
      success: true,
      message: "Profesores obtenidos exitosamente.",
      data: profesores
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los profesores' });
  }
};

// Obtener un profesor por numEmpleado
const getProfesor = async (req, res) => {
  const { numEmpleado } = req.params;

  try {
      // Buscar el profesor por numEmpleado
      const profesor = await Profesor.findOne({ where: { numEmpleado } });

      // Validar si el profesor existe
      if (!profesor) {
          return res.status(404).json({ error: `Profesor con numEmpleado ${numEmpleado} no encontrado` });
      }

      // Responder con los datos del profesor
      res.status(200).json(profesor);
  } catch (error) {
      console.error('Error al obtener el profesor:', error);
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

// Actualizar un profesor por numEmpleado
const updateProfesor = async (req, res) => {
  const { numEmpleado } = req.params;

  try {
      // Buscar el profesor por numEmpleado
      const profesor = await Profesor.findOne({ where: { numEmpleado } });

      // Validar si el profesor existe
      if (!profesor) {
          return res.status(404).json({ error: `Profesor con numEmpleado ${numEmpleado} no encontrado` });
      }

      // Actualizar el registro con los datos proporcionados
      const updatedProfesor = await profesor.update(req.body);

      // Responder con los datos actualizados
      res.status(200).json(updatedProfesor);
  } catch (error) {
      console.error('Error al actualizar el profesor:', error);
      res.status(500).json({ error: 'Error al actualizar el profesor' });
  }
};


// Eliminar un profesor por numEmpleado
const deleteProfesor = async (req, res) => {
  const { numEmpleado } = req.params;

  try {
    // Eliminar profesor usando numEmpleado
    const rowsDeleted = await Profesor.destroy({
      where: { numEmpleado } // Borra por condición usando numEmpleado
    });

    // Verificar si se eliminó al menos un registro
    if (rowsDeleted) {
      res.status(200).json({ msg: `Profesor con numEmpleado ${numEmpleado} eliminado exitosamente` });
    } else {
      res.status(404).json({ error: `Profesor con numEmpleado ${numEmpleado} no encontrado` });
    }
  } catch (error) {
    console.error('Error al eliminar el profesor:', error);
    res.status(500).json({ error: 'Error al eliminar el profesor' });
  }
};


// Inscribir un profesor en un curso por numEmpleado y claveCurso
const enrollProfesor = async (req, res) => {
  const { numEmpleado } = req.params; // Obtener numEmpleado de los parámetros de la ruta
  const { claveCurso } = req.body; // Obtener claveCurso del cuerpo de la solicitud

  try {
      // Buscar al profesor por numEmpleado
      const profesor = await Profesor.findOne({ where: { numEmpleado } });

      // Validar si el profesor existe
      if (!profesor) {
          return res.status(404).json({ error: `Profesor con numEmpleado ${numEmpleado} no encontrado` });
      }

      // Buscar el curso por claveCurso
      const curso = await Curso.findOne({ where: { claveCurso } });

      // Validar si el curso existe
      if (!curso) {
          return res.status(404).json({ error: `Curso con claveCurso ${claveCurso} no encontrado` });
      }

      // Relacionar al profesor con el curso
      await profesor.addCurso(curso);

      // Responder con éxito
      res.status(200).json({
          message: 'Profesor inscrito en el curso exitosamente',
          profesorId: numEmpleado,
          claveCurso
      });
  } catch (error) {
      console.error('Error al inscribir al profesor en el curso:', error);
      res.status(500).json({ error: 'Error al inscribir al profesor en el curso' });
  }
};




module.exports = {
  getAllProfesores,
  getProfesor,
  createProfesor,
  updateProfesor,
  deleteProfesor,
  enrollProfesor,
};
