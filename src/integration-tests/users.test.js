const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');

const server = require('../api/app');
const connection = require('./mockConnection');

const { expect } = chai;
chai.use(chaiHttp);

let connectionMock;

describe('Testa os endpoints do users', () => {
  before(async () => {
    connectionMock = await connection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('Testa o caminho "/users"', () => {
    let response;

    before(async () => {
      const body = {
        name: 'a mock name',
        email: 'amockemail@email.com',
        password: 'amockpassword',
      };
    });
  });
});
