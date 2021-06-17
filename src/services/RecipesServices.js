const RecipesModel = require('../models/RecipesModel');
const RecipesSchemas = require('../schemas/RecipesSchemas');


const insertRecipe = async (name, ingredients, preparation, _id) => {

    const validation = RecipesSchemas.inputValidation(name, ingredients, preparation);

    if(validation.code) return validation;

    const response = RecipesSchemas.NewObjectRecipe({name, ingredients, preparation, _id});
    const RecipeBank = await RecipesModel.insertRecipe(response);
    const NewObject = RecipesSchemas.AddNewKeyRecipe(RecipeBank);
    
    return NewObject;
}

const getRecipes = async () => {
    const response = await RecipesModel.getRecipes();

    return response;
}

const getRecipeID = async (id) => {
    const response = await RecipesModel.getRecipeID(id);

    const validate = RecipesSchemas.recipeExists(response);

    if(validate.code) return validate;

    return response[0];
}

module.exports = {
    insertRecipe,
    getRecipes,
    getRecipeID,
}
