const bodyValidation = (name, ingredients, preparation) => {

  if (!name || !ingredients || !preparation) return false;

  return true;
};

const controlValidation = (name, ingredients, preparation) => {
  const validBody = bodyValidation(name, ingredients, preparation);

  if (!validBody) return { message: 'Invalid entries. Try again.' };

  return validBody;
};

module.exports = {
  controlValidation,
};
