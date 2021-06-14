const FIVE_HUNDRED = 500;

const usersService = require('../services/usersService');

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const result = await usersService.addUserService({ name, email, password });
    res.status(result.statusCode).json(result.json);
  } catch (error) {
    res.status(FIVE_HUNDRED).json({
      message: 'Erro',
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await usersService.loginServices({ email, password });
    res.status(result.statusCode).json(result.json);
  } catch (error) {
    res.status(FIVE_HUNDRED).json({
      message: 'Erro',
    });
  }
};

const createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const result = await usersService.addAdmin({ name, email, password });
    res.status(result.statusCode).json(result.json);
  } catch (error) {
    res.status(FIVE_HUNDRED).json({
      message: 'Erro',
    });
  }
};

module.exports = {
  createUser,
  loginUser,
  createAdmin
};
