const usersModels = require('../models/usersModels');
const { status, message } = require('../schema/status');

const postUser = async (name, email, password) => {
  return await usersModels.registerUser(name, email, password);
};

const loginIsValid = async (userLogin) => {
  if (!userLogin.email || !userLogin.password) {
    return {
      isError: true,
      status: status.unauthorized,
      message: message.allFilled,
    };
  }
  const dbUser = await usersModels.findUserByEmail(userLogin.email);

  if (!dbUser || userLogin.password !== dbUser.password) {
    return {
      isWrong: true,
      status: status.unauthorized,
      message: message.incorrectFields,
    };
  }
  return dbUser;
};

const login = async (userLogin) => {
  const result = await loginIsValid(userLogin);
  delete result.password;
  return result;
};

module.exports = {
  postUser,
  loginIsValid,
  login,
};
