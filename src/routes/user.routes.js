const router = require('express').Router();

const {
  verifyEntries,
  alreadyExist,
} = require('../middleware/userAuth.middleware');

const useController = require('../controllers/user.controllers');

router.post('/', verifyEntries, alreadyExist, useController.add);

module.exports = router;
