const express = require('express');
const conectarDB = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Conexión con la BBDD
conectarDB();

const corsOptions = {
  origin: '*',
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
  credentials: true
}
app.use(cors(corsOptions));

app.use( express.json({ extended: true }));

app.get('/', (req, res) => {
  res.send('API is running!!!');
})

// Puerto de la apliacion
const port = process.env.PORT || 4000;

// API - Usuarios
app.use('/api/usuarios', require('./routes/usuarios'));
// API - Login
app.use('/api/auth', require('./routes/auth'));
// API - Listas
app.use('/api/listas', require('./routes/listas'));
// API - Tareas
app.use('/api/tareas', require('./routes/tareas'));

// Start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`El servidor esta funcionando en el puerto ${port}`);
});