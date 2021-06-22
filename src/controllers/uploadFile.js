const rescue = require('express-rescue');

const Services = require('../services/recipe');

const SUCCEEDED = 200;

module.exports = rescue(async (req, res) => {
  const token = req.headers.authorization;
  const { id } = req.params;
  const path = `localhost:3000/${req.file.path}`;
  const recipe = await Services.uploadFile(token, id, path);
  if (!recipe._id) throw Error;
  res.status(SUCCEEDED).json(recipe);
});
