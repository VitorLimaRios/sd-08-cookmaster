require('dotenv').config();

const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

module.exports = async () => {
  try {
    const mongodb = new MongoMemoryServer();
    const uri = await mongodb.getUri();

    return MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
