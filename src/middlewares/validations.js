const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');

const UserModel = require('../models/userModel');
const RecipeModel = require('../models/recipeModel');

const secret = 'projectCookmaster';

const status = {
  ok: 200,
  created: 201,
  noContent: 204,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  conflict: 409,
};

const mssg = {
  emailRegistered: 'Email already registered',
  invalidEntries: 'Invalid entries. Try again.',
  fieldsFilled: 'All fields must be filled',
  incorretInputs: 'Incorrect username or password',
  recipeNotFound: 'recipe not found',
  registerAdmin: 'Only admins can register new admins',
  missingToken: 'missing auth token',
  jwtMalformed: 'jwt malformed',
};

const verifyUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/.test(email);
  const emailRegistered = await UserModel.findByEmailUser(email);

  if (emailRegistered) {
    return res.status(status.conflict).json({ message: mssg.emailRegistered });
  }

  if (!name || !email || !password || !emailRegex) {
    return res.status(status.badRequest).json({ message: mssg.invalidEntries });
  }

  next();
};

const verifyLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await UserModel.findByEmailUser(email);

  if (!email || !password) {
    return res.status(status.unauthorized).json({ message: mssg.fieldsFilled });
  }
  
  if (!user || user.password !== password || user.email !== email) {
    return res.status(status.unauthorized).json({ message: mssg.incorretInputs });
  }

  next();
};

const verifyRecipe = (req, resp, next) => {
  const { name, ingredients, preparation } = req.body;
  
  if (!name || !ingredients || !preparation) {
    return resp.status(status.badRequest).json({ message: mssg.invalidEntries });
  }
  
  next();
};

const verifyID = async (req, res, next) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(status.notFound).json({ message: mssg.recipeNotFound });
  }
  
  const recipe = await RecipeModel.findByIdRecipe(id);
  
  if (!recipe) {
    return res.status(status.notFound).json({ message: mssg.recipeNotFound });
  }

  next();
};

const checkPermission = (req, res, next) => {
  const { role } = req.user;
  
  if (role !== 'admin') {
    return res.status(status.forbidden).json({ message: mssg.registerAdmin });
  }

  next();
};

const validateJWT = (req, res, next) => {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(status.unauthorized).json({ message: mssg.missingToken });
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded.user;
  } catch (err) {
    return res.status(status.unauthorized).json({ message: mssg.jwtMalformed });
  }

  next();
};

module.exports = {
  verifyUser,
  verifyLogin,
  verifyRecipe,
  verifyID,
  checkPermission,
  validateJWT,
  status,
};
