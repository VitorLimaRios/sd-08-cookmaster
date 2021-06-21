const { validateCredentials } = require('./utils/validateCredentials');
const Model = require('../models/users');
const jwt = require('jsonwebtoken');

const invalidEntries = 'Invalid entries. Try again.';
const emailRegistered = 'Email already registered';
const allFields = 'All fields must be filled';
const incorrectCredentional = 'Incorrect username or password';

JWT_SECRET = 'At the end of Game of Thrones John Snow kills Daenerys Targaryen';

const createUser = async (name, email, password) => {
  // console.log('SERVICE createUser req.body', name, email, password);

  const { error } = validateCredentials({ name, email, password });
  if (error) return { message: invalidEntries };

  const userAlreadyExist = await Model.findUser(email);
  if (userAlreadyExist) return { message: emailRegistered };

  return await Model.createUser(name, email, password);
};

const login = async (email, password) => {
  // console.log('SERVICE login req.body', email, password);

  const { error } = validateCredentials({ name: 'name', email, password });
  if (error) return { message: allFields };

  const user  = await Model.findUser(email);
  if (!user || user.password !== password) return { message: incorrectCredentional };

  // console.log('SERVICE login user', user);
  const { _id, role } = user;
  const token = jwt.sign({ _id, email, role }, JWT_SECRET, {
    expiresIn: '1d',
  });

  return token;

};
  
module.exports = {
  createUser,
  login,
};
