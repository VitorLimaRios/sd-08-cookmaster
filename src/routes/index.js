const express = require('express');

const Login = require('./Login.routes');
const Users = require('./Users.routes');
const Recipes = require('./Recipes.routes');

const router = express.Router();

router.post('/login', Login);

router.post('/users', Users);

router.get('/recipes', Recipes);
router.get('/recipes/:id', Recipes);
router.post('/recipes', Recipes);
router.put('/recipes/:id', Recipes);

module.exports = router;
