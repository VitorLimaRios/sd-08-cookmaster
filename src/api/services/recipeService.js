const userModel = require('../models/userModel');
const {status, message} = require('../services/statusAndMessages');

const recipeCheck = async(req, res, next) => {
  const {name, ingredients, preparation} = req.body;
  if (!name || !ingredients || !preparation) {
    return res.status(status.BAD_REQUEST).json(message.invalidEntries);
  }
  return next();
};

module.exports = {recipeCheck};