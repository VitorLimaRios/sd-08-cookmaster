const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');
chai.use(chaiHttp);

const server = require('../api/app');
const { getConnection } = require('./connectionMock');
const { expect } = chai;

let connectionMock;

describe('POST /login', async () => {
  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('When user is logged in with success', async () => {
    let response;
    before(async () => {
      const usersCollection = connectionMock.db('Cookmaster').collection('users');
      await usersCollection.insertOne({
        name: 'exampleName',
        email: 'example@example.com',
        password: 'examplePassword'
      });

      response = await chai.request(server)
        .post('/login')
        .send({
          email: 'example@example.com',
          password: 'examplePassword'
        });
    });

    it('should return a 200 status code', () => {
      expect(response).to.have.status(200);
    });

    it('should have a body in the response', () => {
      expect(response.body).to.be.an('object');
    });

    it('should have a property "token" in the response body', () => {
      expect(response.body).to.have.property('token');
    });
  });

  describe('When no password is send in the request', async () => {
    let response;
    before(async () => {
      const usersCollection = connectionMock.db('Cookmaster').collection('users');
      await usersCollection.insertOne({
        name: 'exampleName',
        email: 'example@example.com',
        password: 'examplePassword'
      });

      response = await chai.request(server)
        .post('/login')
        .send({
          email: 'example@example.com',
          password: ''
        });
    });

    it('should return a 401 status code', () => {
      expect(response).to.have.status(401);
    });

    it('should have a body with property "message" in the response', () => {
      expect(response.body).to.have.property('message');
    });

    it('should have the message "All fields must be filled"', () => {
      expect(response.body.message).to.be.equals('All fields must be filled');
    });
  });

  describe('When the password is is not correct', async () => {
    let response;
    before(async () => {
      const usersCollection = connectionMock.db('Cookmaster').collection('users');
      await usersCollection.insertOne({
        name: 'exampleName',
        email: 'example@example.com',
        password: 'examplePassword'
      });

      response = await chai.request(server)
        .post('/login')
        .send({
          email: 'example@example.com',
          password: 'Passwordexample'
        });
    });

    it('should return a 401 status code', () => {
      expect(response).to.have.status(401);
    });

    it('should have a body with property "message" in the response', () => {
      expect(response.body).to.have.property('message');
    });

    it('should have the message "Incorrect username or password"', () => {
      expect(response.body.message).to.be.equals('Incorrect username or password');
    });
  });
});
