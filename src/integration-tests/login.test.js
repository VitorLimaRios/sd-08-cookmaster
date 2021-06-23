const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');

const server = require('../api/app');
const connection = require('./mock.connection');

const { expect } = chai;
chai.use(chaiHttp);

const VALID_LOGIN = {
  email: 'mockuseremail@email.com',
  password: 'mockuserpassword',
};

const INVALID_LOGIN = {
  email: 'invalidmockuseremail@email.com',
  password: 'mockuserpassword',
};

let mock;

describe('Tests the /login endpoint', () => {
  before(async () => {
    mock = await connection();

    sinon.stub(MongoClient, 'connect').resolves(mock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('1 - Tests a valid login', () => {
    let response;

    before(async () => {
      const users = mock.db('Cookmaster').collection('users');
      await users.deleteMany({});
      await users.insertOne(VALID_LOGIN);

      response = await chai.request(server).post('/login').send(VALID_LOGIN);
    });

    it('1 - Returns a HTTP OK status', () => {
      expect(response).to.have.status(200);
    });

    it('2 - Returns an object in body response', () => {
      expect(response.body).to.be.an('object');
    });

    it('3 - Returns a "token" key in the object of the body response', () => {
      expect(response.body).to.have.property('token');
    });

    it('4 - Checks if the "token" key is not empty', () => {
      expect(response.body.token).to.not.be.empty;
    });
  });

  describe('2 - Tests a login with empty e-mail field', () => {
    let response;

    before(async () => {
      const users = mock.db('Cookmaster').collection('users');
      await users.deleteMany({});
      await users.insertOne(VALID_LOGIN);

      response = await chai.request(server).post('/login').send({ password: 'password' });
    });

    it('1 - Returns a HTTP Unauthorized status', () => {
      expect(response).to.have.status(401);
    });

    it('2 - Returns an object in body response', () => {
      expect(response.body).to.be.an('object');
    });

    it('3 - Returns a message key in the object of the body response', () => {
      expect(response.body).to.have.property('message');
    });

    it('4 - Checks if the message key has "All fields must be filled" as value', () => {
      expect(response.body.message).to.be.equal('All fields must be filled');
    });
  });

  describe('3 - Tests a login with empty password', () => {
    let response;

    before(async () => {
      const users = mock.db('Cookmaster').collection('users');
      await users.deleteMany({});
      await users.insertOne(VALID_LOGIN);

      response = await chai
        .request(server)
        .post('/login')
        .send({ email: 'email@email.com' });
    });

    it('1 - Returns a HTTP Unauthorized status', () => {
      expect(response).to.have.status(401);
    });

    it('2 - Returns an object in body response', () => {
      expect(response.body).to.be.an('object');
    });

    it('3 - Returns a message key in the object of the body response', () => {
      expect(response.body).to.have.property('message');
    });

    it('4 - Checks if the message key has "All fields must be filled" as value', () => {
      expect(response.body.message).to.be.equal('All fields must be filled');
    });
  });

  describe('4 - Tests a login with invalid e-mail', () => {
    let response;

    before(async () => {
      const users = mock.db('Cookmaster').collection('users');
      await users.deleteMany({});
      await users.insertOne(VALID_LOGIN);

      response = await chai.request(server).post('/login').send(INVALID_LOGIN);
    });

   it('1 - Returns a HTTP Unauthorized status', () => {
      expect(response).to.have.status(401);
    });

    it('2 - Returns an object in body response', () => {
      expect(response.body).to.be.an('object');
    });

    it('3 - Returns a message key in the object of the body response', () => {
      expect(response.body).to.have.property('message');
    });

    it('4 - Checks if the message key has "Incorrect username or password" as value', () => {
      expect(response.body.message).to.be.equal('Incorrect username or password');
    });
  });

  describe('5 - Tests a login with invalid password', () => {
    let response;

    before(async () => {
      const users = mock.db('Cookmaster').collection('users');
      await users.deleteMany({});
      await users.insertOne(VALID_LOGIN);

      response = await chai
        .request(server)
        .post('/login')
        .send({ ...VALID_LOGIN, password: 1234 });
    });

    it('1 - Returns a HTTP Unauthorized status', () => {
      expect(response).to.have.status(401);
    });

    it('2 - Returns an object in body response', () => {
      expect(response.body).to.be.an('object');
    });

    it('3 - Returns a message key in the object of the body response', () => {
      expect(response.body).to.have.property('message');
    });

    it('4 - Checks if the message key has "Incorrect username or password" as value', () => {
      expect(response.body.message).to.be.equal('Incorrect username or password');
    });
  });
});