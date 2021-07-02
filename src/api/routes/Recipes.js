const express = require('express');
const router = express.Router();
const {OK}=require('../services/utils/variableStatus');

const RecipesControllers = require('../controllers/Recipes');
const middlewareJWT = require('../middlewares/middlewareJWT_validate');

const multer = require('multer');
const storage = multer.diskStorage({
  destination: (_req, _file, callback) => callback(null, 'src/uploads'),
  filename: (req, _file, callback) => {callback(null, `${req.recipe._id}.jpeg`);}
});
const upload = multer({ storage });


router.get('/:id', RecipesControllers.findById);
router.put('/:id', middlewareJWT.JWT_validate, RecipesControllers.updateById);
router.delete('/:id', middlewareJWT.JWT_validate, RecipesControllers.deleteRecipe);
router.get('/', RecipesControllers.findAll);
router.post('/', middlewareJWT.JWT_validate, RecipesControllers.createRecipes);
router.put('/:id/image', middlewareJWT.JWT_validate, 
  RecipesControllers.updateImage , upload.single('image') , (req, res) => {
    res.status(OK).json(req.recipe);
  });


module.exports = router;