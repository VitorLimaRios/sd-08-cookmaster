const express = require('express');
const path = require('path');
const app = express();
const Users = require('../controllers/userController');
const Recipes = require('../controllers/recipeController');
const bodyParser = require('body-parser');
const auth =require('../auth');
const validator = require('../valiToken');
const multer = require('multer');


const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'src/uploads/');
  },
  filename: (req, file, callback) => {
    const { mimetype } = file;
    const extension = mimetype.split('/')[1];
    callback(null, `${req.params.id}.${extension}`);
  }
});

const upload = multer({storage});

app.use(express.json());

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/uploads'));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador
/* app.use('/images', express.static(path.join(__dirname, '..', 'uploads'))); */


app.post('/users',Users.create);

app.post('/login',auth); 
 
app.post('/recipes',validator,Recipes.createRecipes); 
app.get('/recipes',Recipes.getAll); 
app.get('/recipes/:id',Recipes.getOne); 
app.put('/recipes/:id',validator,Recipes.update); 
app.delete('/recipes/:id',validator,Recipes.deleteOne);

app.put('/recipes/:id/image',validator,upload.single('image'),Recipes.addImage);


module.exports = app;
