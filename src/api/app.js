const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('../routes/user.routes');
const loginRouter = require('../routes/login.routes');
const recipesRouter = require('../routes/recipes.routes');
// const imageRoutes = require('../routes/image.routes');

const app = express();

app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.send();
});

app.use('/users', userRouter);

app.use('/login', loginRouter);

app.use('/recipes', recipesRouter);

// // app.use('/images', imageRoutes);

module.exports = app;
