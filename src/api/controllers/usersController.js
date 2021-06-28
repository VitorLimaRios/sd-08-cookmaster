// const joi = require('joi');
const usersService = require('../services/usersService');
const STATUS = {
  created: 201,
};


// const validateBody = (body) => (
//   joi.object({
//     name: joi.string().required(),
//     email: joi.string().email().required(),
//     password: joi.string().required(),
//   }).validate(body)
// );

const createUser = async (req, res) => {
  const { body } = req;
  // const { error } = validateBody(body);
  const user = await usersService.createUser(body);
  return res.status(STATUS.created).json(user);
};

module.exports = {
  createUser,
};
