const loginService = require('../services/loginService');
const StatusCode = require('../messages/statusCodeMessages');

const login = async (req, res) => {
  try {
    const token = await loginService.login(req.body);

    res.status(StatusCode.OK).json({ token });
  } catch (error) {
    const { code, message } = error;
    res.status(code).json(message);
  }
};

module.exports = {
  login,
};
