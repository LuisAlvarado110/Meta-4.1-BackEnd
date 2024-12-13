const express = require('express');
const https = require('https');
const fs = require('fs');
const cors = require('cors');
//const models = require('./models/index.js'); 
const routes = require('./routes/index');
//const { OAuth2Client } = require('google-auth-library');

const app = express();
/*
// Create a client ID for your project
const client = new OAuth2Client();

// Verify token middleware
async function verifyToken(req, res, next) {
  const authorizationHeader = req.header('Autorización');
  if (!authorizationHeader) {
    return res.status(401).send('No autorizado');
  }

  const token = authorizationHeader.replace('Bearer ', '');
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const userData = ticket.getPayload();
    req.user = userData;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).send('Token inválido');
  }
}
*/
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