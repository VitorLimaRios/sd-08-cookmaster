const jwt = require('jsonwebtoken');
const Users = require('../models/Users');

const secret = 'something'; 

module.exports = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'Token não encontrado' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    const user = await Users.findById(decoded._id);
    
    if (!user) {
      return res.status(401)
        .json({ message: 'Erro ao procurar usuário do token.' });
    }
    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};