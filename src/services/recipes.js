const recipesModel = require('../models/recipes');
const jwt = require('jsonwebtoken');
const { json } = require('body-parser');

const secret = 'cookmastersecret';

const isValid = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) 
    return 'Invalid entries. Try again.';

  if (typeof name !== 'string'
    || typeof ingredients !== 'string'
    || typeof preparation !== 'string')
    return 'Entries must be string.';

  return false;
};

const create = async (name, ingredients, preparation, token) => {
  if (!token) throw new Error(JSON.stringify({ message: 'jwt malformed', code: 401 }));
  
  const isUserValid = isValid(name, ingredients, preparation);
  if (isUserValid) throw new Error(JSON.stringify({ message: isUserValid, code: 400 }));
  
  const { _id } = await recipesModel.create(name, ingredients, preparation);

  const { data: { _id: userId } } = jwt.verify(token, secret);

  return {
    _id,
    userId,
    name,
    ingredients,
    preparation,
  };
};

const isLoginValid = (email, password) => {
  if (!email || !password) 
    return 'All fields must be filled';

  if (typeof email !== 'string' || typeof password !== 'string')
    return 'Entries must be string.';

  return false;
};

const emailOrPasswordInvalid = async (user, password) => {
  if (!user || user.password !== password)
    return 'Incorrect username or password';
  
  return false;
};

const login = async (email, password) => {
  const isValid = isLoginValid(email, password);
  if (isValid) throw new Error(isValid);
  
  const user = await recipesModel.getByEmail(email);

  const emailAndPassword = await emailOrPasswordInvalid(user, password);
  if (emailAndPassword) throw new Error(emailAndPassword);

  const { password: ignore, ...otherInfo } = user;

  const token = jwt.sign({ data: otherInfo }, secret, jwtConfig);

  return token;
};

module.exports = {
  create,
  login,
};
