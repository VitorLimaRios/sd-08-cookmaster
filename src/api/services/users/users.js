const jwt = require('jsonwebtoken');

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const secret = 'tokenSecret';

const {
  getAllModel,
  addModel,
  registerRecipesModel,
} = require('../../models/users/users');

const {
  valid,
  validEmail,
  validLogin,
  validRecipes,
} = require('../../validations');

const getAllServices = async () => {
  const result = await getAllModel();
  return result;
};

const addServices = async (users) => {
  const { error } = valid.validate(users);
  if (error) return { status: 400, message: error.details[0].message };
  const onlyEmail = await validEmail(users.email);
  if (onlyEmail) return { status: 409, message: 'Email already registered' };
  const result = await addModel(users);
  return result;
};

const generateToken = async (user) => {
  const { error } = validLogin.validate(user);
  if (error) return { status: 401, message: error.details[0].message };
  const findEmail = await validEmail(user.email);
  if (findEmail === null) {
    return { status: 401, message: 'Incorrect username or password' };
  };
  let bool = true;
  if (!findEmail) bool = false;
  const payload = {
    _id: findEmail._id,
    email: user.email,
    role: bool,
  };
  const token = jwt.sign(payload, secret, jwtConfig);
  return token;
};

const registerRecipes = async(recipes) => {
  const { error } = validRecipes.validate(recipes);
  if (error) return { status: 400, message: error.details[0].message };
  const recipe = await registerRecipesModel(recipes);
  return recipe;
};

module.exports = {
  getAllServices,
  addServices,
  generateToken,
  registerRecipes,
};
