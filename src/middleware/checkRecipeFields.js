function checkRecipesFields(name, ingredients, preparation){
  if(!name || !ingredients || !preparation){
    throw new Error('Invalid entries. Try again.');
  }
}

module.exports = {
  checkRecipesFields
};