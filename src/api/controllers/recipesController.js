const recipesService = require('../services/recipesService');
const rescue = require('express-rescue');

const httpStatusCodeSucess = 200;
const httpStatusCodeCreated = 201;
const httpStatusCodeBadRequest = 400;
const httpStatusCodeNotFound = 404;

const criarReceita = async (req, res) => {
  try {
    const receita = req.body;
    const resultReceita =
      await recipesService.criarReceita(receita);
    res.status(httpStatusCodeCreated).json(resultReceita);
  } catch (err) {
    res.status(httpStatusCodeBadRequest).json(
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

const buscarReceitaPorId = async (req, res) => {
  const {id} = req.params;
  try {
    const receita = await recipesService.buscarReceitaPorId(id);
    res.status(httpStatusCodeSucess).json(receita);
  } catch (err) {
    res.status(httpStatusCodeNotFound).json(
      {
        message: err.message
      }
    );
  }
};

module.exports = {
  criarReceita,
  listarReceitas,
  buscarReceitaPorId,
};