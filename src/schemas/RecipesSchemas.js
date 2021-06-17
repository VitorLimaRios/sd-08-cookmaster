const { validateEntries, recipeNotFound } = require('./ErrosMensages');

const NewObjectRecipe = (obj) => {
    const { name, ingredients, preparation, _id } = obj;

    return {
        name,
        ingredients,
        preparation,
        userId: _id,
    }
}

const AddNewKeyRecipe = (obj) => {
    const { name, ingredients, preparation, userId, _id} = obj;

    return {
        recipe: {
            name,
            ingredients,
            preparation,
            userId,
            _id,
        }
    }

}

const inputValidation = (name, ingredients, preparation) => { 
    
    if(!name || !ingredients || !preparation) return validateEntries;
    return true;
}

const recipeExists = (recipe) => {
    if(!recipe || recipe.length === 0) return recipeNotFound;
    return true;
}

module.exports = {
    NewObjectRecipe,
    AddNewKeyRecipe,
    inputValidation,
    recipeExists,
}
