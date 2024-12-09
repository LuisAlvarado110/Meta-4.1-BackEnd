//const { Estudiante, Curso } = require('../models/estudiante');
//const { Estudiante } = require('../models/estudiante');
const { Estudiante, Curso} = require('../models');
console.log(Estudiante);

// Obtener todos los estudiantes
const getAllEstudiantes = async (req, res) => {
    try {
        // Obtener todos los estudiantes
        const estudiantes = await Estudiante.findAll();
  
        res.status(200).json({
            success: true,
            message: "Estudiantes obtenidos exitosamente.",
            data: estudiantes,
        });
    } catch (error) {
        console.error("Error al obtener estudiantes:", error);
        res.status(500).json({
            success: false,
            message: "Error al obtener estudiantes.",
            error: error.message,
      });
    }
};

// Obtener un estudiante por matrícula
const getEstudiante = async (req, res) => {
    try {
        const estudiante = await Estudiante.findOne({ where: { matricula: req.params.matricula } });
        if (!estudiante) {
            return res.status(404).json({ error: `Estudiante con matrícula ${req.params.matricula} no encontrado` });
        }
        res.status(200).json(estudiante);
    } catch (error) {
        console.error('Error al obtener el estudiante:', error);
        res.status(500).json({ error: 'Error al obtener el estudiante.' });
    }
};

// Crear un nuevo estudiante
const createEstudiante = async (req, res) => {
    try {
        const newEstudiante = await Estudiante.create(req.body);
        res.status(201).json(newEstudiante);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Actualizar un estudiante
const updateEstudiante = async (req, res) => {
    try {
        const estudiante = await Estudiante.findByPk(req.params.id);
        if (!estudiante) {
            return res.status(404).json({ error: `Estudiante con id ${req.params.id} no encontrado` });
        }
        const updatedEstudiante = await estudiante.update(req.body);
        res.status(200).json(updatedEstudiante);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar un estudiante
const deleteEstudiante = async (req, res) => {
    try {
        const estudiante = await Estudiante.findByPk(req.params.id);
        if (!estudiante) {
            return res.status(404).json({ error: `Estudiante con id ${req.params.id} no encontrado` });
        }
        await estudiante.destroy();
        res.status(200).json({ msg: `Estudiante con id ${req.params.id} borrado exitosamente` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Inscribir a un estudiante en un curso
const enrollEstudiante = async (req, res) => {
    try {
        // Buscar estudiante por matrícula
        const estudiante = await Estudiante.findOne({ where: { matricula: req.params.matricula } });
        if (!estudiante) return res.status(404).json({ error: 'Estudiante no encontrado' });

        // Buscar curso por clave
        const curso = await Curso.findOne({ where: { claveCurso: req.body.claveCurso } });
        if (!curso) return res.status(404).json({ error: 'Curso no encontrado' });

        // Crear relación entre estudiante y curso (tabla intermedia)
        await estudiante.addCurso(curso); // Este método se genera automáticamente en asociaciones Sequelize (belongsToMany)

        res.status(200).json({ msg: 'Estudiante inscrito exitosamente', matricula: estudiante.matricula, claveCurso: curso.claveCurso });
    } catch (error) {
        console.error('Error al inscribir estudiante:', error);
        res.status(500).json({ error: 'Error al inscribir estudiante.' });
    }
};


// Desinscribir a un estudiante de un curso
const disenrollEstudiante = async (req, res) => {
    try {
        const estudiante = await Estudiante.findByPk(req.params.id);
        const curso = await Curso.findByPk(req.body.cursoId);

        if (!estudiante) return res.status(404).json({ error: 'Estudiante no encontrado' });
        if (!curso) return res.status(404).json({ error: 'Curso no encontrado' });

        estudiante.cursosInscritos = estudiante.cursosInscritos.filter(id => id !== curso.id);
        await estudiante.save();

        res.status(200).json({ msg: 'Estudiante desinscrito exitosamente', cursosInscritos: estudiante.cursosInscritos });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener cursos inscritos de un estudiante
const cursosInscritosEstudiante = async (req, res) => {
    const { matricula } = req.params;
    try {
        // Buscar estudiante por matrícula e incluir cursos relacionados
        const estudiante = await Estudiante.findOne({
            where: { matricula },
            include: [{
                model: Curso,
                through: { attributes: ['calificacion'] } // Atributos de la tabla intermedia
            }]
        });

        // Validar si se encontró el estudiante
        if (!estudiante) {
            return res.status(404).json({ error: 'Estudiante no encontrado.' });
        }

        // Validar si el estudiante tiene cursos inscritos
        if (!estudiante.Cursos || estudiante.Cursos.length === 0) {
            return res.status(200).json({ matricula, cursosInscritos: [] });
        }

        // Mapear cursos inscritos con calificación
        const cursosInscritos = estudiante.Cursos.map(curso => ({
            nombre: curso.nombre, // Nombre del curso
            claveCurso: curso.claveCurso, // Clave del curso
            calificacion: curso.EstudianteCurso.calificacion // Calificación desde la tabla intermedia
        }));

        // Responder con la lista de cursos inscritos
        res.status(200).json({ matricula: estudiante.matricula, cursosInscritos });
    } catch (error) {
        console.error('Error obteniendo cursos inscritos:', error);
        res.status(500).json({ error: 'Error obteniendo cursos inscritos.' });
    }
};









module.exports = {
    getAllEstudiantes,
    getEstudiante,
    createEstudiante,
    updateEstudiante,
    deleteEstudiante,
    enrollEstudiante,
    disenrollEstudiante,
    cursosInscritosEstudiante,
};
