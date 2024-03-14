const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');
const authenticateToken = require('./middlewares/authenticateToken')

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb://localhost:27017/api_users';

app.use(bodyParser.json());

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión a MongoDB establecida');
  })
  .catch(err => console.error('Error al conectar a MongoDB:', err));

// Rutas Protegidas
app.get('/users', authenticateToken, userController.getAllUsers);
app.post('/logout', authenticateToken, userController.logoutUser);

// Otras rutas 
app.post('/register', userController.registerUser);
app.post('/login', userController.loginUser);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
