const jwt = require('jsonwebtoken');
const {
  INVALID_TOKEN,
  INVALID_ENTRIES,
  JWT_MALFORMED,
} = require('../shared/errorMessage');
const { HTTP_400_STATUS, HTTP_401_STATUS } = require('../shared/httpTypes');
const userModels = require('../models/user.models');

const authenticationByToken = async (req, res, cb) => {
  const token = req.headers['authorization'].split(' ')[1];
  const secret = 'seusecretdetoken';

  if (!token) {
    return res.status(HTTP_401_STATUS).json({
      message: JWT_MALFORMED,
    });
  }

  const decoded = jwt.verify(token, secret);
  const user = await userModels.findOneUserByEmail(decoded.email);

  if (!user) {
    return res.status(HTTP_400_STATUS).json({
      message: INVALID_TOKEN,
    });
  }
  cb();
};

const recipeValidate = async (req, res, cb) => {
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
    res.status(HTTP_400_STATUS).json({
      message: INVALID_ENTRIES,
    });
  }
  cb();
};

module.exports = {
  authenticationByToken,
  recipeValidate,
};
