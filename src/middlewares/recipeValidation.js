
const BAD_REQUEST = 400;
const recipeValidation = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  if(!name || !ingredients || !preparation) {
    return res.status(BAD_REQUEST).send({ message: 'Invalid entries. Try again.' });
  }
  next();
};

module.exports = recipeValidation;