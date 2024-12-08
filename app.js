const express = require('express');
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const models = require('./models/index.js'); // Carga los modelos Sequelize

const app = express();

// Configuración de HTTPS
const options = {
  key: fs.readFileSync('key.pem'), // Llave privada del certificado
  cert: fs.readFileSync('cert.pem') // Certificado
};

const server = https.createServer(options, app);

// Middleware
app.use(cors());
app.use(express.json()); // Para interpretar cuerpos JSON en las solicitudes


// Función general para crear relaciones entre modelos
const crearRelacion = async (modeloPrimario, idPrimario, modeloSecundario, idSecundario, datosIntermedios = {}) => {
    try {
      const primario = await modeloPrimario.findByPk(idPrimario);
      const secundario = await modeloSecundario.findByPk(idSecundario);
  
      if (!primario || !secundario) {
        throw new Error(`${modeloPrimario.name} o ${modeloSecundario.name} no encontrado.`);
      }
  
      // Verificar si la relación existe previamente
      const existingRelation = await primario[`has${modeloSecundario.name}`](secundario);
      if (existingRelation) {
        return { success: false, message: 'La relación ya existe entre el estudiante y el curso.' };
      }
  
      await primario[`add${modeloSecundario.name}`](secundario, { through: datosIntermedios });
      return { success: true, message: 'Relación creada exitosamente.' };
    } catch (error) {
      console.error('Error al crear la relación:', error);
      return { success: false, error: 'Error al crear la relación.' };
    }
  };
  

//-----------Estudiantes-----------

  // Ruta para inscribir estudiantes en cursos con calificación
  app.post('/enrollEstudiante', async (req, res) => {
    const { matricula, claveCurso, calificacion } = req.body;
  
    // Validar que los datos requeridos estén presentes
    if (!matricula || !claveCurso || calificacion === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Faltan datos requeridos (matricula, claveCurso, calificación).',
      });
    }
  
    const result = await crearRelacion(models.Estudiante, matricula, models.Curso, claveCurso, { calificacion });
  
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(result.message === 'La relación ya existe entre el estudiante y el curso.' ? 409 : 500).json(result);
    }
  });
  

// Ruta para crear un estudiante
app.post('/createEstudiante', async (req, res) => {
    try {
      const { matricula, nombre, semestre, creditos } = req.body;
  
      // Validar datos de entrada
      if (!matricula || !nombre || !semestre || typeof creditos !== 'number') {
        return res.status(400).json({ 
          success: false, 
          message: "Todos los campos son obligatorios: matricula, nombre, semestre y creditos (número)." 
        });
      }
  
      // Crear estudiante
      const nuevoEstudiante = await models.Estudiante.create({
        matricula,
        nombre,
        semestre,
        creditos,
      });
  
      res.status(201).json({ 
        success: true, 
        message: "Estudiante creado exitosamente.", 
        data: nuevoEstudiante 
      });
    } catch (error) {
      console.error("Error al crear estudiante:", error);
      res.status(500).json({ 
        success: false, 
        message: "Error al crear estudiante.", 
        error: error.message 
      });
    }
  });

// Ruta para obtener un estudiante por su matrícula
app.get('/getEstudiante/:matricula', async (req, res) => {
    const matricula = req.params.matricula; // Obtener la matrícula desde los parámetros
  
    try {
      // Buscar al estudiante por su matrícula
      const estudiante = await models.Estudiante.findOne({ where: { matricula } });
  
      if (!estudiante) {
        return res.status(404).json({
          success: false,
          message: `Estudiante con matrícula ${matricula} no encontrado.`,
        });
      }
  
      res.status(200).json({
        success: true,
        data: estudiante,
      });
    } catch (error) {
      console.error("Error al buscar estudiante:", error);
      res.status(500).json({
        success: false,
        message: "Error al buscar estudiante.",
        error: error.message,
      });
    }
  });  

  // Ruta para obtener todos los estudiantes
app.get('/getAllEstudiantes', async (req, res) => {
    try {
      // Obtener todos los estudiantes
      const estudiantes = await models.Estudiante.findAll();
  
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
  });
  
// Ruta para obtener las materias de un estudiante mediante matrícula
app.get('/estudiante/:matricula/materias', async (req, res) => {
    const { matricula } = req.params;
  
    try {
      // Buscar al estudiante por matrícula
      const estudiante = await models.Estudiante.findOne({
        where: { matricula },
        include: [
          {
            model: models.Curso,
            as: 'Cursos', // Alias definido en la relación
            attributes: ['nombreCurso'], // Solo incluir el nombre de los cursos
          },
        ],
      });
  
      if (!estudiante) {
        return res.status(404).json({
          success: false,
          message: `Estudiante con matrícula ${matricula} no encontrado.`,
        });
      }
  
      // Extraer los nombres de los cursos
      const cursos = estudiante.Cursos.map((curso) => curso.nombre);
  
      res.status(200).json({
        success: true,
        estudiante: {
          matricula: estudiante.matricula,
          nombre: estudiante.nombre,
          cursos,
        },
      });
    } catch (error) {
      console.error('Error al obtener las materias:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener las materias del estudiante.',
      });
    }
  });
  

