const jwt = require('jsonwebtoken');
const LoginModel = require('../models/loginMod');

const secret = 'cookmaster';

const validJWT = async (req, res, next) => {
  const token = req.headers['authorization'];




};

module.exports = {
  validJWT
};
