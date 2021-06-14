const { MongoMemoryServer } = require('mongodb-memory-server');
const { MongoClient } = require('mongodb');

let connectionMock;
const DBserver = new MongoMemoryServer();
const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getConnection = async () => {
  const URLMock = await DBserver.getUri();
  return connectionMock
    ? connectionMock
    : MongoClient.connect(URLMock, OPTIONS);
};

module.exports = { getConnection };