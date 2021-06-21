const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const secret = 'busquemcomercimento';

const code = {
  UNAUTHORIZED: 401,
};

const verifyJwt = async (req, res, next) => {
  const token = req.headers['authorization'];

  if(!token) {
    return res.status().json({ message: 'jwt malformed'});
  }

  try {
    const decoded = jwt.verify(token, secret);
    const getAll = await userModel.getAll();

    const findUser = await getAll.find((data) => 
      data.email === decoded.data.email
    );

    if(!findUser) {
      return res
        .status(code.UNAUTHORIZED)
        .json({ message: 'Erro ao procurar usuário do token.'});
    }

    req.user = findUser;

    next();

  } catch (err) {
    return res.status(code.UNAUTHORIZED).json({ message: err.message });
  }
};

module.exports = {
  verifyJwt
};
