const express = require('express');
const router = express.Router();
const profesoresController = require('../controllers/profesoresController.js');

router.get('/getAllProfesores', profesoresController.getAllProfesores); // Obtener todos los profesores
router.get('/getProfesor/:numEmpleado', profesoresController.getProfesor); // Obtener un profesor por noEmpleado
router.post('/createProfesor', profesoresController.createProfesor); // Crear un nuevo profesor
router.put('/updateProfesor/:numEmpleado', profesoresController.updateProfesor); // Actualizar un profesor existente por noEmpleado
router.delete('/deleteProfesor/:numEmpleado', profesoresController.deleteProfesor); // Eliminar un profesor por noEmpleado
router.patch('/darAltaProfesor/:numEmpleado', profesoresController.enrollProfesor); // Dar de alta a un profesor en un curso
router.patch('/darBajaProfesor/:numEmpleado', profesoresController.disenrollProfesor); // Dar de baja a un profesor de un curso
router.get('/getCursosProfesor/:numEmpleado', profesoresController.getCursosProfesor); // Obtener cursos asociados a un profesor
router.get('/getEstudiantesProfesor/:numEmpleado', profesoresController.getEstudiantesProfesor); // Obtener estudiantes asociados a un profesor

module.exports = router;