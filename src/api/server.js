require('dotenv').config();
const mongoose = require('mongoose');

const OPTIONS = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

mongoose.connect(process.env.DATABASELOCAL, OPTIONS);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (error) => {
  console.log('Erro: ', error.message);
});

const app = require('./app');

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
