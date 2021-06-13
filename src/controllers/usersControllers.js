const JWT = require('jsonwebtoken');
const status = require('./status');
const { 
  create, 
  find,
} = require('../models/usersModels');

const createUser = async (req, res, _next) => {
  const data = req.body;
  const result = await create(data);
  res.status(status.OK).json(result);
};

const checkName = (req, _res, next) => {
  const data = req.body;
  if(!data.name) return next({
    status: status.INVALID,
    message: status.INVALID_M,
  });
  next();
};

const checkEmail = async (req, _res, next) => {
  const data = req.body;
  const emailCheck = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  if(!data.email || !emailCheck.test(data.email)) return next({
    status: status.INVALID,
    message: status.INVALID_M,
  });  
  next();
};

const checkEmailUnique = async (req, _res, next) => {
  try {
    const result = await find('email', data.email);
    if(result) return next({
      status: status.NOTUNIQUE,
      message: status.NOTUNIQUE_M,
    });
  } catch (error) {
    next({
      status: status.ERRO,
      message: error.message,
    });
  }
  next();
};

const checkPassword = (req, _res, next) => {
  const data = req.body;
  if(!data.password) return next({
    status: status.INVALID,
    message: status.INVALID_M,
  });
  next();
};

const checkRole = (req, _res, next) => {
  const data = req.body;
  if(!data.role) req.body.role = 'user';
  next();
};

const checkLogin = async (req, res, next) => {
  const data = req.body;

  if(!data.email || !data.password) return next({
    status: status.FILLFIELDS,
    message: status.FILLFIELDS_M,
  });  

  try {
    const result = await find('email', data.email);
    if(!result) return next({
      status: status.INCORRECT,
      message: status.INCORRECT_M,
    });

    if(result.password !== data.password) return next({
      status: status.INCORRECT,
      message: status.INCORRECT_M,
    }); 

    const secret = 'sherif';
    const jwtconfig = {
      expiresIn: '1d',
      algorithm: 'HS256',
    };
    const { _id, email, role } = result;
    const token = JWT.sign({ id: _id, email, role }, secret, jwtconfig);
    res.status(status.OK).json({token});

  } catch (error) {
    next({
      status: status.ERRO,
      message: error.message,
    });
  }
};




module.exports = {
  createUser,
  checkName,
  checkEmail,
  checkPassword,
  checkEmailUnique,
  checkRole,
  checkLogin,
};