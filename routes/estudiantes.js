const express = require('express');
const router = express.Router();
const estudianteController = require('../controllers/estudiantesController.js'); 

router.get('/getAllEstudiantes', estudianteController.getAllEstudiantes); // Obtener todos los estudiantes
router.get('/getEstudiante/:matricula', estudianteController.getEstudiante); // Obtener un estudiante por matrícula
router.post('/createEstudiante', estudianteController.createEstudiante); // Crear un nuevo estudiante
router.put('/updateEstudiante/:matricula', estudianteController.updateEstudiante); // Actualizar un estudiante existente por matrícula
router.delete('/deleteEstudiante/:matricula', estudianteController.deleteEstudiante); // Eliminar un estudiante por matrícula
router.patch('/estudiante/:matricula/enroll', estudianteController.enrollEstudiante); // Inscribir a un estudiante en un curso
router.patch('/estudiante/:matricula/disenroll', estudianteController.disenrollEstudiante); // Desinscribir a un estudiante de un curso
router.get('/getEstudianteCursos/:matricula', estudianteController.cursosInscritosEstudiante); // Obtener cursos inscritos por matrícula
//router.get('/estudiantes/:matricula/profesores', estudianteController.getEstudiantesProfesor); // Obtener profesores asociados a un estudiante por matrícula


module.exports = router;