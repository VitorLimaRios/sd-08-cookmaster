const { Router } = require('express');
const service = require('../services/userService');
const rescue = require('express-rescue');
const router = Router();

const STATUS_201 = 201;
const STATUS_400 = 400;
const STATUS_409 = 409;

router.get('/', rescue(async (_req, res) => {
  const user = await service.getAll();
  res.status(STATUS_201).json({user});
}));

router.post('/', rescue(async (req, res) => {
  const user = await service.create(req.body);
  try {
    const { user: {name, email, _id} } = user;
    const result = { name, email, role: 'user', _id };
    return res.status(STATUS_201).json({user: result});    
    
  } catch (error) {
    if (user.message === 'Email already registered') {
      return res.status(STATUS_409).json(user);
    }
    return res.status(STATUS_400).json(user);
  }  
  
}));


module.exports = router;