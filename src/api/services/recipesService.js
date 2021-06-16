const recipesModel = require('../models/recipesModel');

const validarReceita = (receita) => {
  const {name, ingredients, preparation} = receita;
  if (!name || !ingredients || !preparation)
    throw new Error('Invalid entries. Try again.');
};

const criarReceita = async (receita) => {
  await validarReceita(receita);
  const resultReceita = 
    await recipesModel.criarReceita(receita);
  return resultReceita;
};

module.exports = {
  criarReceita,
};