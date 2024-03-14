const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Token de autenticación no proporcionado' });
  }

  jwt.verify(token, 'secreto', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token de autenticación inválido' });
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
