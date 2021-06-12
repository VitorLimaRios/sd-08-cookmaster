const user = require('../models/user');
const jwt = require('jsonwebtoken');

const OK = 200;
const AUTH_REQ = 401;
const INVALID = {
  'message': 'Incorrect username or password'
};

const secret = 'foguetenaotemre';
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const returnToken = async (req, res) => {
  const { email, password } = req.body;
  const userData = await user.findEmail(email);

  if (!userData || userData.email != email || userData.password != password)
    return res.status(AUTH_REQ).json(INVALID);

  const token = jwt.sign({ data: userData.email }, secret, jwtConfig);
  
  //res.send(userData);
  res.status(OK).json({ 'token': token });
};

module.exports = {
  returnToken,
};
