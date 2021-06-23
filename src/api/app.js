const express = require('express');
const {userRouter, loginRouter } = require('./routes');
const errorHandler = require('../middlewares/errorHandler');

const app = express();

app.use(express.json());
app.use('/users', userRouter);
app.use('/login', loginRouter);
app.get('/', (_request, response) => { response.send();});
app.use(errorHandler);

module.exports = app;