// Ruta para modificar un estudiante por su matrícula
app.put('/updateEstudiante/:matricula', async (req, res) => {
    const matricula = req.params.matricula; // Obtener matrícula desde los parámetros
    const { nombre, semestre, creditos } = req.body;
  
    try {
      // Buscar al estudiante por su matrícula
      const estudiante = await models.Estudiante.findOne({ where: { matricula } });
  
      if (!estudiante) {
        return res.status(404).json({
          success: false,
          message: `Estudiante con matrícula ${matricula} no encontrado.`,
        });
      }
  
      // Actualizar los campos proporcionados
      await estudiante.update({
        nombre: nombre || estudiante.nombre,
        semestre: semestre || estudiante.semestre,
        creditos: creditos || estudiante.creditos,
      });
  
      res.status(200).json({
        success: true,
        message: "Estudiante actualizado exitosamente.",
        data: estudiante,
      });
    } catch (error) {
      console.error("Error al actualizar estudiante:", error);
      res.status(500).json({
        success: false,
        message: "Error al actualizar estudiante.",
        error: error.message,
      });
    }
  });
  
// Ruta para eliminar un estudiante por su matrícula
app.delete('/deleteEstudiante/:matricula', async (req, res) => {
    const matricula = req.params.matricula; // Obtener matrícula desde los parámetros
  
    try {
      // Buscar al estudiante por su matrícula
      const estudiante = await models.Estudiante.findOne({ where: { matricula } });
  
      if (!estudiante) {
        return res.status(404).json({
          success: false,
          message: `Estudiante con matrícula ${matricula} no encontrado.`,
        });
      }
  
      // Eliminar el estudiante
      await estudiante.destroy();
  
      res.status(200).json({
        success: true,
        message: `Estudiante con matrícula ${matricula} eliminado exitosamente.`,
      });
    } catch (error) {
      console.error("Error al eliminar estudiante:", error);
      res.status(500).json({
        success: false,
        message: "Error al eliminar estudiante.",
        error: error.message,
      });
    }
  });
  



//--------Cursos-----------

// Ruta para crear un curso
app.post('/createCurso', async (req, res) => {
    const { claveCurso, nombreCurso, creditos } = req.body;
  
    try {
      // Validación de entrada
      if (!claveCurso || !nombreCurso || creditos === undefined) {
        return res.status(400).json({
          success: false,
          message: 'Debe proporcionar claveCurso, nombreCurso y creditos.',
        });
      }
  
      // Crear el curso en la base de datos
      const nuevoCurso = await models.Curso.create({
        claveCurso,
        nombreCurso: nombreCurso, // Asignamos a la columna 'nombre' del modelo
        creditos,
      });
  
      res.status(201).json({
        success: true,
        message: 'Curso creado exitosamente.',
        curso: {
          id: nuevoCurso.id,
          claveCurso: nuevoCurso.claveCurso,
          nombreCurso: nuevoCurso.nombreCurso,
          creditos: nuevoCurso.creditos,
        },
      });
    } catch (error) {
      console.error('Error al crear el curso:', error);
      res.status(500).json({
        success: false,
        message: 'Error al crear el curso.',
      });
    }
  });
  
// Ruta para eliminar un curso mediante su claveCurso
app.delete('/deleteCurso/:claveCurso', async (req, res) => {
    const { claveCurso } = req.params;
  
    try {
      // Buscar el curso por claveCurso
      const curso = await models.Curso.findOne({ where: { claveCurso } });
  
      if (!curso) {
        return res.status(404).json({ success: false, message: 'Curso no encontrado.' });
      }
  
      // Eliminar el curso
      await curso.destroy();
      res.status(200).json({ success: true, message: 'Curso eliminado exitosamente.' });
    } catch (error) {
      console.error('Error al eliminar el curso:', error);
      res.status(500).json({ success: false, error: 'Error al eliminar el curso.' });
    }
  });
  

// Ruta para obtener todos los cursos
app.get('/getCursos', async (req, res) => {
    try {
      // Obtener todos los cursos
      const cursos = await models.Curso.findAll({
        attributes: ['id', 'claveCurso', 'nombreCurso', 'creditos'] // Campos específicos a retornar
      });
  
      res.status(200).json({ success: true, cursos });
    } catch (error) {
      console.error('Error al obtener los cursos:', error);
      res.status(500).json({ success: false, error: 'Error al obtener los cursos.' });
    }
  });
  
