const { status, message } = require('../schema/status');

const validateRecipes = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
    return res.status(status.badRequest).json({ message: message.invalidEntries });
  }
  next();
};

module.exports = validateRecipes;