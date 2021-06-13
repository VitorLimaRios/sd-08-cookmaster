const mongoose = require('mongoose');

const OPTIONS = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

mongoose.connect('mongodb://localhost:27017/Cookmaster', OPTIONS);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (error) => {
  console.log('Erro: ', error.message);
});

const app = require('./app');

const PORT = 3000;

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
