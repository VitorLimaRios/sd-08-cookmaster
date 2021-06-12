const express = require('express');
const router = express.Router();
const multer = require('multer');
const { resolve } = require('path');
const middlewares = require('../middlewares');
const recipeController = require('../controllers/Recipe');

const storage = multer.diskStorage({
  destination: (_req, _file, callback) =>
    callback(null, resolve(__dirname, '..', 'uploads')),
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  }
});

const upload = multer({ storage });

router.post('/', middlewares.recipeValidation, recipeController.create);

router.get('/', recipeController.getAll);

router.get('/:id', recipeController.getById);

router.put('/:id', middlewares.recipeValidation, recipeController.edit);

router.delete('/:id', middlewares.auth, recipeController.remove);

router.put('/:id/image', middlewares.auth, upload.single('image'),
  recipeController.uploadImage);

module.exports = router;