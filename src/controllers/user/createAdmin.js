const UserService = require('../../services/user');
const httpStatusCodes = require('../../data/httpStatusCodes');
const createError = require('../../utils/createError');

module.exports = async (req, res, next) => {
  const { name, password, email } = req.body;

  if (req.user.role !== 'admin') {
    return next(createError('Only admins can register new admins', 'forbidden'));
  }

  const result = await UserService.create({ name, password, email, role: 'admin' });
  if (result.err) return next(result);

  res.status(httpStatusCodes.CREATED).json({ user: result });
};
