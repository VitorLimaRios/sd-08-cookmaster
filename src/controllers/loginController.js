const { loginServices } = require('../services');
const {
  makeLogin,
} = loginServices;

const OK = 200;
const BAD = 400;
const UNAUTHORIZED = 401;

const usersLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await makeLogin(email, password);

    if (result.message === 'All fields must be filled')
      return res.status(UNAUTHORIZED).json(result);

    console.log(result.message);
    if (result.message === 'Incorrect username or password')
      return res.status(UNAUTHORIZED).json(result);

    return res.status(OK).json(result);
  } catch (error) {
    console.error(error);
    return res.status(BAD).json(error);
  }
};

module.exports = {
  usersLogin,
};
