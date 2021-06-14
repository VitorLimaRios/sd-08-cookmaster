const express = require('express');
const multer = require('multer');
const path = require('path');

const recipesController = require('../controllers/recipesController');
const auth = require('../middlewares/auth');

const router = express.Router();

router.use(express.static(path.join(__dirname, '..', 'uploads/')));

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({ storage });

router.put(
  '/:id/image/',
  auth,
  upload.single('image'),
  recipesController.addImageToRecipe
);

router.post('/', auth, recipesController.registerRecipe);

router.get('/:id', recipesController.getRecipeById);
router.get('/', recipesController.getAllRecipes);

router.put('/:id', auth, recipesController.updateRecipeById);

router.delete('/:id', auth, recipesController.deleteRecipeById);

module.exports = router;
