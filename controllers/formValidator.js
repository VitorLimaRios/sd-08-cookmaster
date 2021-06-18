const BAD = 400;
const INVALID = {
  message: 'Invalid entries. Try again.'
};

const validateRecipeForm = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  try {
    (!name || !ingredients || !preparation) && res.status(BAD).json(INVALID);
    next();
  } catch (error) {
    return res.status(BAD).json(error);
  }
};

module.exports = validateRecipeForm;