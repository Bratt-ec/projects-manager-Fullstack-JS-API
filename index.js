const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');
// Crear el server
const app = express(); 
// Puerto del server
const port = process.env.port || 8000;
// Conectarse a la BD
conectarDB();
// Habilitar CORS
app.use(cors());
// Habilitar Express.json
app.use(express.json({ extended: true }));
// Importar rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));
// Ininiar el server
app.listen(port,'0.0.0.0', ()=>{
    console.log(`Server init in port : ${port}`);
});


