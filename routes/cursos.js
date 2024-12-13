const express = require('express');
const router = express.Router();
const cursosController = require('../controllers/cursosController.js');

router.get('/getAllCursos', cursosController.getAllCursos); // Obtener todos los cursos
router.get('/getCurso/:claveCurso', cursosController.getCurso); // Obtener un curso por ID
router.post('/createCurso', cursosController.createCurso); // Crear un nuevo curso
router.put('/updateCurso/:claveCurso', cursosController.updateCurso); // Actualizar un curso existente
router.delete('/deleteCurso/:claveCurso', cursosController.deleteCurso); // Eliminar un curso
router.get('/getEstudiantesCurso/:claveCurso',cursosController.getEstudiantesCurso);// Obtener estudiantes de un curso
router.get('/getProfesoresCurso/:claveCurso',cursosController.getProfesoresCurso);// Obtener profesores de un curso

module.exports = router;