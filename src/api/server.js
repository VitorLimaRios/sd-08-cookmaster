const app = require('./app');
const e = require('express');
const db = require('./config');
const mongoose = require('mongoose');
const multer = require('multer');

const PORT = 3000;
const upload = multer({ dest: 'uploads' });
const OPTIONS = { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
};

class App {
  constructor() {
    this.express = app;

    this.database();
    this.middlewares();
    this.routes();

    this.express.listen(PORT, () => console.log(`API REST funcionando na porta ${PORT}`));
  }

  database() {
    mongoose.connect(db.uri, OPTIONS);
  }

  middlewares() {
    this.express.use(e.json());
    this.express.use(e.static(__dirname + '/uploads'), upload.single('image'));
  }

  routes() {
    this.express.use(require('./routes'));
  }
}
module.exports = new App().express;
