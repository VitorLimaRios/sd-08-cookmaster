const { Router } = require('express');
const rescue = require('express-rescue');
const router = Router();
const secret = require('../utils/crypto');

const service = require('../services/loginService');
const jwt = require('jsonwebtoken');

const jwtConfig = { 
  expiresIn: '7d',
  algorithm: 'HS256',
};

const STATUS_401 = 401;
const STATUS_200 = 200;
const STATUS_201 = 201;

router.get('/', rescue(async (_req, res) => {
  const user = await service.getAll();
  res.status(STATUS_201).json({user});
}));

router.post('/', rescue(async (req, res) => {
  const user = await service.create(req.body);
  try {
    if (user.message === 'Incorrect username or password' 
    || user.message === 'All fields must be filled') {
      res.status(STATUS_401).json(user);
    }
    const token = jwt.sign({ data: user.user }, secret, jwtConfig); 
    res.status(STATUS_200).json({ token }); 
  } catch (error) { 
    if (user) return res.status(STATUS_401).json(user);
  };  
}));


module.exports = router;