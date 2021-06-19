const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

const indexRouter = require('../routes/index');

app.use(bodyParser.json());

app.use(indexRouter);

module.exports = app;
