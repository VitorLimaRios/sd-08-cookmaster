const Service = require('../services').Login;
const tcw = require('../utils').tryCatchWrapper;

const STATUS_OK = 200;

const login = tcw(async (req, res, next) => {
  const { result, error } = await Service.login(req.body);
  if (error) return next(error);
  res.status(STATUS_OK).json(result);
});

module.exports = {
  login,
};
