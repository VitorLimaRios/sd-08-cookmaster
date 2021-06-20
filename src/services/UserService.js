const Model = require('../models/UserModel');

// Após a visualização do plantão em que o Franco falou sobre o joi, dei uma olhada na documentação e ajudou mt
//https://joi.dev/api/?v=17.4.0#example

const Joi = require('joi');

const schema = Joi.object({
  username: Joi.string()
    .required(),
  useremail: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  userpassword: Joi.string()
    .required(),
});

const create = async ({name, email, password, role = 'user'}) => {

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

module.exports = {
  create,
};

