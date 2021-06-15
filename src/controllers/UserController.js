const UserService = require('../services/UserService');

const CREATED = 201;
const ERROR = 500;
const message = 'There is something wrong';

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await UserService.createUser(name, email, password);
    const { password: pass, ...userInfo } = newUser.ops[0];
    return res.status(CREATED).json({ user: userInfo });
  } catch (err) {
    console.log(err);
    res.status(ERROR).json({ message });
  }
};

module.exports = {
  createUser
};
