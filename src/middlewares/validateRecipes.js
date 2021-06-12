const BAD_REQUEST = 400;
const INVALID = {
  'message': 'Invalid entries. Try again.'
};

const validateRecipe = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;

  if (!name || !ingredients || !preparation) return res.status(BAD_REQUEST).json(INVALID);
  next();
};

module.exports = validateRecipe;
