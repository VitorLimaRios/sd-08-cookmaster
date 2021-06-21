const userModel = require('../models/userModel');

const add = async (name, email, password) => {
  const findEmailUser = await userModel.getByEmail(email);
  if ([!name, !email, !password].includes(true)) {
    return undefined;
  }
  const validEmail = () =>
    /^[A-Za-z0-9.-]+@[A-Za-z0-9]+(\.[A-Za-z]{3}|\.[A-Za-z]{3}\.[A-Za-z]{2})$/.test(
      email
    );
  if (!validEmail()) {
    return undefined;
  }
  if (findEmailUser) {
    return null;
  }
  const addedUser = await userModel.add(name, email, password);
  return addedUser;
};

module.exports = {
  add,
};
