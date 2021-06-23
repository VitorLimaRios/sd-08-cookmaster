const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');

const server = require('../api/app');
const connection = require('./mock.connection');

const { expect } = chai;
chai.use(chaiHttp);

const VALID_USER = {
  name: 'Mock User',
  email: 'mockuseremail@email.com',
  password: 'mockuserpassword',
};

const ADMIN_USER = {
  name: 'Mock Admin',
  email: 'mockadminemail@email.com',
  password: 'mockadminpassword',
  role: 'admin',
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

let mock;

describe('Tests the /users endpoint', () => {
  before(async () => {
    mock = await connection();
    sinon.stub(MongoClient, 'connect').resolves(mock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('1 - Tests the endpoint for creating a user', () => {
    let response;

    before(async () => {
      const users = mock.db('Cookmaster').collection('users');
      await users.deleteMany({});
      response = await chai.request(server).post('/users').send(VALID_USER);
    });

    it('1 - Returns a HTTP Created status code', () => {
      expect(response).to.have.status(201);
    });

    it('2 - Returns an object in body response', () => {
      expect(response.body).to.be.an('object');
    });

    it('3 - Returns a "user" object in the object of the body response', () => {
      expect(response.body).to.have.property('user');
    });

    it('4 - The "user" object in the body response has "name" as key', () => {
      expect(response.body.user).to.have.property('name');
    });

    it('5 - The "user" object in the body response has "email" as key', () => {
      expect(response.body.user).to.have.property('email');
    });

    it('6 - The "user" object in the body response has "role" as key', () => {
      expect(response.body.user).to.have.property('role');
    });

    it('7 - The "user" object in the body response has "user" as "role" value', () => {
      expect(response.body.user.role).to.be.equal('user');
    });

    it('8 - The "user" object in the body response has "_id" as key', () => {
      expect(response.body.user).to.have.property('_id');
    });
  });

  describe('2 - Tests a login with invalid "name" field', () => {
    let response;

    before(async () => {
      const users = mock.db('Cookmaster').collection('users');
      await users.deleteMany({});

      response = await chai.request(server).post('/users').send(INVALID_USER_NAME);
    });

    it('1 - Returns a HTTP Bad Request status code', () => {
      expect(response).to.have.status(400);
    });

    it('2 - Returns an object in body response', () => {
      expect(response.body).to.be.an('object');
    });

    it('3 - The object in the body response has "message" as key', () => {
      expect(response.body).to.have.property('message');
    });

    it('4 - The object in the body response has "Invalid entries. Try again." as value for "message" key', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });
  });

  describe('3 - Testa um login com campo "email" inválido', () => {
    let response;

    before(async () => {
      const users = mock.db('Cookmaster').collection('users');
      await users.deleteMany({});

      response = await chai.request(server).post('/users').send(INVALID_USER_EMAIL);
    });

    it('1 - Returns a HTTP Bad Request status code', () => {
      expect(response).to.have.status(400);
    });

    it('2 - Returns an object in body response', () => {
      expect(response.body).to.be.an('object');
    });

    it('3 - The object in the body response has "message" as key', () => {
      expect(response.body).to.have.property('message');
    });

    it('4 - The object in the body response has "Invalid entries. Try again." as value for "message" key', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });
  });

  describe('4 - Tests a login with an already registred e-mail', () => {
    let response;

    before(async () => {
      const users = mock.db('Cookmaster').collection('users');
      await users.deleteMany({});
      await users.insertOne(VALID_USER);

      response = await chai.request(server).post('/users').send(VALID_USER);
    });

    it('1 - Returns a HTTP Conflict status code', () => {
      expect(response).to.have.status(409);
    });

    it('2 - Returns an object in body response', () => {
      expect(response.body).to.be.an('object');
    });

    it('3 - The object in the body response has "message" as key', () => {
      expect(response.body).to.have.property('message');
    });

    it('4 - The object in the body response has "Email already registered" as value for "message" key', () => {
      expect(response.body.message).to.be.equal('Email already registered');
    });
  });

  describe('5 - Tests if a admin user can create another admin user', () => {
    let response;

    before(async () => {
      const users = mock.db('Cookmaster').collection('users');
      await users.deleteMany({});

      await chai.request(server).post('/users').send(ADMIN_USER);

      const token = await chai
        .request(server)
        .post('/login')
        .send({ email: 'mockadminemail@email.com', password: 'mockadminpassword' })
        .then((response) => response.body.token);

      response = await chai
        .request(server)
        .post('/users/admin')
        .set('authorization', token)
        .send({
          name: 'Mock User',
          email: 'mockuseremail@email.com',
          password: 'mockuserpassword',
        });
    });

    it('1 - Returns a HTTP Created status code', () => {
      expect(response).to.have.status(201);
    });

    it('2 - Returns an object in body response', () => {
      expect(response.body).to.be.an('object');
    });

    it('3 - Returns a "user" object in the object of the body response', () => {
      expect(response.body).to.have.property('user');
    });

    it('4 - The object in the body response has "name" as key', () => {
      expect(response.body.user).to.have.property('name');
    });

    it('5 - The object in the body response has "email" as key', () => {
      expect(response.body.user).to.have.property('email');
    });

    it('6 - The object in the body response has "role" as key', () => {
      expect(response.body.user).to.have.property('role');
    });

    it('7 - The object in the body response has "admin" as value for the "role" key', () => {
      expect(response.body.user.role).to.be.equal('admin');
    });

    it('8 - The object in the body response has "_id" as key', () => {
      expect(response.body.user).to.have.property('_id');
    });
  });

  describe('6 - Tests if a user with user role can not create an admin user', () => {
    let response;

    before(async () => {
      const users = mock.db('Cookmaster').collection('users');
      await users.deleteMany({});

      await chai.request(server).post('/users').send({
        name: 'Mock User',
        email: 'mockuseremail@email.com',
        password: 'mockuserpassword',
      });

      const token = await chai
        .request(server)
        .post('/login')
        .send({ email: 'mockuseremail@email.com', password: 'mockuserpassword' })
        .then((response) => response.body.token);

      response = await chai
        .request(server)
        .post('/users/admin')
        .set('authorization', token)
        .send({
          name: 'Mock User 2',
          email: 'mockuseremail2@email.com',
          password: 'mockuserpassword2',
        });
    });

    it('1 - Returns a HTTP Forbidden status code', () => {
      expect(response).to.have.status(403);
    });

    it('2 - Returns an object in the body response', () => {
      expect(response.body).to.be.an('object');
    });

    it('3 - Has the key "message" in object of the body response', () => {
      expect(response.body).to.have.property('message');
    });

    it('4 - The "message" key has "Only admins can register new admins" as value in the object of the body response', () => {
      expect(response.body.message).to.be.equal('Only admins can register new admins');
    });
  });
});