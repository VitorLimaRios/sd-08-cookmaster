const express = require('express');
const user = require('../controller/userController');
const Router = express.Router();
const recipes = require('../controller/recipeController');
const auth = require('../auth');
const multer = require('../multer');

Router.post('/users', user.createUser);
Router.post('/login', user.login);

Router.post('/recipes', auth, recipes.create);
Router.get('/recipes', recipes.getAll);
Router.get('/recipes/:id', recipes.getById);
Router.put('/recipes/:id', auth, recipes.updateRec);
Router.delete('/recipes/:id', auth, recipes.deleteRec);
Router.put('/recipes/:id/image', auth, multer().single('image'), recipes.sendImage);

module.exports = Router;