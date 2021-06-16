const LoginService = require('../services/LoginService');

const ERROR = 500;
const message = 'There is something wrong';

const login = async (req, res) => {
  try {
    const { email } = req.body;
    const { code, message } = await LoginService.login(email);
    return res.status(code).json(message);
  } catch (err) {
    res.status(ERROR).json({ message });
  }
};

module.exports = {
  login
};
