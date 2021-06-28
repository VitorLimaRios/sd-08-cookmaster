const LoginService = require('../services/Login');
const verifyLogin = require('../services/utils/LoginSchema');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'FULANO ROUBOU PAO NA CASA DO JOAO';
const {OK}=require('../services/utils/variableStatus');

const login = async (req, res, next) => {
  const { error } = verifyLogin.validate(req.body);
  if (error) {
    return next(error);
  }

  const { email, password } = req.body;
  const verifyEmail = await LoginService.login({ email, password });
 

  if (verifyEmail.error) {
    return next(verifyEmail.error);

  }
  const payload = {
    _id: verifyEmail._id,
    _email: verifyEmail.email,
    role: verifyEmail.role
  };
  const token = jwt.sign(payload, JWT_SECRET);

  return res.status(OK).json({ token });
};

module.exports = {
  login
};