const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');
chai.use(chaiHttp);

const server = require('../api/app');
const { getConnection } = require('./connectionMock');
const { expect } = chai;

let connectionMock;

describe('POST /users', async () => {
  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('When user is created with success', () => {
    let response;

    before(async () => {
      response = await chai.request(server)
        .post('/users')
        .send({
          name: 'exampleName',
          email: 'example@example.com',
          password: 'examplePassword'
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

  describe('When user is not created with success because of invaid email format', () => {
    let response;

    before(async () => {
      response = await chai.request(server)
        .post('/users')
        .send({
          name: 'exampleName',
          email: 'example@',
          password: 'examplePassword'
        });
    });

    it('should return a 400 status code', () => {
      expect(response).to.have.status(400);
    });

    it('should have a body with property "message" in the response', () => {
      expect(response.body).to.have.property('message');
    });

    it('should have the message "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equals('Invalid entries. Try again.');
    });
  });

  describe('When an email already exists and the user is not created', async () => {

    let response;

    before(async () => {
      // create first user
      await chai.request(server)
        .post('/users')
        .send({
          name: 'exampleName',
          email: 'example@example.com',
          password: 'examplePassword'
        });

      response = await chai.request(server)
        .post('/users')
        .send({
          name: 'exampleName',
          email: 'example@example.com',
          password: 'examplePassword'
        });
    });

    it('should return a 409 status code', () => {
      expect(response).to.have.status(409);
    });

    it('should have a body with property "message" in the response', () => {
      expect(response.body).to.have.property('message');
    });

    it('should have the message "Email already registered"', () => {
      expect(response.body.message).to.be.equals('Email already registered');
    });
  });

});
