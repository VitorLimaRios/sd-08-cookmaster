const Users = require('../services/Users');

const INTERNAL_SERVER_ERROR = 500;
const CREATED = 201;
const OK = 200;

const newUser = async (req, res) => {
  const userBody = req.body;
  const user = await Users.newUser(userBody);

  try {
    if (user.error) return res.status(user.error.code)
      .json({ message: user.error.message });

    return res.status(CREATED).json(user);
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal Error', error });
  }
};

const login = async (req, res) => {
  const userFromBody = req.body;
  console.log('controller =>', userFromBody);
  const user = await Users.login(userFromBody);

  try {
    if (user.error) return res.status(user.error.code)
      .json({ message: user.error.message });

    return res.status(OK).json({ token: user.token });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal Error', error }); 
  }
};

module.exports = {
  newUser,
  login
};