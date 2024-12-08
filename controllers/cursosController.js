const { Curso } = require('../models/cursos'); 

// Obtener todos los cursos
const getAllCursos = async (req, res) => {
    try {
        const cursos = await Curso.findAll();
        res.status(200).json(cursos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un curso por ID
const getCurso = async (req, res) => {
    try {
        const curso = await Curso.findByPk(req.params.id);
        if (!curso) {
            return res.status(404).json({ error: `Curso con id ${req.params.id} no encontrado` });
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

// Actualizar un curso
const updateCurso = async (req, res) => {
    try {
        const curso = await Curso.findByPk(req.params.id);
        if (!curso) {
            return res.status(404).json({ error: `Curso con id ${req.params.id} no encontrado` });
        }
        const updatedCurso = await curso.update(req.body);
        res.status(200).json(updatedCurso);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar un curso
const deleteCurso = async (req, res) => {
    try {
        const curso = await Curso.findByPk(req.params.id);
        if (!curso) {
            return res.status(404).json({ error: `Curso con id ${req.params.id} no encontrado` });
        }
        await curso.destroy();
        res.status(200).json({ msg: `Curso con id ${req.params.id} eliminado exitosamente` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Exportar las funciones
module.exports = {
    getAllCursos,
    getCurso,
    createCurso,
    updateCurso,
    deleteCurso,
};
