const router = require('express').Router();
const RouterIndex = require('./RouterIndex');
const UsersRouter = require('./UsersRouter');
const LoginRouter = require('./LoginRouter');
const RecipesRouter = require('./RecipesRouter');
const HTT_SATATUS_OK = 200;


router.use('/', RouterIndex);
router.use('/users', UsersRouter);
router.use('/login', LoginRouter);
router.use('/recipes', RecipesRouter);
router.use('/images', (_req, resp) => resp.status(HTT_SATATUS_OK));

module.exports = router;
