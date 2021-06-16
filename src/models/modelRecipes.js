const ModelDefault = require('./modelDefault');

let collectionRecipe = Symbol();

class ModelRecipes extends ModelDefault{
  constructor() {
    super();
    this[collectionRecipe] = 'recipes';
  }

  async createRecipes(documentRecipe) {
    try {
      const result = await super.create(this[collectionRecipe], documentRecipe);
      return result;
    }catch (err) {
      return err;
    }
  }

  async getAllRecipes() {
    try {
      const allRecipes = await super.getAll(this[collectionRecipe]);
      return allRecipes;
    }catch (err) {
      return err;
    }
  }

  async searchById(idRecipe) {
    try {
      const getRecipe = await super.getByKey(this[collectionRecipe], idRecipe);
      return getRecipe;
    } catch (err) {
      return err;
    }
  }
}

module.exports = ModelRecipes;
