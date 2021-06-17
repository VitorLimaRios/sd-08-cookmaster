const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const indexRouter = require('../routes/index');

app.use(bodyParser.json());

app.use(indexRouter);

module.exports = app;
