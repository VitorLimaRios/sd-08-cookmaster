const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

class ConnectionMock {
  constructor() {
    this.dbServer = new MongoMemoryServer();
  }

  async getConnection() {
    const URLMock = await this.dbServer.getUri();
    const OPTIONS = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    return MongoClient.connect(URLMock, OPTIONS);
  }
}

module.exports = ConnectionMock;
