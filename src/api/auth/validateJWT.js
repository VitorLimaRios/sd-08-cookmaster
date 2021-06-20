const jwt = require('jsonwebtoken');
const User = require('../users/models/User');

const STATUS_ERRO = 401;
const secret = '123456789';

module.exports = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(STATUS_ERRO).json({ error: 'Token não encontrado' });
  }

  try {
    const decoded = jwt.verify(token, secret);

    const user = await User.find({ email: decoded.data.email });

    if (!user) {
      return res
        .status(STATUS_ERRO)
        .json({ message: 'Erro ao procurar usuário do token.' });
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(STATUS_ERRO).json({ message: 'jwt malformed' });
  }
};
