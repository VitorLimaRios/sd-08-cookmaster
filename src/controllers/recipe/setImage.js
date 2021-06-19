const RecipeService = require('../../services/recipe');

module.exports = async (req, _res, next) => {
  const { id } = req.params;
  const { id: userId, role } = req.user;

  const image = `localhost:3000/src/uploads/${id}.jpeg`;
  const result = await RecipeService.setImage(id, image, { userId, role });

  if (result.err) return next(result);

  req.recipe = result;

  next();
};
