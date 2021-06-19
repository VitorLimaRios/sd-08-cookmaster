const UserService = require('../../services/user');
const { STATUS } = require('../../constants');

module.exports = async (req, res, next) => {
  const { name, password, email } = req.body;

  const result = await UserService.createUser({ name, password, email });
  // console.log(result);
  if (result.err) return next(result);

  res.status(STATUS.CREATED).json({ user: result });
};
