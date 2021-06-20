const model = require('../models/usersModels');
const { validateEmail } = require('../middlewares/userMiddleware');

const jwt =  require('jsonwebtoken');

const secret = 'secretjwt';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256'
};

async function createUser(user) {
  const  { name, email, password } = user;

  if (!name || !email || !password){
    return {code: 400, message :{message: 'Invalid entries. Try again.'}};
  };

  if(!validateEmail(email)) {
    return {code: 400, message :{message: 'Invalid entries. Try again.'}};
  };

  const IsEmail = await model.findByEmail(email);
  if(IsEmail) {
    return {code: 409, message :{message: 'Email already registered'}};
  }

  user = {...user, role: 'user'};

  const result = await model.createUser(user);
  result.password = undefined;
  return {code: 201, message : {user: result }};
};

async function loginUser(credentials) {
  const { email, password } = credentials;

  if ( !email || !password){
    return {code: 401, message: {message: 'All fields must be filled'}};
  };

  if(!validateEmail(email)) {
    return {code: 401, message: {message: 'Incorrect username or password'}};
  };

  const user = await model.findByEmail(email);

  if (!user || password !== user.password){
    return {code: 401, message: {message: 'Incorrect username or password'}};
  };

  user.name = undefined;
  user.password = undefined;

  const token = jwt.sign({user}, secret, jwtConfig);
  return {code: 200, message: { token }};
}

module.exports = { createUser, loginUser };
