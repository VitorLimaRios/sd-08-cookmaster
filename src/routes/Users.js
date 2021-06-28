const express = require('express');
const Users = require('../controllers/Users');
const ensureAdmin = require('../middlewares/ensureAdmin');
const validateJWT = require('../middlewares/validateJWT');

const router = express.Router();

router.post('/admin', validateJWT, ensureAdmin, Users.createAdmin);
router.post('/', Users.create);

module.exports = router;