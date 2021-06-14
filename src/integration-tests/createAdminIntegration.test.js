const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');
chai.use(chaiHttp);

const server = require('../api/app');
const { getConnection } = require('./connectionMock');
const { expect } = chai;

let connectionMock;

describe('POST /users/admin', async () => {
  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('When an admin is created with success', () => {
    let response;

    before(async () => {
      const usersCollection = connectionMock.db('Cookmaster').collection('users');
      await usersCollection.insertOne({
        name: 'exampleAdmin',
        email: 'admin@example.com',
        password: 'adminadmin',
        role: 'admin'
      });

      const token = await chai.request(server)
        .post('/login')
        .send({
          email: 'admin@example.com',
          password: 'adminadmin'
        })
        .then((res) => res.body.token);

      response = await chai.request(server)
        .post('/users/admin')
        .set('authorization', token)
        .send({
          name: 'string',
          email: 'string',
          password: 'string'
        });
    });

    it('should return a 201 status code', () => {
      expect(response).to.have.status(201);
    });

    it('should have a body in the response', () => {
      expect(response.body).to.be.an('object');
    });

    it('should have a property "user" in the response body', () => {
      expect(response.body).to.have.property('user');
    });
  });

  describe('When no auth token is send', () => {
    let response;

    before(async () => {
      response = await chai.request(server)
        .post('/users/admin')
        .set('authorization', '')
        .send({
          name: 'string',
          email: 'string',
          password: 'string'
        });
    });

    it('should return a 403 status code', () => {
      expect(response).to.have.status(403);
    });

    it('should have a body with property "message" in the response', () => {
      expect(response.body).to.have.property('message');
    });

    it('should have the message "Only admins can register new admins"', () => {
      expect(response.body.message).to.be.equals('Only admins can register new admins');
    });
  });

  describe('When the role is not "admin"', () => {
    let response;

    before(async () => {
      const usersCollection = connectionMock.db('Cookmaster').collection('users');
      await usersCollection.insertOne({
        name: 'exampleUser',
        email: 'user@example.com',
        password: 'useruser',
        role: 'user'
      });

      const token = await chai.request(server)
        .post('/login')
        .send({
          email: 'user@example.com',
          password: 'useruser'
        })
        .then((res) => res.body.token);

      response = await chai.request(server)
        .post('/users/admin')
        .set('authorization', token)
        .send({
          name: 'string',
          email: 'string',
          password: 'string'
        });
    });

    it('should return a 403 status code', () => {
      expect(response).to.have.status(403);
    });

    it('should have a body with property "message" in the response', () => {
      expect(response.body).to.have.property('message');
    });

    it('should have the message "Only admins can register new admins"', () => {
      expect(response.body.message).to.be.equals('Only admins can register new admins');
    });
  });


});
