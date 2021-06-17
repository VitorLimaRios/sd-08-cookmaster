const models = require('../models/Users');
const { findEmail } = require('../models/Users');
const { generateToken } = require('../services/tokenGenerate');
const OK = '200';

const {
  checkUserData,
  checkUniqueEmail,
  checkLoginData,
} = require('../middlewares');
const userSchemas = require('../schemas');
const { Router } = require('express');


const loginController = Router();
  
loginController.post('/', checkLoginData(userSchemas), async(req, res) => {
  const { email } = req.body;
  const user = await findEmail(email);
  const { _id, role } = user;
  const payload = { _id, email, role };
  res.status(OK).json({ token: generateToken(payload) });
});

module.exports = loginController;
