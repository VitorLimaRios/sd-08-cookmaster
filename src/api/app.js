const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('../routes/user.routes');
const loginRouter = require('../routes/login.routes');
const recipesRouter = require('../routes/recipes.routes');
const imageRoutes = require('../routes/image.routes');
const {
  authenticationByToken,
} = require('../middleware/recipesAuth.middleware');
const {
  uploadImageById,
  getImage,
} = require('../controllers/recipes.controllers');
//colando inicio
const { uploadFile } = require('../middleware/recipesAuth.middleware');
const { resolve } = require('path');

const uploadPath = resolve(__dirname, '..', 'uploads');
//colando fim

const app = express();

app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.send();
});

app.use('/users', userRouter);

app.use('/login', loginRouter);

app.use('/recipes', recipesRouter);

// app.use('/images', imageRoutes);

//colando inicio
app.put(
  '/recipes/:id/image',
  authenticationByToken,
  uploadFile(uploadPath),
  uploadImageById
);

app.get('/images/:filename', getImage);
//colando fim

module.exports = app;
