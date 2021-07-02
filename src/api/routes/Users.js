const express = require('express');
const router = express.Router();
const UsersControllers = require('../controllers/Users');
const middlewareJWT = require('../middlewares/middlewareJWT_validate');
const middlewareADM = require('../middlewares/middlewareAdmin');

router.post('/admin',middlewareJWT.JWT_validate,middlewareADM.middlewareAdmin,
  UsersControllers.createAdmin);
router.post('/', UsersControllers.createUsers);


module.exports = router; 