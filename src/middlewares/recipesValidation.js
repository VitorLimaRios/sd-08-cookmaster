
const reqBodyValidation = (name, ingredients, preparation) => {

  if(!name || !ingredients || !preparation) return false;
  
  return true;

};


const controlValidation = (name, ingredients, preparation) => {

  const isValid = reqBodyValidation(name, ingredients, preparation);
  console.log('isNameValid line 20', isValid);
  if(!isValid) return { message: 'Invalid entries. Try again.'};

  return isValid;

};

module.exports = {
  controlValidation,
};
