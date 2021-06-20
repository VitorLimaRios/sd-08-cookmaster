const model = require('../models/Users');
const { userSchema } = require('./validation');

const HTTP = require('../utils/httpStatusCodes');
const generateError = require('../utils/generateError');

const createUser = async (user) => {
  try {
    if (userSchema.validate(user).error) {
      throw generateError(HTTP.BAD_REQUEST, 'Invalid entries. Try again.');
    }

    const isEmailUnique = await model.isEmailRegistered(user.email);
    if (isEmailUnique) {
      throw generateError(HTTP.CONFLICT, 'Email already registered');
    }

    return {
      status: HTTP.CREATED,
      result: await model.createUser(user),
    };
  } catch (err) {
    return err;
  }
};

module.exports = { createUser };
