const Users = require('../services/users');
const jwt = require('jsonwebtoken');

const CREATED = 201;
const secret = 'xablau';

const create = async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const newUser = await Users.create({name, email, password, role});

  if ( await newUser.error) return next(newUser);

  res.status(CREATED).json(newUser);
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const result = await Users.login({email, password});

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256'
  };

  if (await result.error) return next (result);

  const token = jwt.sign({ data: result.user }, secret, jwtConfig);

  res.status(CREATED).json({token}).send(result);

};

module.exports = {
  create,
  login
};
