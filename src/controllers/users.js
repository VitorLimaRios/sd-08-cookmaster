const jwt = require('jsonwebtoken');
const Users = require('../services/users');
const Login = require('../models/users');

const HTTP_OK = 200;
const HTTP_Created = 201;
const HTTP_Unauthorized = 401;
const HTTP_Conflict = 409;

const emailAlreadyRegistered = { 'message': 'Email already registered' };
const allFieldsMustBeFilled = { 'message': 'All fields must be filled' };
const incorrectUsernameOrPassword = { 'message': 'Incorrect username or password' };

const getAll = async (req, res) => {
  const users = await Users.getAll();

  res.status(HTTP_OK).json(users);
};

const create = async (req, res) => {
  const { name, email, password } = req.body;

  const newUser = await Users.create(name, email, password);
  
  if (newUser) {
    res.status(HTTP_Created).json(newUser);
  } else {
    res.status(HTTP_Conflict).json(emailAlreadyRegistered);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) { 
    return res.status(HTTP_Unauthorized).json(allFieldsMustBeFilled); 
  }

  try {
    const user = await Login.getEmail(email);
    // console.log(user);
  
    const {
      _id: registration_id,
      email: registration_email,
      password: registration_password,
      role: registration_role } = user;
    // console.log(registration_password);
  
    if (!registration_email || registration_password !== password) {
      return res.status(HTTP_Unauthorized).json(incorrectUsernameOrPassword); 
    }

    const JWT_SECRET = 'meuSegredoSuperSecreto';

    const jwtConfig = {
      expiresIn: '1d',
      algorithm: 'HS256',
    };

    const token = jwt.sign(
      { id: registration_id, email: registration_email, role: registration_role },
      JWT_SECRET,
      jwtConfig
    );
    // console.log(token);

    res.status(HTTP_OK).json({ token });
  } catch (error) {
    res.status(HTTP_Unauthorized).json(incorrectUsernameOrPassword);
  }
};

module.exports = {
  getAll,
  create,
  login
};