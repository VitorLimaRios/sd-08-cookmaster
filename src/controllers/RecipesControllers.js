const RecipesSerices = require('../services/RecipesServices');

const HTT_SATATUS_OK = 200;
const CODE_HTTP_CREATE = 201;

const insertRecipe = async (req, resp) => {
    const { name, ingredients, preparation } = req.body;
    const { _id } = req.user;

    const response = await RecipesSerices.insertRecipe(name, ingredients, preparation, _id);

    if(response.code) return resp.status(response.code).json(response.message);

    resp.status(CODE_HTTP_CREATE).json(response);
}   

const getRecipes = async (req, resp) => {
    const response = await RecipesSerices.getRecipes();

    resp.status(HTT_SATATUS_OK).json(response);
}

const getRecipeID = async (req, resp) => {
    const { id } = req.params;

    const response = await RecipesSerices.getRecipeID(id);

    if(response.code) return resp.status(response.code).json(response.message);

    resp.status(HTT_SATATUS_OK).json(response);
}

module.exports = {
    insertRecipe,
    getRecipes,
    getRecipeID,
}
