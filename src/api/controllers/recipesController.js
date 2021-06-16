const recipesService = require('../services/recipesService');
const rescue = require('express-rescue');

const httpStatusCodeSucess = 200;
const httpStatusCodeCreated = 201;
const httpStatusCodeBadRequest = 400;

const criarReceita = async (req, res) => {
  try {
    const receita = req.body;
    const resultReceita =
      await recipesService.criarReceita(receita);
    res.status(httpStatusCodeCreated).json(resultReceita);
  } catch (err) {
    return res.status(httpStatusCodeBadRequest).json(
      {
        message: err.message
      }
    );
  }
};

const listarReceitas = rescue(async (req, res) => {
  const receita = await recipesService.listarReceitas();
  res.status(httpStatusCodeSucess).json(receita);
  
});

module.exports = {
  criarReceita,
  listarReceitas,
};