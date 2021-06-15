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
}

module.exports = ModelRecipes;
