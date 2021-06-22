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

module.exports = {
  bodyIsValid,
};
