const jwt = require('jsonwebtoken');
const findModelUser = require('../model/userModel');
// modelo visto no course //
const secret = 'mobileLegendIsGood';

const CODE_STATUS_UNAUTHORIZED = 401;
const mensagem = {
  message: 'jwt malformed',
};
const mensagemNoToken = {
  message: 'missing auth token',
}

const validateJWT = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(CODE_STATUS_UNAUTHORIZED)
      .json(mensagemNoToken);
  };

  try {
    const decoded = jwt.verify(token, secret);
    const id = await findModelUser.getOneUser(decoded.data.email);

    if (!id) {
      return res
        .status(CODE_STATUS_UNAUTHORIZED)
        .json(mensagem);
    };

    req.id = id._id;
  
    next();
  } catch (err) {
    return res.status(CODE_STATUS_UNAUTHORIZED).json({ message: err.message });
  }
};

module.exports = validateJWT;
