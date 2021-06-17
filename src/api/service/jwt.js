const jwt = require('jsonwebtoken');
const express = require('express');
const bodyParser = require('body-parser');
const {
  UNAUTHORIZED,
} = require('./consts');
const {getUser} = require('../models/recipesModel');

const app = express();
app.use(bodyParser.json());

const secret = 'superSecret';

const generateToken = (data) => {
  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  const token = jwt.sign(data, secret, jwtConfig );
  
  return token;
};

const getToken = (headers) => {
  const token = headers['authorization'];
  if (!token) {
    throw {
      status: UNAUTHORIZED,
      message: 'jwt malformed',
    };
  }
  return token;
};

const decodeToken = async(req, res, next) => {
  const token = getToken(req.headers);
  try {
    const decodedToken = jwt.verify(token, secret);
    const userFound = await getUser(decodedToken.email);
    req.user= userFound;
    next();
  } catch (err) {
    console.log('erro jwt', err);
    return res.status(UNAUTHORIZED).json({message: 'jwt malformed'});
  }
};

module.exports = {
  generateToken,
  getToken,
  decodeToken,
  secret
};