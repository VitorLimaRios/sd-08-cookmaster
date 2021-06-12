const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { OPTIONS } = require('../api/utils/consts');

let connectionMock;

const DBServer = new MongoMemoryServer();

const getConnection = async () => {
  const URLMock = await DBServer.getUri();
  return connectionMock ? connectionMock : MongoClient.connect(URLMock, OPTIONS);
}

module.exports = { getConnection };
