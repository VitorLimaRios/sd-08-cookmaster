const router = require('express').Router();

const useController = require('../controllers/user.controllers');

const {
  verifyEntries,
  alreadyExist,
} = require('../middleware/userAuth.middleware');

router.post('/', verifyEntries, alreadyExist, useController.add);

module.exports = router;
