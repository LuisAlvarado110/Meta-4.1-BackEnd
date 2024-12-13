const { Curso, Estudiante, Profesor } = require('../models'); 
const { getProfesoresEstudiante } = require('./estudiantesController');

// Obtener todos los cursos
const getAllCursos = async (req, res) => {
    try {
        // Obtener todos los cursos
        const cursos = await Curso.findAll();
    
        res.status(200).json({ 
            success: true,
            message: "Cursos obtenidos exitosamente.",
            data: cursos
         });
      } catch (error) {
        console.error('Error al obtener los cursos:', error);
        res.status(500).json({ success: false, error: 'Error al obtener los cursos.' });
      }
};

// Obtener un curso por ID
const getCurso = async (req, res) => {
    const { claveCurso } = req.params;
    try {
        const curso = await Curso.findOne({ where: { claveCurso } });
        if (!curso) {
            return res.status(404).json({ error: `Curso con claveCurso ${claveCurso} no encontrado` });
        }
        res.status(200).json(curso);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear un nuevo curso
const createCurso = async (req, res) => {
    try {
        const newCurso = await Curso.create(req.body);
        res.status(201).json(newCurso);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Actualizar un curso mediante claveCurso
const updateCurso = async (req, res) => {
    const { claveCurso } = req.params;

    try {
        // Buscar el curso por claveCurso
        const curso = await Curso.findOne({ where: { claveCurso } });
        
        // Validar si el curso existe
        if (!curso) {
            return res.status(404).json({ error: `Curso con claveCurso ${claveCurso} no encontrado` });
        }

        // Actualizar el curso con los datos proporcionados
        const updatedCurso = await curso.update(req.body);

        // Responder con el curso actualizado
        res.status(200).json(updatedCurso);
    } catch (error) {
        console.error('Error actualizando el curso:', error);
        res.status(400).json({ error: error.message });
    }
};


// Eliminar un curso mediante claveCurso
const deleteCurso = async (req, res) => {
    const { claveCurso } = req.params;

    try {
        // Buscar el curso por claveCurso
        const curso = await Curso.findOne({ where: { claveCurso } });

        // Validar si el curso existe
        if (!curso) {
            return res.status(404).json({ error: `Curso con claveCurso ${claveCurso} no encontrado` });
        }

        // Eliminar el curso
        await curso.destroy();

        // Responder con mensaje de éxito
        res.status(200).json({ msg: `Curso con claveCurso ${claveCurso} eliminado exitosamente` });
    } catch (error) {
        console.error('Error eliminando el curso:', error);
        res.status(500).json({ error: error.message });
    }
};

const getEstudiantesCurso = async (req, res) => {
    const { claveCurso } = req.params; // Identificar el curso por claveCurso
  
    try {
      // Buscar el curso por claveCurso e incluir los estudiantes relacionados
      const curso = await Curso.findOne({
        where: { claveCurso },
        include: [
          {
            model: Estudiante,
            as: 'Estudiantes', // Alias de la relación Estudiante
            attributes: ['matricula', 'nombre'], // Seleccionar campos relevantes
            through: { attributes: [] }, // Excluir datos de la tabla intermedia
          },
        ],
        attributes: ['claveCurso', 'nombreCurso'], // Seleccionar campos relevantes del curso
      });
  
      // Validar si se encontró el curso
      if (!curso) {
        return res.status(404).json({ error: 'Curso no encontrado.' });
      }
  
      // Extraer los estudiantes relacionados al curso
      const estudiantes = curso.Estudiantes.map((estudiante) => ({
        matricula: estudiante.matricula,
        nombre: estudiante.nombre,
      }));
  
      // Eliminar duplicados basados en la matrícula del estudiante (por seguridad)
      const estudiantesUnicos = estudiantes.filter(
        (estudiante, index, self) =>
          index === self.findIndex((e) => e.matricula === estudiante.matricula)
      );
  
      // Responder con la lista de estudiantes
      res.status(200).json({
        claveCurso: curso.claveCurso,
        nombreCurso: curso.nombreCurso,
        estudiantes: estudiantesUnicos,
      });
    } catch (error) {
      console.error('Error obteniendo estudiantes del curso:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  };
  
  const getProfesoresCurso = async (req, res) => {
    const { claveCurso } = req.params; // Identificar el curso por claveCurso
  
    try {
      // Buscar el curso por claveCurso e incluir los profesores relacionados
      const curso = await Curso.findOne({
        where: { claveCurso },
        include: [
          {
            model: Profesor,
            as: 'Profesores', // Alias de la relación Profesor
            attributes: ['numEmpleado', 'nombre'], // Seleccionar campos relevantes
            through: { attributes: [] }, // Excluir datos de la tabla intermedia
          },
        ],
        attributes: ['claveCurso', 'nombreCurso'], // Seleccionar campos relevantes del curso
      });
  
      // Validar si se encontró el curso
      if (!curso) {
        return res.status(404).json({ error: 'Curso no encontrado.' });
      }
  
      // Extraer los profesores relacionados al curso
      const profesores = curso.Profesores.map((profesor) => ({
        numEmpleado: profesor.numEmpleado,
        nombre: profesor.nombre,
      }));
  
      // Eliminar duplicados basados en el numEmpleado del profesor (por seguridad)
      const profesoresUnicos = profesores.filter(
        (profesor, index, self) =>
          index === self.findIndex((p) => p.numEmpleado === profesor.numEmpleado)
      );
  
      // Responder con la lista de profesores
      res.status(200).json({
        claveCurso: curso.claveCurso,
        nombreCurso: curso.nombreCurso,
        profesores: profesoresUnicos,
      });
    } catch (error) {
      console.error('Error obteniendo profesores del curso:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  };
  


// Exportar las funciones
module.exports = {
    getAllCursos,
    getCurso,
    createCurso,
    updateCurso,
    deleteCurso,
    getEstudiantesCurso,
    getProfesoresCurso
};
