const mongoClient = require('mongodb').MongoClient;
const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';
//const MONGO_DB_URL = 'mongodb://127.0.0.1:27017/Cookmaster'; 

connection = () =>
  mongoClient
    .connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db('Cookmaster'))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

module.exports = connection;
