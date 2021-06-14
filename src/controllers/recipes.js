const recipesServices = require('../services/recipes');

const OK = 200;
const CREATED = 201;
const NO_CONTENT = 204;

const add = async (req, res) => {
  const {
    body,
    user: { _id: userId },
  } = req;

  const recipe = { ...body, userId };

  const result = await recipesServices.add(recipe);

  return res.status(CREATED).json({ recipe: result });
};

const getAll = async (_req, res) => {
  const result = await recipesServices.getAll();

  return res.status(OK).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const result = await recipesServices.getById(id);

  return res.status(OK).json(result);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const { body: recipe, user } = req;

  const result = await recipesServices.updateById(id, recipe, user);

  return res.status(OK).json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;

  await recipesServices.deleteById(id);

  return res.status(NO_CONTENT).json();
};

const addImage = async (req, res) => {
  const { id } = req.params;
  const { path } = req.file;
  const fullPath = `localhost:3000/${path}`;

  const result = await recipesServices.addImage(id, fullPath);

  return res.status(OK).json(result);
};

const getImage = async (req, res) => {
  const { id } = req.params;

  const result = await recipesServices.getImage(id);

  return res.status(OK).json(result);
};

module.exports = {
  add,
  getAll,
  getById,
  updateById,
  deleteById,
  addImage,
  getImage,
};
