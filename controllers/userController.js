const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Controlador para obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Controlador para registrar un nuevo usuario
exports.registerUser = async (req, res) => {
  try {
    // Verifica si el usuario ya existe
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Encripta la contraseña
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Crea un nuevo usuario con la contraseña encriptada
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword, // Guarda la contraseña encriptada en la base de datos
      // Otros campos del usuario, si los hay
    });
    await newUser.save();

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para iniciar sesión
exports.loginUser = async (req, res) => {
  try {
    // Busca al usuario por su correo electrónico
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Verifica la contraseña
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Genera un token de acceso
    const token = jwt.sign({ userId: user._id }, 'secreto', { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para cerrar sesión (opcional, si estás utilizando tokens de sesión)
exports.logoutUser = async (req, res) => {
  // Simplemente podrías invalidar el token aquí, pero eso depende de tu implementación
  res.status(200).json({ message: 'Cierre de sesión exitoso' });
};