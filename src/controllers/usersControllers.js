const services = require('../services/usersServices');
const rescue = require('express-rescue');

const CREATED = 201;
const OK = 200;

const createUser = rescue(async(req, res, next) => {
  const { name, email, password } = req.body;
  let status = CREATED;
  const resp = await services.create({ name, email, password });
  if(resp.verifyError) {
    console.log(resp);
    status = resp.status;
    return next(resp);
  }

  res.status(status).json(resp);
});

const login = rescue(async(req, res, next) => {
  const { email, password } = req.body;
  let status = OK;
  const resp = await services.login({ email, password });
  if(resp.verifyError) {
    console.log(resp);
    status = resp.status;
    return next(resp);
  }

  res.status(status).json(resp);
});

module.exports = {
  createUser,
  login,
};
