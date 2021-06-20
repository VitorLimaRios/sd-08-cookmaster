const Model = require('../models/UserModel');

// Após a visualização do plantão em que o Franco falou sobre o joi, dei uma olhada na documentação e ajudou mt
//https://joi.dev/api/?v=17.4.0#example

const Joi = require('joi');



const create = async ({name, email, password, role = 'user'}) => {

  const schema = Joi.object({
    username: Joi.string()
      .required(),
    useremail: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required(),
    userpassword: Joi.string()
      .required(),
  });

  const validations = schema
    .validate({username: name, useremail: email, userpassword: password});

  const allResults = await Model.getAll();

  if(allResults.some((item) => item.email === email)) {
    throw new Error(JSON.stringify({
      message: 'Email already registered',
      status: 409
    }));
  }

  if(validations.error) {
    throw new Error(JSON.stringify({
      message: 'Invalid entries. Try again.',
      status: 400
    }));
  }
  return Model.create(name, email, password, role);
};

const login = async ({email, password}) => {
  const schema = Joi.object({
    useremail: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required(),
    userpassword: Joi.string()
      .required(),
  });
  const validations = schema
    .validate({useremail: email, userpassword: password });
  if(validations.error) {
    throw new Error(JSON.stringify({
      message: 'All fields must be filled',
      status: 401
    }));
  }

  const allResults = await Model.getAll();

  const result = allResults
    .find((user) => user.email === email && user.password === password);

  if(!result) {
    throw new Error(JSON.stringify({
      message: 'Incorrect username or password',
      status: 401
    }));
  }
  
  return {status: 200, user:result};
};

module.exports = {
  create,
  login
};

