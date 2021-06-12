const COLLECTION_ADMINS = 'admins';
const COLLECTION_RECIPES = 'recipes';
const COLLECTION_USERS = 'users';
const DB_NAME = 'Cookmaster';
const EMAIL_REGEX = /\S+@\S+\.\S+/;
const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';
const MONGO_DB_URL_LOCAL = 'mongodb://localhost:27017/Cookmaster';
const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};
const STATUS_200 = 200;
const STATUS_201 = 201;
const STATUS_204 = 204;
const STATUS_400 = 400;
const STATUS_401 = 401;
const STATUS_404 = 404;
const STATUS_409 = 409;
const KEY = 'Trybe';
const ERRORS = {
  eInput: {
    status: STATUS_400,
    message: 'Invalid entries. Try again.',
  },

  eDuplicate: {
    status: STATUS_409,
    message: 'Email already registered',
  },

  eLoginEmpty: {
    status: STATUS_401,
    message: 'All fields must be filled',
  },

  eLoginInvalid: {
    status: STATUS_401,
    message: 'Incorrect username or password'
  }
};
const JWT_CONFIG = {
  expiresIn: '1d',
  algorithm: 'HS256'
};

module.exports = {
  COLLECTION_ADMINS,
  COLLECTION_RECIPES,
  COLLECTION_USERS,
  DB_NAME,
  EMAIL_REGEX,
  ERRORS,
  JWT_CONFIG,
  KEY,
  MONGO_DB_URL,
  MONGO_DB_URL_LOCAL,
  OPTIONS,
  STATUS_200,
  STATUS_201,
  STATUS_204,
  STATUS_400,
  STATUS_401,
  STATUS_409,
};
