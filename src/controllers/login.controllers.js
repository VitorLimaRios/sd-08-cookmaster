const jwt = require('jsonwebtoken');

const { HTTP_200_STATUS } = require('../shared/httpTypes');

const secret = 'seusecretdetoken';
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  const tokenGeneration = jwt.sign({ email, password }, secret, jwtConfig);

  return res.status(HTTP_200_STATUS).json({
    token: `Bearer ${tokenGeneration}`,
  });
};

module.exports = {
  signIn,
};
