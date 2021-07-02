const express = require('express');
const multer = require('multer');
const { resolve } = require('path');

const storage = multer.diskStorage({
  destination: (_req, _file, callback)=> callback(null, 'src/uploads'),
  filename: (req, _file, callback)=>{
    const { id } = req.params;
    callback(null,`${id}.jpeg`);
  }
});

const upload = multer({storage});
// console.log(upload);

const usersController = require('../controllers/usersController');
const loginController = require('../controllers/loginController');
const recipesController = require('../controllers/recipesController');
const verifyAuthorization = require('../middlewares/verifyAuthorization');

const usersRouter = express.Router();
usersRouter.post('/', usersController.createUser);

const loginRouter = express.Router();
loginRouter.post('/', loginController.loginUser);

const recipesRouter = express.Router();
recipesRouter.use(express.static(resolve(__dirname, '..','uploads'))); 
recipesRouter.get('/', recipesController.getAll);
recipesRouter.get('/:id', recipesController.getById);

recipesRouter.use(verifyAuthorization);
recipesRouter.post('/', recipesController.createRecipe);
recipesRouter.put('/:id', recipesController.updateById);
recipesRouter.delete('/:id', recipesController.remove);

recipesRouter.put('/:id/image',
  verifyAuthorization, upload.single('image'), recipesController.uploadImage );

module.exports = {
  usersRouter,
  loginRouter,
  recipesRouter
};
