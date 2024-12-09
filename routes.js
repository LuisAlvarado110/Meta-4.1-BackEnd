const express = require('express');
const router = express.Router();
const estudianteController = require('./controllers/estudiantesController.js'); 
const profesoresController = require('./controllers/profesoresController.js');
const cursosController = require('./controllers/cursosController.js'); 


// Rutas CRUD para estudiantes
router.get('/getAllEstudiantes', estudianteController.getAllEstudiantes); // Obtener todos los estudiantes
router.get('/getEstudiante/:matricula', estudianteController.getEstudiante); // Obtener un estudiante por matrícula
router.post('/createEstudiante', estudianteController.createEstudiante); // Crear un nuevo estudiante
router.put('/updateEstudiantes/:matricula', estudianteController.updateEstudiante); // Actualizar un estudiante existente por matrícula
router.delete('/deleteEstudiante/:matricula', estudianteController.deleteEstudiante); // Eliminar un estudiante por matrícula
router.patch('/estudiantes/:matricula/enroll', estudianteController.enrollEstudiante); // Inscribir a un estudiante en un curso
router.patch('/estudiantes/:matricula/disenroll', estudianteController.disenrollEstudiante); // Desinscribir a un estudiante de un curso
//router.get('/estudiantes/:matricula/cursos', estudianteController.cursosInscritosEstudiantes); // Obtener cursos inscritos por matrícula
//router.get('/estudiantes/:matricula/profesores', estudianteController.getEstudiantesProfesor); // Obtener profesores asociados a un estudiante por matrícula


// Rutas CRUD para profesores
router.get('/profesores', profesoresController.getAllProfesores); // Obtener todos los profesores
router.get('/profesores/:numEmpleado', profesoresController.getProfesor); // Obtener un profesor por noEmpleado
router.post('/profesores', profesoresController.createProfesor); // Crear un nuevo profesor
router.put('/profesores/:numEmpleado', profesoresController.updateProfesor); // Actualizar un profesor existente por noEmpleado
router.delete('/profesores/:numEmpleado', profesoresController.deleteProfesor); // Eliminar un profesor por noEmpleado
//router.patch('/profesores/:numEmpleado/enroll', profesoresController.enrollProfesores); // Inscribir a un profesor en un curso
//router.patch('/profesores/:numEmpleado/disenroll', profesoresController.disenrollProfesores); // Desinscribir a un profesor de un curso
//router.get('/profesores/:numEmpleado/cursos', profesoresController.cursosInscritosProfesores); // Obtener cursos asociados a un profesor
//router.get('/profesores/:numEmpleado/estudiantes', profesoresController.getEstudiantesProfesor); // Obtener estudiantes asociados a un profesor

// Rutas CRUD para cursos
router.get('/getAllCursos', cursosController.getAllCursos); // Obtener todos los cursos
router.get('/getCursos/:claveCurso', cursosController.getCurso); // Obtener un curso por ID
router.post('/createCurso', cursosController.createCurso); // Crear un nuevo curso
router.put('/cursos/:claveCurso', cursosController.updateCurso); // Actualizar un curso existente
router.delete('/cursos/:claveCurso', cursosController.deleteCurso); // Eliminar un curso

module.exports = router; 