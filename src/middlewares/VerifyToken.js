const UserService = require('../services/UserService');
const msg = require('../validators/ErrorMessages');

exports.default = async (req, res, next) => {
  const { id } = req.params;
  const token = req.headers['authorization'];
  if (!token) {
    return res
      .status(msg.status.unauthorized)
      .json({ message: msg.tokenMissed });
  }
  const data = await UserService.verifyToken(token);
  if (data.hasOwnProperty('code')) {
    return res.status(data.code).json({ message: data.message });
  }
  next();
};
