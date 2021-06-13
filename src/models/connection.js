const { MongoClient } = require('mongodb');

const connectionMongo = async () => {
  const url = 'mongodb://mongodb:27017/Cookmaster';
  // const url = 'mongodb://localhost:27017/';
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
    return err;
  }
};

module.exports = connectionMongo;
