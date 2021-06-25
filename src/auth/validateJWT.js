const jwt = require('jsonwebtoken');
const Users = require('../models/Users');
const StatusCode = require('../api/schemas/StatusCode');

module.exports = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(StatusCode.UNAUTHORIZED).json({ error: 'Token não encontrado' });
  }

  try {
    const decoded = jwt.verify(token, segredo);
    const user = await Users.findUser(decoded.data.name);

    if (!user) {
      return res.status(StatusCode.UNAUTHORIZED)
        .json({ message: 'Erro ao procurar usuário do token.' });
    }
    req.user = user;

    next();
  } catch (err) {
    return res.status(StatusCode.UNAUTHORIZED).json({ message: err.message });
  }
};
