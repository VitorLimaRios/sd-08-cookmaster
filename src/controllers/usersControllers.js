const services = require('../services/usersServices');
const rescue = require('express-rescue');

const CREATED = 201;

const createUser = rescue(async(req, res, next) => {
  const { name, email, password } = req.body;
  let status = CREATED;
  const resp = await services.create({ name, email, password });
  if(resp.verifyError) {
    console.log(resp);
    status = resp.status;
    next(resp);
  }

  res.status(status).json(resp);
});

module.exports = {
  createUser,
};
