const recipesService = require('../services/recipes');

const OK = 200;
const CREATED = 201;
const UNAUTHORIZED = 401;

const create = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const token = req.headers.Authorization;
    console.log(token);
    const recipe = await recipesService.create(name, ingredients, preparation, token);
    res.status(CREATED).json({ recipe });
  } catch (e) {
    const { code, message } = JSON.parse(e.message);
    return res.status(code).json({ message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await recipesService.login(email, password);
    res.status(OK).json({ token });
  } catch (e) {
    return res.status(UNAUTHORIZED).json({ message: e.message });
  }
};

module.exports = {
  create,
  login,
};
