const jwt = require('jsonwebtoken');
const status = require('../statuscode/status');

const userModels = require('../models/userModels');
const recipesModels = require('../models/recipesModels');

const secret = 'trybe-t8';


const validateAllRecipes = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  try {
    if (!name || !ingredients || !preparation) {
      return res.status(status.BAD_REQUEST).json({ message: status.INVALID_ENTRIES });
    }
  } catch (err) {
    return res.status(status.INTERNAL_SERVER_ERROR).json({
      message: 'erro na validação'
    });
  }
  next();
};

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(status.UNAUTHORIZED).json({ message: status.MALFORMED });
  }
  try {
    const decode = jwt.verify(token, secret);

    // console.log(token);
    if (!decode) {
      return res.status(status.UNAUTHORIZED).json({ message: status.MALFORMED });
    }
    else {
      // adcionar uma nova informação

      const modelsUser = await userModels.getByEmail(decode.data);

      if (modelsUser) {
        const { password, ...other } = modelsUser;
        // console.log(other);
        req.user = other;
      }

      return next();

    }
  } catch (err) {
    return res.status(status.UNAUTHORIZED).json({ message: status.MALFORMED });
  }

};

const validateJWTRecipes = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(status.UNAUTHORIZED).json({ message: status.MISSING });
  }
  try {
    const decode = jwt.verify(token, secret);

    // console.log(token);
    if (!decode) {
      return res.status(status.UNAUTHORIZED).json({ message: status.MALFORMED });
    }
    else {
      // adcionar uma nova informação

      const modelsUser = await userModels.getByEmail(decode.data);

      if (modelsUser) {
        const { password, ...other } = modelsUser;
        // console.log(other);
        req.user = other;
      }

      return next();

    }
  } catch (err) {
    return res.status(status.UNAUTHORIZED).json({ message: status.MALFORMED });
  }

};


module.exports = {
  validateAllRecipes,
  validateJWT,
  validateJWTRecipes,
};