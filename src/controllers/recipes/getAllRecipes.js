const jwt = require('jsonwebtoken');

const RecipeModel = require('../../models/index');

const secret = process.env.SECRET;

const SUCCESS_CODE = 200;
const BAD_REQUEST_CODE = 400;
const UNAUTHORIZED_CODE = 401;
const INVALID_ENTRIES_MESSAGE = 'Invalid entries. Try again.';
const JWT_MALFORMED = 'jwt malformed';

module.exports = async (req, res, _next) => {
  const token = req.headers.authorization;

  const decoded = jwt.decode(token, secret);
  // if (!decoded) {
  //   return res.status(UNAUTHORIZED_CODE).json({ message: JWT_MALFORMED });
  // }

  const response = await RecipeModel.getAllRecipes();

  res.status(SUCCESS_CODE).json(response);
};
