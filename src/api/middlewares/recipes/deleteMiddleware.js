const jwt = require('jsonwebtoken');
const { deleteRecipe } = require('../../controllers/recipes/Recipes');
const { getRecipeById } = require('../../services/recipes/Recipes');
const { KEY, ERRORS } = require('../../utils/consts');


module.exports = async (req, res, next) => {
  const { eNotToken, e500 } = ERRORS;
  const { id } = req.params;
  const { authorization } = req.headers;
  
  if (!authorization) {
    return res.status(eNotToken.status).json({ message: eNotToken.message });
  }

  const recipe = await getRecipeById(id);

  try {
    const decode = jwt.verify(authorization, KEY);
    const { _id, role } = decode.data;
    switch(true) {
    case recipe.userId === _id || role === 'admin':
      return next();
    default:
      return res.status(e500.status).json({ message: e500.message });
    }
  } catch (err) {
    return res.status(e500.status).json({ message: e500.message });
  }
};