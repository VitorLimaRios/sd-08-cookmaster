const express = require('express');
const { validateJWT } = require('../../middlewares/validateJWT');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/', userController.create);
router.post('/admin', validateJWT, userController.createAdmin);

module.exports = router;
