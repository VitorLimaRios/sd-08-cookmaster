const mongoose = require('mongoose');

const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';

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
