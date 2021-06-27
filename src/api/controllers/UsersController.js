const Users = require('../services/Users');

const INTERNAL_SERVER_ERROR = 500;
const CREATED = 201;

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

module.exports = {
  newUser
};