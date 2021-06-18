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
      if (!Array.isArray(resultService)) return next(resultService);
      return res.status(CODE.ok).json(resultService);
    }catch (err) {
      return err;
    }
  }
  
  async getOne(req, res, next) {
    try {
      const serviceRecipe = new ServicesRecipe();
      const { id } = req.params;
      const resultService = await serviceRecipe.getRecipeById({ _id: id });
      if (!resultService.result) {
        return next(resultService);
      }
      return res.status(CODE.ok).json(resultService.result);
    } catch (err) {
      return err;
    }
  }

  async update(req, res, next) {
    try {
      const serviceRecipe = new ServicesRecipe();
      const { id } = req.params;
      const { name, ingredients, preparation } = req.body;
      const dataUser = req.payload;
      const resultService = await serviceRecipe.updateRecipe(
        { _id: id },
        dataUser,
        { name, ingredients, preparation }
      );
      if (!resultService.recipe) return next(resultService);
      return res.status(CODE.ok).json(resultService.recipe);
    }catch (err) {
      return next(err);
    }
  }

  async deleteOneRecipe(req, res, next) {
    try {
      const serviceRecipe = new ServicesRecipe();
      const { id } = req.params;
      const dataUser = req.payload;
      const resultService = await serviceRecipe.deleteOneRecipe(
        { _id: id },
        dataUser
      );
      if (!resultService.deletedRecipe) return next(resultService);
      res.status(CODE.notContent).json('');
    } catch (err) {
      return next(err);
    }
  }

  async getUpload(req, res, next) {
    try {
      const { id } = req.params;
      const dataUser = req.payload;
      const serviceRecipe = new ServicesRecipe();
      const url = `localhost:3000/src/uploads/${ id }.jpeg`;
      const resultService = await serviceRecipe.addUrlImg(id, url, dataUser);
      if (!resultService.recipe) next(resultService);
      console.log(resultService);
      req.recipe = resultService.recipe.result;
      next();
    } catch (err) {
      return  next(err);
    }
  }
}

module.exports = ControllerRecipe;
