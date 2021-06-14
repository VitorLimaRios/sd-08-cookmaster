const express = require('express');
const multer = require('multer');

const NEG_THREE = -3;
const NEG_ONE = -1;

const {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  uploadImage,
  addImagePath  } = require('../controllers/recipesController');


const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'src/uploads/');
    req.file = file;
  },
  filename: (req, file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  }
});

const upload = multer({ storage });

const router = express.Router();

router.post('/recipes', createRecipe);
router.get('/recipes/:id', getRecipeById);
router.put('/recipes/:id/image', uploadImage,upload.single('image'), addImagePath);
router.put('/recipes/:id', updateRecipe);
router.delete('/recipes/:id', deleteRecipe);
router.get('/recipes', getAllRecipes);

module.exports = router;