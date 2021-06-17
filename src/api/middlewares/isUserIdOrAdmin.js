const Service = require('../services').Recipes;

module.exports = async (req, _res, next) => {
  const { _id, role } = req.resource;
  
  const { result: recipe } = await Service.findById(req.params.id);
  if (!recipe) return next({ code: 'not_found', message: 'recipe not found' });
  if (role === 'admin') {
    req.recipe = recipe;
    return next();
  };
  if (String(recipe.userId) !== String(_id)) {
    return next({ code: 'unauthenticated', message: 'jwt malformed' });
  }
  req.recipe = recipe;
  next();
};
