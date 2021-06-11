const express = require('express');
const router = express.Router();
const middlewares_users = require('../middlewares/usersPost');

router.post('/', (req, res) => {
  const {name, email, password} = req.body;
  console.log('req.body post line 6', name, email, password);

  const messageControlValidation = middlewares_users
    .controlValidation(name, email, password);
  console.log('const isNameValid line 9', messageControlValidation);

  return res.status(400).json(messageControlValidation);

});

module.exports = router;
