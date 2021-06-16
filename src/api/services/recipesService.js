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

const listarReceitas = async() => {
  const receita = await recipesModel.listarReceitas();
  return receita;
};

const buscarReceitaPorId = async(id) => {
  const idReceita = await recipesModel.buscarReceitaPorId(id);
  if(idReceita === null) throw new Error('recipe not found');
  return idReceita;
};

module.exports = {
  criarReceita,
  listarReceitas,
  buscarReceitaPorId,
};