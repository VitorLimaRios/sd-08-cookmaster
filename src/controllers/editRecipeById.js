const rescue = require('express-rescue');

const Services = require('../services/recipe');

const SUCCEEDED = 200;

module.exports = rescue(async (req, res) => {
  const token = req.headers.authorization;
  const { id } = req.params;
  const userId = await Services.editRecipeById(token, id, req.body);
  if (!userId) throw Error;
  res.status(SUCCEEDED).json({ _id: id, ...req.body, userId });
});
