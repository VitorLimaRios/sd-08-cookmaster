const app = require('./app');
const db = require('./config');
const mongoose = require('mongoose');

const PORT = 3000;
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
    this.routes();

    this.express.listen(PORT, () => console.log(`API REST funcionando na porta ${PORT}`));
  }

  database() {
    mongoose.connect(db.uri, OPTIONS);
  }

  routes() {
    this.express.use(require('./routes'));
  }
}
module.exports = new App().express;
