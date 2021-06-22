const express = require('express');
const multer = require('multer');
const { resolve } = require('path');
const userController = require('../controllers/userController');
const recipeController = require('../controllers/recipeController');
const  validateJWT = require('./auth/validateJWT');
const  validateJWTToUpdateRecipe = require('./auth/validateJWTToUpdateRecipe');


const app = express();
app.use(express.json());

app.use(express.static(resolve(__dirname,'uploads')));

const storage = multer.diskStorage({
  destination: (req, file, callback)=> callback(null, 'src/uploads/'),
  filename: (req, file, callback)=>{
    const {id} =  req.params; 
    callback(null, `${id}.jpeg`);
  }
});

const upload = multer({storage});

// const upload = multer({dest: 'uploads/'});

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', userController.addUser);

app.post('/login', userController.loginUser);

app.post('/recipes', validateJWT, recipeController.addRecipe);
app.get('/recipes', recipeController.getAllRecipes);
app.get('/recipes/:id', recipeController.getRecipeById);
app.put('/recipes/:id',validateJWTToUpdateRecipe, recipeController.updateRecipe);
app.delete('/recipes/:id',validateJWTToUpdateRecipe, recipeController.deleteRecipe);
app.delete('/recipes/:id',validateJWTToUpdateRecipe, recipeController.deleteRecipe);

app.put('/recipes/:id/image',upload.single('image'), 
  validateJWTToUpdateRecipe, recipeController.AddImageRecipe);



module.exports = app;
