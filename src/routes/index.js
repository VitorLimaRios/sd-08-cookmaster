const router = require('express').Router();
const RouterIndex = require('./RouterIndex');
const UsersRouter = require('./UsersRouter');
const LoginRouter = require('./LoginRouter');
const RecipesRouter = require('./RecipesRouter');

router.use('/', RouterIndex);
router.use('/users', UsersRouter);
router.use('/login', LoginRouter);
router.use('/recipes', RecipesRouter);



module.exports = router;
