const jwt = require('jsonwebtoken');

const RecipeModel = require('../../models/index');
// const Service = require('../../services/index');

const secret = process.env.SECRET;

const CREATED_CODE = 201;
const BAD_REQUEST_CODE = 400;
const UNAUTHORIZED_CODE = 401;
const INVALID_ENTRIES_MESSAGE = 'Invalid entries. Try again.';
const JWT_MALFORMED = 'jwt malformed';

module.exports = async (req, res, _next) => {
  const token = req.headers.authorization;
  const { name, ingredients, preparation } = req.body;

  if (!name || !ingredients || !preparation) {
    return res.status(BAD_REQUEST_CODE).json({ message: INVALID_ENTRIES_MESSAGE });
  }

  const decoded = jwt.decode(token, secret);
  if (!decoded) {
    return res.status(UNAUTHORIZED_CODE).json({ message: JWT_MALFORMED });
  }

  const response = await RecipeModel.createRecipe({ name, ingredients, preparation });

  res.status(CREATED_CODE).json({ recipe: {...response, userId: decoded.data._id } });
};