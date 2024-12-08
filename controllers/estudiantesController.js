const { Estudiante, Curso } = require('../models/estudiante');

// Obtener todos los estudiantes
const getAllEstudiantes = async (req, res) => {
    try {
        const estudiantes = await Estudiante.findAll();
        res.status(200).json(estudiantes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un estudiante por ID
const getEstudiante = async (req, res) => {
    try {
        const estudiante = await Estudiante.findByPk(req.params.id);
        if (!estudiante) {
            return res.status(404).json({ error: `Estudiante con id ${req.params.id} no encontrado` });
        }
        res.status(200).json(estudiante);
    } catch (error) {
        res.status(500).json({ error: error.message });
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
        const estudiante = await Estudiante.findByPk(req.params.id);
        const curso = await Curso.findByPk(req.body.cursoId);

        if (!estudiante) return res.status(404).json({ error: 'Estudiante no encontrado' });
        if (!curso) return res.status(404).json({ error: 'Curso no encontrado' });

        if (!estudiante.cursosInscritos.includes(curso.id)) {
            estudiante.cursosInscritos.push(curso.id);
            await estudiante.save();
        }

        res.status(200).json({ msg: 'Estudiante inscrito exitosamente', cursosInscritos: estudiante.cursosInscritos });
    } catch (error) {
        res.status(500).json({ error: error.message });
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

module.exports = {
    getAllEstudiantes,
    getEstudiante,
    createEstudiante,
    updateEstudiante,
    deleteEstudiante,
    enrollEstudiante,
    disenrollEstudiante,
};
