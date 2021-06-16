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
  
  _idFormatted(dataId) {
    return { _id: new ObjectId(dataId._id) };
  }


  async getRecipeById(dataId) {
    try {
      const result = await this._modelRecipe.searchById(this._idFormatted(dataId));
      return  { result: result };
    } catch (err) {
      return err;
    }
  }

  async checkInfoUpdate(idRecipe, dataUser, dataRecipe) {
    const recipeDb = await this._modelRecipe.searchById(this._idFormatted(idRecipe));
    if (!recipeDb) return { recipe: false };
    const editable = () => {
      if (recipeDb.userId === dataUser.id) return true;
      if (dataUser.role === 'admin') return true;
      return false;
    };
    const checkList = {
      editable: editable(),  
      schema: this._validRecipe(dataRecipe),
    };
    return checkList;
  }

  async updateRecipe(idRecipe, dataUser, dataRecipe) {
    try {
      const checkList = await  this.checkInfoUpdate(idRecipe, dataUser, dataRecipe);
      if (checkList.recipe && checkList.recipe === false) {
        throw new CustomErro(
          'Update recipe',
          'update',
          'r-n-found'
        );
      }

      if (!checkList.editable) {
        throw new CustomErro(
          'User unauthorized',
          'update',
          'r-i-jwt'
        );
      }

      if (!checkList.schema) {
        throw new CustomErro(
          'Invalid entries',
          'update',
          'pr-inv'
        );
      }

      const getUpdate = await this._modelRecipe.updateRecipe(
        this._idFormatted(idRecipe),
        dataRecipe
      );
      getUpdate.userId = dataUser.id;
      return { recipe: getUpdate };
    } catch (err) {
      if (err instanceof CustomErro) {
        return err.responseError();
      }
      return err;
    }
  }
}

module.exports = ServicesRecipe;
