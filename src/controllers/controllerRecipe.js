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

  async getAll(req, res, next) {
    try {
      const serviceRecipe = new ServicesRecipe();
      const resultService = await serviceRecipe.getAllRecipes();
      console.log(resultService);
      if (!Array.isArray(resultService)) return next(resultService);
      return res.status(CODE.ok).json(resultService);
    }catch (err) {
      return err;
    }
  }
}

module.exports = ControllerRecipe;
