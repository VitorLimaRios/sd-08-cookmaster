const rescue = require('express-rescue');

const Services = require('../services/recipe');

const SUCCEEDED = 200;

module.exports = rescue(async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization;
  const userId = await Services.editRecipeById(token, id, req.body);
  if (!userId) throw Error;
  res.status(SUCCEEDED).json({ _id: id, ...req.body, userId });
});
