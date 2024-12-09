const express = require('express');
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const models = require('./models/index.js'); 
const routes = require('./routes/index');

const app = express();


const options = {
  key: fs.readFileSync('key.pem'), 
  cert: fs.readFileSync('cert.pem') 
};

const server = https.createServer(options, app);

// Middleware
app.use(cors());
app.use(express.json()); 
app.use(routes);



/*
models.sequelize.sync({ alter: true }).then(() => {
  console.log("Esquema actualizado.");
});*/

// Iniciar el servidor
const port = 5000;
server.listen(port, () => {
  console.log(`Servidor corriendo en https://localhost:${port}`);
});