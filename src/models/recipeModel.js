const { RECIPES } = require('./constants');
const { addNew } = require('./functions');

const addNewRecipe = async(fields) => await addNew({...fields}, RECIPES);

module.exports = {
  addNewRecipe,
};
