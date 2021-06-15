const ServicesRecipe = require('../services/servicesRecipe');
const CODE = require('../error/code');

class ControllerRecipe {
  constructor() {
  }

  static _formatNewRecipe(data) {
    const newRecipe = {
      name: data.name,
      ingredients: data.ingredients,
      preparation: data.preparation,
      userId: data.id,
    };
    return newRecipe;
  }

  async create(req, res, next) {
    try {
      const serviceRecipe = new ServicesRecipe();
      const dataRecipe = req.body;
      const dataUser = req.payload;
      const newRecipe = ControllerRecipe._formatNewRecipe({
        ...dataRecipe,
        ...dataUser
      });  
      const resultService = await serviceRecipe.serviceCreateRecipe(newRecipe);
      if (!resultService.recipe) return next(resultService);
      return res.status(CODE.created).json(resultService);
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = ControllerRecipe;
