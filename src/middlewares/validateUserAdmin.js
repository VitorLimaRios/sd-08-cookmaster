const model = require('../models/recipesModel');
const ERRO_401 = 401;

const validateUser = async (req, res, next) => {
  const { _id: idUser, role } = req.user;
  const { id } = req.params;

  try {
    const recipe = await model.getRecipeId(id);
    const recipeUserId = recipe[0].userId.toString();
    const userId = idUser.toString();

    if (recipeUserId === userId || role === 'admin') {
      return next();
    }

    res.status(ERRO_401).json({
      message: 'Erro de permissão',
    });
  } catch (error) {
    res.status(ERRO_401).json({
      message: 'Receita não encontrada para exclusão',
    });
  }
};

module.exports = validateUser;