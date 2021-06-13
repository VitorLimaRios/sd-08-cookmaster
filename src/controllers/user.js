const UserService = require('../services/user');

const CREATED = 201;

const create = async (req, res, next) => {
  const { name, password, email } = req.body;
  const result = await UserService.create({ name, password, email });
  if (result.err) return next(result);
  res.status(CREATED).json({ user: result });
};

module.exports = {
  create
};
