const recipesService = require('../services/recipesService');

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

module.exports = {
  criarReceita,
};