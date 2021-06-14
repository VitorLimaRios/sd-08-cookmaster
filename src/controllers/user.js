const UserService = require('../services/user');
const httpStatusCodes = require('../data/httpStatusCodes');

const create = async (req, res, next) => {
  const { name, password, email } = req.body;
  const result = await UserService.create({ name, password, email });
  if (result.err) return next(result);
  res.status(httpStatusCodes.CREATED).json({ user: result });
};

module.exports = {
  create
};
