const usersService =  require('../service/users');
const usersModels= require('../models/users');
const jwt = require('jsonwebtoken');

const STATUS_201 = 201;
const STATUS_200 = 200;
const STATUS_409 = 409;
const STATUS_401 = 401;

// CREATE USER
const create = async (req, res) => {
  const { name, email, password } = req.body;  
  const newUser = await usersService.create(name, email, password);
  if (newUser) {
    return res.status(STATUS_201).json(newUser);
  } else { return res.status(STATUS_409).json({
    message: 'Email already registered',
  });
  }
};

// LOGIN USER
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) { 
    return res.status(STATUS_401).json({
      message: 'All fields must be filled',
    }); 
  }
  const user = await usersModels.findByEmail(email);
  if (!user || user.password !== password) {
    return res.status(STATUS_401).json({
      message: 'Incorrect username or password',
    }); 
  }
  const secret = 'xablau';
  const jwtConfig = {
    expiresIn: '1h',
    algorithm: 'HS256',
  };
  const token = jwt.sign(
    { id: user._id, email: user.email, role: user.role }, 
    secret, 
    jwtConfig
  ); 
  res.status(STATUS_200).json({ token });
};


module.exports = {
  create,
  login,
};
