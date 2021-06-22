const LoginHandler = require('../services/LoginHandler');

const AuthenticationMiddleware = async (req, res) => {
  const {email, password} = req.body;
  const {status, ...rest} = await LoginHandler({email, password});

  return res.status(status).json({...rest});
};

module.exports = AuthenticationMiddleware;