// PUT para modificar un curso mediante claveCurso
app.put('/updateCurso/:claveCurso', async (req, res) => {
    const { claveCurso } = req.params; // Obtener claveCurso de los parámetros de la ruta
    const { nombreCurso, creditos } = req.body; // Obtener los datos a actualizar desde el cuerpo de la solicitud
  
    try {
      // Buscar el curso por claveCurso
      const curso = await models.Curso.findOne({ where: { claveCurso } });
  
      if (!curso) {
        return res.status(404).json({ success: false, error: 'Curso no encontrado.' });
      }
  
      // Actualizar los campos del curso
      if (nombreCurso) curso.nombreCurso = nombreCurso;
      if (creditos) curso.creditos = creditos;
  
      // Guardar los cambios
      await curso.save();
  
      return res.status(200).json({
        success: true,
        message: 'Curso actualizado exitosamente.',
        curso,
      });
    } catch (error) {
      console.error('Error al actualizar el curso:', error);
      return res.status(500).json({
        success: false,
        error: 'Ocurrió un error al actualizar el curso.',
      });
    }
  });
  

// GET para obtener un curso mediante claveCurso
app.get('/getCurso/:claveCurso', async (req, res) => {
    const { claveCurso } = req.params; // Obtener claveCurso de los parámetros de la ruta
  
    try {
      // Buscar el curso por claveCurso
      const curso = await models.Curso.findOne({ where: { claveCurso } });
  
      if (!curso) {
        return res.status(404).json({ success: false, error: 'Curso no encontrado.' });
      }
  
      return res.status(200).json({
        success: true,
        curso,
      });
    } catch (error) {
      console.error('Error al obtener el curso:', error);
      return res.status(500).json({
        success: false,
        error: 'Ocurrió un error al obtener el curso.',
      });
    }
  });
  


//--------------Profesores

app.post('/createProfesor', async (req, res) => {
    const { numEmpleado, nombre, departamento } = req.body;
  
    try {
      const profesor = await models.Profesor.create({ numEmpleado, nombre, departamento });
  
      return res.status(201).json({
        success: true,
        message: 'Profesor creado exitosamente.',
        profesor,
      });
    } catch (error) {
      console.error('Error al crear el profesor:', error);
      return res.status(500).json({
        success: false,
        error: 'Ocurrió un error al intentar crear el profesor.',
      });
    }
  });
  


// DELETE para eliminar un profesor mediante numEmpleado
app.delete('/deleteProfesor/:numEmpleado', async (req, res) => {
    const { numEmpleado } = req.params; // Obtener el numEmpleado de los parámetros de la ruta
  
    try {
      // Buscar al profesor por numEmpleado
      const profesor = await models.Profesor.findOne({ where: { numEmpleado } });
  
      // Validar si existe el profesor
      if (!profesor) {
        return res.status(404).json({
          success: false,
          message: `No se encontró un profesor con el número de empleado ${numEmpleado}.`,
        });
      }
  
      // Eliminar el profesor
      await profesor.destroy();
  
      return res.status(200).json({
        success: true,
        message: `Profesor con número de empleado ${numEmpleado} eliminado exitosamente.`,
      });
    } catch (error) {
      console.error('Error al eliminar el profesor:', error);
      return res.status(500).json({
        success: false,
        error: 'Ocurrió un error al intentar eliminar el profesor.',
      });
    }
  });

  
// GET para encontrar un profesor mediante numEmpleado
app.get('/getProfesor/:numEmpleado', async (req, res) => {
    const { numEmpleado } = req.params; // Obtener el numEmpleado de los parámetros de la ruta
  
    try {
      // Buscar al profesor por numEmpleado
      const profesor = await models.Profesor.findOne({ where: { numEmpleado } });
  
      // Validar si existe el profesor
      if (!profesor) {
        return res.status(404).json({
          success: false,
          message: `No se encontró un profesor con el número de empleado ${numEmpleado}.`,
        });
      }
  
      return res.status(200).json({
        success: true,
        profesor, // Retorna el profesor encontrado
      });
    } catch (error) {
      console.error('Error al buscar el profesor:', error);
      return res.status(500).json({
        success: false,
        error: 'Ocurrió un error al intentar buscar el profesor.',
      });
    }
  });

  





// Ruta de prueba
app.get('/estudiantes', (req, res) => {
  res.send('Hola mundo');
});

models.sequelize.sync({ alter: true }).then(() => {
    console.log("Esquema actualizado.");
  });
  

// Iniciar el servidor
const port = 5000;
server.listen(port, () => {
  console.log(`Servidor corriendo en https://localhost:${port}`);
});