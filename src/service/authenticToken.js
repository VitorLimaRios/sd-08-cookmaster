const jwt = require('jsonwebtoken');
const findModelUser = require('../model/userModel');
// modelo visto no course //
const secret = 'mobileLegendIsGood';

const CODE_STATUS_UNAUTHORIZED = 401;
const mensagem = {
  message: 'jwt malformed',
};

const validateJWT = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(CODE_STATUS_UNAUTHORIZED)
      .json(mensagem);
  };

  try {
    const decoded = jwt.verify(token, secret);
    const id = await findModelUser.getOneUser(decoded.data.email);

    if (!id) {
      return res
      .status(401)
      .json({ message: 'Erro ao procurar usuário do token.' });
    };
    console.log(id._id);
    req.id = id._id;
  
    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

module.exports = validateJWT;
