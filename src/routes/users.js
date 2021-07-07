const router = require('express').Router();
const UsersController = require('../controllers/users');
const authMiddleware = require('../middlewares/auth');

router.post('/', UsersController.create);
router.post('/admin', authMiddleware, UsersController.createAdmin);


module.exports = router;
