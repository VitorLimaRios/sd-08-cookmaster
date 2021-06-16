const ModelRecipes = require('../models/modelRecipes');
const schema = require('../schema/schemaRecipe');
const CustomErro = require('../error/customError');
const { ObjectId } = require('mongodb');

class ServicesRecipe {
  constructor() {
    this._modelRecipe = new ModelRecipes();
  }

  _validRecipe(dataRecipe) {
    const result = schema(dataRecipe);
    return result === 'pass' ? true : false;
  }

  async serviceCreateRecipe(dataRecipe) {
    try {
      const checkData = this._validRecipe(dataRecipe);
      console.log(checkData);
      if (!checkData) {
        throw new CustomErro(
          'Invalid recipes',
          this.serviceCreateRecipe.name,
          'pr-inv'
        );
      }

      const resultModel = await this._modelRecipe.createRecipes(dataRecipe);
      return { recipe: resultModel };
    } catch (err) {
      if (err instanceof CustomErro) {
        return err.responseError();
      }
      return err;
    }
  }

  async getAllRecipes() {
    try {
      const result = await this._modelRecipe.getAllRecipes();
      return result;
    } catch (err) {
      return err;
    }
  }

  async getRecipeById(dataId) {
    try {
      const idFormatted = {
        _id: ObjectId(dataId._id)
      };
      const result = await this._modelRecipe.searchById(idFormatted);
      return  { result: result };
    } catch (err) {
      return err;
    }
  }
}

module.exports = ServicesRecipe;
