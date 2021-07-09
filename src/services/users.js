const Joi = require('@hapi/joi');

const Users = require('../models/users');

const valid = Joi.object({
  username: Joi.string().required(),
  // https://stackoverflow.com/questions/57972358/joi-email-validation
  useremail: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  userpassword: Joi.string().required()
});

const create = async ({ name, email, password, role = 'user' }) => {
  const validation =  valid.validate({ 
    username: name,
    useremail: email,
    userpassword: password
  });
  
  const allUsers = await getAll();

  // validar se email ja existe
  const exists = allUsers.some(user => user.email === email);

  if (validation.error) {
    return {
      status: 400,
      error: {
        message: 'Invalid entries. Try again.'
      }
    };
  };

  if (exists) {
    return {
      status: 409,
      error: {
        message: 'Email already registered' 
      }
    };
  }

  // validar schema name, email e senha
  

  // if(validation.error) {
  //   throw new Error(JSON.stringify({
  //     message: 'Invalid entries. Try again.',
  //     status: 400
  //   }));
  // }

  const newUser = Users.create(name, email, password, role);

  return newUser;
};

const getAll = async () => {
  const users = await Users.getAll();

  return users;
};

module.exports = {
  create,
};