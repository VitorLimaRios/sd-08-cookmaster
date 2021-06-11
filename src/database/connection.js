const mongoose = require('mongoose');

const DB_NAME = 'Cookmaster';
const MONGO_DB_URL = `mongodb://localhost:27017/${DB_NAME}`;

mongoose.connect(MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
mongoose.connection.once('open', () => {
  console.log('Connection with MongoDB has successfully been made.');
}).on('error', (error) => {
  console.log(error);
});

module.exports = mongoose;
