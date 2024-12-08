const express = require('express');
const http = require('https');
const fs = require('fs');
const cors = require('cors');
const app = express();

const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

const server = http.createServer(options, app);

app.use(cors());

app.get('/estudiantes',(req,res)=>{
    res.send('Hola mundo');
});

const port = 5000;
server.listen(port, ()=>{
    console.log(`Servidor corriendo en ${port}`);
});