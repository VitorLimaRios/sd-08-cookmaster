const express = require('express');
const Recipes = require('../controllers/Recipes');
const validateJWT = require('../middlewares/validateJWT');
const upload = require('../middlewares/upload');

const router = express.Router();

const OK = 200;

router.put('/:id/image',
  validateJWT,
  Recipes.upload,
  upload.single('image'),
  (req, res) => {
    console.log(req.recipe);
    res.status(OK).json(req.recipe);
  });
router.get('/:id', Recipes.getById);
router.put('/:id', validateJWT, Recipes.update);
router.delete('/:id', validateJWT, Recipes.remove);
router.get('/', Recipes.get);
router.post('/', validateJWT, Recipes.create);

module.exports = router;