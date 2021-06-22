const recipesModel = require('../model/recipesModel');

const nameIsValid = (data) => {
  const { name } = data;

  if (!name) {
    return {
      message: 'Invalid entries. Try again.',
      code: 400,
    };
  };
};

const ingredientsIsValid = (data) => {
  const { ingredients } = data;

  if (!ingredients) {
    return {
      message: 'Invalid entries. Try again.',
      code: 400,
    };
  };
};

const preparationIsValid = (data) => {
  const { preparation } = data;

  if (!preparation) {
    return {
      message: 'Invalid entries. Try again.',
      code: 400,
    };
  };
};

const bodyIsValid = (data) => {
  const nameValid = nameIsValid(data);
  const ingredientValid = ingredientsIsValid(data);
  const preparationValid = preparationIsValid(data);

  if (nameValid) return { erro: nameValid };
  if (ingredientValid) return { erro: ingredientValid };
  if (preparationValid) return { erro: preparationValid };
};

const idIsValid = async (params) => {
  const getById = await recipesModel.findById(params);

  if (!getById) {
    return {
      erro: {
        message: 'recipe not found',
        code: 404,
      },
    };
  };
};

module.exports = {
  bodyIsValid,
  idIsValid,
};
