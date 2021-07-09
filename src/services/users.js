const Joi = require('@hapi/joi');

const Users = require('../models/users');

const validCreate = Joi.object({
  username: Joi.string().required(),
  // https://stackoverflow.com/questions/57972358/joi-email-validation
  useremail: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  userpassword: Joi.string().required()
});

const validLogin = Joi.object({
  // https://stackoverflow.com/questions/57972358/joi-email-validation
  useremail: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  userpassword: Joi.string().required()
});

const create = async ({ name, email, password, role = 'user' }) => {
  const { error } =  validCreate.validate({ 
    username: name,
    useremail: email,
    userpassword: password
  });

  const allUsers = await getAll();

  const exists = allUsers.some(user => user.email === email);
  // validar schema name, email e senha
  if (error) {
    return {
      status: 400,
      error: {
        message: 'Invalid entries. Try again.'
      }
    };
  };

  // validar se email ja existe
  if (exists) {
    return {
      status: 409,
      error: {
        message: 'Email already registered' 
      }
    };
  }

  const newUser = Users.create(name, email, password, role);

  return newUser;
};

const getAll = async () => {
  const users = await Users.getAll();

  return users;
};

const login = async ({email, password}) => {
  const { error } = validLogin.validate({
    useremail: email,
    userpassword: password
  });

  if (error) {
    return {
      status: 401,
      error: {
        message: 'All fields must be filled'
      }
    };
  };

  const allUsers = await getAll();
  const exist = allUsers
    .find((user) => user.email === email && user.password === password );
  
  if (!exist) {
    return {
      status: 401,
      error: {
        message: 'Incorrect username or password' 
      }
    };
  }

  return {
    status: 200,
    user: exist
  };
};

module.exports = {
  create,
  login
};