const recipesService = require('../services/recipes');

const OK = 200;
const CREATED = 201;
const NO_CONTENT = 204;

const create = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const token = req.headers['authorization'];
    recipesService.verifyToken(token);
    const recipe = await recipesService.create(name, ingredients, preparation, token);
    return res.status(CREATED).json({ recipe });
  } catch (e) {
    const { code, message } = JSON.parse(e.message);
    return res.status(code).json({ message });
  }
};

const getAll = async (_req, res) => {
  const recipes = await recipesService.getAll();
  return res.status(OK).json(recipes);
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipes = await recipesService.getById(id);
    return res.status(OK).json(recipes);
  } catch (e) {
    const { code, message } = JSON.parse(e.message);
    return res.status(code).json({ message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const reqBody = req.body;
    const token = req.headers['authorization'];
    recipesService.verifyToken(token);
    const newRecipe = await recipesService.update(id, reqBody, token);
    return res.status(OK).json(newRecipe);
  } catch (e) {
    const { code, message } = JSON.parse(e.message);
    return res.status(code).json({ message });
  }
};

const erase = async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.headers['authorization'];
    recipesService.verifyToken(token);
    await recipesService.erase(id);
    res.status(NO_CONTENT).json({ message: 'Recepi erased' });
  } catch (e) {
    const { code, message } = JSON.parse(e.message);
    return res.status(code).json({ message });
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  erase,
};
