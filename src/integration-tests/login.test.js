const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');

const app = require('../api/app');
const connection = require('./mockConnect');

const { expect } = chai;
chai.use(chaiHttp);

const STATUS_401 = 401;
const STATUS_200 = 200;

const toBeAnObjectMessageTest = 'O body retornado tem forma de objeto';

const USER_MOCK = {
  name: 'user',
  email: 'user@email.com',
  password: 'user',
}; 

const LOGIN_OK = {
  email: 'user@email.com',
  password: 'user',
};

const LOGIN_ERR = {
  email: 123,
  password: 'user',
};

const LOGIN_ERR_PASS = {
  email: 'user@email.com',
  password: 1,
};

let connectionMock;

describe('Testa o endpoint "/login"', () => {

  before(async () => {
    connectionMock = await connection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('Testa um login válido', () => {

    let response;

    before(async () => {
      const collection = connectionMock.db('Cookmaster').collection('users');
      await collection.deleteMany({});
      await collection.insertOne(USER_MOCK);

      response = await chai.request(app).post('/login').send(LOGIN_OK);
    });

    it('O status da resposta é "200"', () => {
      expect(response).to.have.status(STATUS_200);
    });

    it(toBeAnObjectMessageTest, () => {
      expect(response.body).to.be.an('object');
    });

    it('O body tem uma propriedade "token"', () => {
      expect(response.body).to.have.property('token');
    });

    it('"token" tem um valor', () => {
      expect(response.body.token).to.not.be.empty;
    });
  });

  describe('Testa um login sem email', () => {
    let response;

    before(async () => {
      const collection = connectionMock.db('Cookmaster').collection('users');
      await collection.deleteMany({});
      await collection.insertOne(USER_MOCK);

      response = await chai.request(app).post('/login').send({ password: 'user' });
    });

    it('O status da resposta é "401"', () => {
      expect(response).to.have.status(STATUS_401);
    });

    it(toBeAnObjectMessageTest, () => {
      expect(response.body).to.be.an('object');
    });

    it('O body tem uma propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('"message" tem o valor igual a "All fields must be filled"', () => {
      expect(response.body.message).to.be.equal('All fields must be filled');
    });
  });

  describe('Testa um login sem senha', () => {

    let response;

    before(async () => {
      const collection = connectionMock.db('Cookmaster').collection('users');
      await collection.deleteMany({});
      await collection.insertOne(USER_MOCK);

      response = await chai.request(app).post('/login').send({ email: 'user@email.com' }); });

    it('O status da resposta é "401"', () => {
      expect(response).to.have.status(STATUS_401);
    });

    it(toBeAnObjectMessageTest, () => {
      expect(response.body).to.be.an('object');
    });
    it('O body tem uma propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });
    it('"message" tem o valor igual a "All fields must be filled"', () => {
      expect(response.body.message).to.be.equal('All fields must be filled');
    });
  });

  describe('Testa um login com um email inválido', () => {

    let response;
    before(async () => {
      const collection = connectionMock.db('Cookmaster').collection('users');
      await collection.deleteMany({});
      await collection.insertOne(USER_MOCK);
      response = await chai.request(app).post('/login').send(LOGIN_ERR);
    });
    it('O status da resposta é "401"', () => {
      expect(response).to.have.status(STATUS_401);
    });
    it(toBeAnObjectMessageTest, () => {
      expect(response.body).to.be.an('object');
    });
    it('O body tem uma propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });
    it('"message" tem o valor igual a "Incorrect username or password"', () => {
      expect(response.body.message).to.be.equal('Incorrect username or password');
    });
  });
  describe('Testa um login com uma senha inválida', () => {
    let response;
    before(async () => {
      const collection = connectionMock.db('Cookmaster').collection('users');
      await collection.deleteMany({});
      await collection.insertOne(USER_MOCK);

      response = await chai.request(app).post('/login').send({ ...LOGIN_ERR_PASS });
    });
    it('O status da resposta é "401"', () => {
      expect(response).to.have.status(STATUS_401);
    });
    it(toBeAnObjectMessageTest, () => {
      expect(response.body).to.be.an('object');
    });
    it('O body tem uma propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });
    it('"message" tem o valor igual a "Incorrect username or password"', () => {
      expect(response.body.message).to.be.equal('Incorrect username or password');
    });
  });
});