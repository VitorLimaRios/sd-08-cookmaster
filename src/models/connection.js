const { MongoClient } = require('mongodb');

const connectionMongo = async () => {
  // const url = 'mongodb://mongodb:27017/';
  const url = 'mongodb://localhost:27017/';
  const dbName = 'Cookmaster';
  try {
    const conn = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const dbSchema = conn.db(dbName);
    return dbSchema;
  }catch (err) {
    console.error(err.message);
    return process.exit(1);
  }
};

module.exports = connectionMongo;
