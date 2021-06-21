const services = require('../services/recipes');

const OK = 200;
const CREATED = 201;
const NO_CONTENT = 204;
const BAD = 400;
const NOT_FOUND = 404;

const createRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation, userId } = req.body;
    const newRecipe = await services.createRecipe(
      name,
      ingredients,
      preparation,
      userId,
    );
    res.status(CREATED).json(newRecipe);
  } catch (error) {
    return res.status(BAD).json(error.message);
  }
};

const getAll = async (_req, res) => {
  try {
    const user = await services.getAll();
    return res.status(OK).json(user);
  } catch (error) {
    return res.status(BAD).json(error.message);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await services.getById(id);
    return res.status(OK).json(recipe);
  } catch (error) {
    return res.status(NOT_FOUND).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const form = req.body;
    const { id } = form.userId;
    // console.log('form: ', form);
    const result = await services.update({ id, ...form });
    return res.status(OK).json(result);
  } catch (error) {
    return res.status(BAD).json({ message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await services.remove(id);
    return res.status(NO_CONTENT).json(recipe);
  } catch (error) {
    return res.status(BAD).json({ message: error.message });
  }
};

const uploadImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { path } = req.file;
    const imagePath = `localhost:3000/${path}`;
  
    const result = await services.uploadImage(id, imagePath);
    return res.status(OK).json(result);
    
  } catch (error) {
    return res.status(BAD).json({ message: error.message });
  }
};

module.exports = {
  createRecipe,
  getAll,
  getById,
  update,
  remove,
  uploadImage,
}; 