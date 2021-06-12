const {
  getAllModel,
  addModel,
} = require('../../models/users/users');

const {
  valid,
  validEmail,
} = require('../../validations');

const getAllServices = async () => {
  const result = await getAllModel();
  return result;
};

const addServices = async (users) => {
  const { error } = valid.validate(users);
  if (error) return { status: 400, message: error.details[0].message };
  const onlyEmail = await validEmail(users);
  if (onlyEmail) return { status: 409, message: 'Email already registered' };
  const result = await addModel(users);
  return result;

};

module.exports = {
  getAllServices,
  addServices,
};
