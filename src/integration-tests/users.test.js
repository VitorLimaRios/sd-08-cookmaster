const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');

const server = require('../api/app');
const connection = require('./mockConnection');

const { expect } = chai;
chai.use(chaiHttp);

const VALID_USER = {
  name: 'Mock User',
  email: 'mockuseremail@email.com',
  password: 'mockuserpassword',
};

const INVALID_USER_NAME = {
  name: 123,
  email: 'mockuseremail@email.com',
  password: 'mockuserpassword',
};

const INVALID_USER_EMAIL = {
  name: 123,
  email: 'mockuseremail@email.com',
  password: 'mockuserpassword',
};

let connectionMock;

describe('Testa o caminho "/users"', () => {
  before(async () => {
    connectionMock = await connection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('1 - Testa um login válido', () => {
    let response;

    before(async () => {
      const usersCollection = connectionMock.db('Cookmaster').collection('users');
      await usersCollection.deleteMany({});
      response = await chai.request(server).post('/users').send(VALID_USER);
    });

    it('1 - retorna com código de estatus "201"', () => {
      expect(response).to.have.status(201);
    });

    it('2 - retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('3 - retorna um body com a propriedade "user"', () => {
      expect(response.body).to.have.property('user');
    });

    it('4 - a propriedade "user" deve ter a propriedade "name"', () => {
      expect(response.body.user).to.have.property('name');
    });

    it('5 - a propriedade "user" deve ter a propriedade "email"', () => {
      expect(response.body.user).to.have.property('email');
    });

    it('6 - a propriedade "user" deve ter a propriedade "role"', () => {
      expect(response.body.user).to.have.property('role');
    });

    it('7 - a propriedade "user" deve ter a propriedade "role" com valor "user"', () => {
      expect(response.body.user.role).to.be.equal('user');
    });

    it('8 - a propriedade "user" deve ter a propriedade "_id"', () => {
      expect(response.body.user).to.have.property('_id');
    });
  });

  describe('2 - Testa um login com campo "name" inválido', () => {
    let response;

    before(async () => {
      const usersCollection = connectionMock.db('Cookmaster').collection('users');
      await usersCollection.deleteMany({});

      response = await chai.request(server).post('/users').send(INVALID_USER_NAME);
    });

    it('1 - retorna com código de estatus "400"', () => {
      expect(response).to.have.status(400);
    });

    it('2 - retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('3 - objeto de resposta possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('4 - a propriedade "message" tem o valor "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });
  });

  describe('3 - Testa um login com campo "email" inválido', () => {
    let response;

    before(async () => {
      const usersCollection = connectionMock.db('Cookmaster').collection('users');
      await usersCollection.deleteMany({});

      response = await chai.request(server).post('/users').send(INVALID_USER_EMAIL);
    });

    it('1 - retorna com código de estatus "400"', () => {
      expect(response).to.have.status(400);
    });

    it('2 - retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('3 - objeto de resposta possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('4 - a propriedade "message" tem o valor "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });
  });

  describe('4 - Testa um login com campo "email" já cadastrado', () => {
    let response;

    before(async () => {
      const usersCollection = connectionMock.db('Cookmaster').collection('users');
      await usersCollection.deleteMany({});
      await usersCollection.insertOne(VALID_USER);

      response = await chai.request(server).post('/users').send(VALID_USER);
    });

    it('1 - retorna com código de estatus "409"', () => {
      expect(response).to.have.status(409);
    });

    it('2 - retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('3 - objeto de resposta possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('4 - a propriedade "message" tem o valor "Email already registered"', () => {
      expect(response.body.message).to.be.equal('Email already registered');
    });
  });
});