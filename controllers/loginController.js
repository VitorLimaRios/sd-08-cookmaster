const { Router } = require('express');
const rescue = require('express-rescue');
const router = Router();
const crypto = require('crypto');
const service = require('../services/loginService');
const jwt = require('jsonwebtoken');

const EIGHT = 8;
const secret = crypto.randomBytes(EIGHT).toString('hex');

const jwtConfig = { //cria dia ou horas para expirar o token.
  expiresIn: '7d',
  algorithm: 'HS256',
};

const STATUS_401 = 401;
const STATUS_200 = 200;

router.get('/', rescue(async (_req, res) => {
  const user = await service.getAll();
  res.status(STATUS_201).json({user});
}));

router.post('/', rescue(async (req, res) => {
  const user = await service.create(req.body);
  try {
    if (user.message === 'Incorrect username or password' 
    || user.message === 'All fields must be filled') {
      res.status(STATUS_401).json(user); //Por fim, nós devolvemos esse token ao usuário.
    }
    const token = jwt.sign({ data: user.user }, secret, jwtConfig); //assinatura completa do token.
    res.status(STATUS_200).json({ token }); //Por fim, nós devolvemos esse token ao usuário.    
  } catch (error) { 
    if (user) return res.status(STATUS_401).json(user);
  };  
}));


module.exports = router;