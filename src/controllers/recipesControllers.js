const status = require('./status');
const JWT = require('jsonwebtoken');
const { ObjectID } = require('mongodb');
const multer = require('multer');
const { 
  create, 
  getAll,
  getOne,
  updateOne,
  deleteOne
} = require('../models/recipesModels');
const { find: findOne } = require('../models/usersModels');


const createRecipe = async (req, res, next) => {
  const secret = 'sherif';
  const token = req.headers.authorization;
  if(!token) return next({
    status: status.UNAUTHORIZED,
    message: status.MALFORMED,
  });

  try {
    const decoded = JWT.verify(token, secret);
    const { name, ingredients, preparation } = req.body;
    const { id } = decoded;
    const insertedID = await create(name, ingredients, preparation, id);
    res.status(status.CREATED)
      .json({ recipe: { name, ingredients, preparation, userId: id, _id: insertedID}});
  } catch (error) {
    next({
      status: status.UNAUTHORIZED,
      message: status.MALFORMED,
    });
  }
};

const checkBody = (req, _res, next) => {
  const data = req.body;
  if(!data.name || !data.ingredients || !data.preparation) return next({
    status: status.INVALID,
    message: status.INVALID_M,
  });
  next();
};

const getAllRecipes = async (_req, res, next) => {
  try {
    const result = await getAll();
    res.status(status.OK).json(result);
  } catch (error) {
    next({
      status: status.ERRO,
      message: error.message
    });
  }
};

const getOneRecipe = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await getOne(id);
    if(!result) return next({
      status: status.NOTFOUND,
      message: status.NOTFOUND_M,
    });
    res.status(status.OK).json(result);
  } catch (error) {
    next({
      status: status.ERRO,
      message: 'Funcao getOne deu erro',
    });
  }
};

const updateRecipe = async (req, res, next) => {
  const secret = 'sherif';
  const token = req.headers.authorization;
  const recipeID = req.params.id;

  try {
    const decoded = JWT.verify(token, secret);
    const { name, ingredients, preparation } = req.body;
    const { id: userId } = decoded;
    const info = { name, ingredients, preparation, userId };
    await updateOne(recipeID, info);
    res.status(status.OK)
      .json({_id: recipeID, ...info});
  } catch (error) {
    next({
      status: status.UNAUTHORIZED,
      message: status.MALFORMED,
    });
  }
};

const deleteRecipe = async (req, res, next) => {
  const recipeID = req.params.id;

  try {
    await deleteOne(recipeID);
    res.status(status.DELETE).json();
  } catch (error) {
    next({
      status: status.ERRO,
      message: error.message,
    });
  }
};

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback( null, 'src/uploads');
  },
  filename: (req, _file, callback) => {
    callback( null, `${req.params.id}.jpeg`);
  },
});
const upload = multer({storage});

const checkRecipeID = (req, res, next) => {
  const recipeID = req.params.id;
  if(!ObjectID.isValid(recipeID)) return next({
    status: status.NOTFOUND,
    message: status.NOTFOUND_M,
  });
  next();
};

const checkToken = async (req, res, next) => {
  const secret = 'sherif';
  const token = req.headers.authorization;
  if(!token) return next({
    status: status.UNAUTHORIZED,
    message: status.MISSING,
  });

  try {
    await JWT.verify(token, secret);
    next();
  } catch (error) {
    next({
      status: status.UNAUTHORIZED,
      message: status.MALFORMED,
    });
  }
};

const updateRecipeFile = async (req, res, next) => {
  const recipeID = req.params.id;

  try {
    const info = { image: `localhost:3000/src/uploads/${recipeID}.jpeg`};
    await updateOne(recipeID, info);
    const result = await getOne(recipeID);
    res.status(status.OK).json({ ...result, ...info});
  } catch (error) {
    next({
      status: status.ERRO,
      message: error.message,
    });
  }
};


module.exports = {
  createRecipe,
  checkBody,
  getAllRecipes,
  checkRecipeID,
  checkToken,
  getOneRecipe,
  updateRecipe,
  deleteRecipe,
  updateRecipeFile,
  upload,
};