const router = require('express').Router();
const RecipesController = require('../controllers/recipes');
const { upload }  = require('../middlewares/upload');
const authMiddleware = require('../middlewares/auth');

router.post('/', authMiddleware, RecipesController.create);
router.get('/', RecipesController.getAll);
router.get('/:id', RecipesController.getById);
router.put('/:id', authMiddleware, RecipesController.updateById);
router.put('/:id/image', upload.single('image'),
  authMiddleware, RecipesController.addImage);
router.delete('/:id', authMiddleware, RecipesController.deleteById);


module.exports = router;
