const services = require('../services/recipesServices');
const rescue = require('express-rescue');

const CREATED = 201;

const createRecipe = rescue(async(req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const token = req.headers.authorization;
  let status = CREATED;
  const resp = await services.create({ name, ingredients, preparation }, token);
  if(resp.verifyError) {
    console.log(resp);
    status = resp.status;
    return next(resp);
  }

  res.status(status).json(resp);
});

module.exports = {
  createRecipe,
};
