const rescue = require('express-rescue');

const Services = require('../services/recipe');

const NOCONTENT = 204;

module.exports = rescue(async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization;
  await Services.deleteRecipeById(token, id);
  res.status(NOCONTENT).send();
});
