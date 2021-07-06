const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');
const { expect } = chai;
const app = require('../api/app');
const connection = require('./mockConnect');

chai.use(chaiHttp);

const STATUS_400 = 400;
const STATUS_201 = 201;
const STATUS_403 = 403;
const STATUS_409 = 409;

const toBeAnObjectMessageTest = 'O body retornado tem forma de objeto';

const ADMIN_MOCK = {
  name: 'admin',
  email: 'admin@email.com',
  password: 'admin',
  role: 'admin',
};

const USER_MOCK = {
  name: 'user',
  email: 'userteste@email.com',
  password: 'user',
};

const USER_NAME_ERR = {
  name: '',
  email: 'user@email.com',
  password: 'user',
};
const USER_EMAIL_ERR = {
  name: 'User',
  email: 123,
  password: 'user',
};

let connectionMock;

describe('Testa o endpoint "/users"', () => {
  before(async () => {
    connectionMock = await connection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });
  after(async () => {
    MongoClient.connect.restore();
  });
  describe('Testa se o usuário é adicionado', () => {
    let response;
    before(async () => {
      const collection = connectionMock.db('Cookmaster').collection('users');
      await collection.deleteMany({});
      response = await chai.request(app).post('/users').send(USER_MOCK);
    });
    it('O status da resposta é "201"', () => {
      expect(response).to.have.status(STATUS_201);
    });
    it(toBeAnObjectMessageTest, () => {
      expect(response.body).to.be.an('object');
    });
    it('O body tem uma propriedade "user"', () => { 
      expect(response.body).to.have.property('user'); });
    it('"user" contém a propriedade "name"', () => { 
      expect(response.body.user).to.have.property('name'); });
    it('"name" tem o valor igual a "user"', () => { 
      expect(response.body.user.name).to.be.equal('user'); });
    it('"user" contém a propriedade "email"', () => { 
      expect(response.body.user).to.have.property('email'); });
    it('"email" tem o valor igual a "userteste@email.com"', () => { 
      expect(response.body.user.email).to.be.equal('userteste@email.com'); });
    it('"user" contém a propriedade "role"', () => { 
      expect(response.body.user).to.have.property('role'); });
    it('"user" contém a propriedade "role" com valor igual a "user"', () => { 
      expect(response.body.user.role).to.be.equal('user'); });
    it('"user" não contém a propriedade "_id"', () => { 
      expect(response.body.user).to.not.have.property('_id'); });
  });
  describe('Testa um login com o campo "name" inválido', () => {
    let response;
    before(async () => {
      const collection = connectionMock.db('Cookmaster').collection('users');
      await collection.deleteMany({});
      response = await chai.request(app).post('/users').send(USER_NAME_ERR);
    });
    it('O status da resposta é "400"', () => { 
      expect(response).to.have.status(STATUS_400); });
    it(toBeAnObjectMessageTest, () => { expect(response.body).to.be.an('object'); });
    it('O body tem uma propriedade "message"', () => { 
      expect(response.body).to.have.property('message'); });
    it('"message" tem o valor igual a "Invalid entries. Try again."', () => { 
      expect(response.body.message).to.be.equal('Invalid entries. Try again.'); });
  });
  describe('Testa um login com o campo "email" inválido', () => {
    let response;
    before(async () => {
      const collection = connectionMock.db('Cookmaster').collection('users');
      await collection.deleteMany({});
      response = await chai.request(app).post('/users').send(USER_EMAIL_ERR);
    });
    it('O status da resposta é "400"', () => { 
      expect(response).to.have.status(STATUS_400); });
    it(toBeAnObjectMessageTest, () => { expect(response.body).to.be.an('object'); });
    it('O body tem uma propriedade "message"', () => { 
      expect(response.body).to.have.property('message'); });
    it('"message" tem o valor igual a "Invalid entries. Try again."', () => { 
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');});
  });
  describe('Testa um login com o campo "email" já cadastrado', () => {
    let response;
    before(async () => {
      const collection = connectionMock.db('Cookmaster').collection('users');
      await collection.deleteMany({});
      await collection.insertOne(USER_MOCK);
      response = await chai.request(app).post('/users').send(USER_MOCK);
    });
    it('O status da resposta é "409"', () => { 
      expect(response).to.have.status(STATUS_409); });
    it(toBeAnObjectMessageTest, () => { expect(response.body).to.be.an('object'); });
    it('O body tem uma propriedade "message"', () => { 
      expect(response.body).to.have.property('message'); });
    it('"message" é do tipo "string"', () => { 
      expect(response.body.message).to.be.a('string'); });
    it('"message" tem o valor igual a "Email already registered"', () => { 
      expect(response.body.message).to.be.equal('Email already registered'); });
  });
  describe('Testa se sendo um admin é possível cadastrar um admin', () => {
    let response;
    before(async () => {
      const collection = connectionMock.db('Cookmaster').collection('users');
      await collection.deleteMany({});
      await collection.insertOne({...ADMIN_MOCK});
      
      const token = await chai.request(app).post('/login')
      .send({ email: 'admin@email.com', password: 'admin' })
        .then((response) => response.body.token);

      response = await chai.request(app).post('/users/admin').set('authorization', token)
        .send({name: 'Admin 2', email: 'admin2@email.com', password: 'admin2'});
      });
    it('O status da resposta é "201"', () => { 
      expect(response).to.have.status(STATUS_201); });
    it(toBeAnObjectMessageTest, () => { expect(response.body).to.be.an('object'); });
    it('O body tem uma propriedade "user"', () => { 
      expect(response.body).to.have.property('user'); });
    it('"user" contém a propriedade "name"', () => { 
      expect(response.body.user).to.have.property('name'); });
    it('"user" contém a propriedade "email"', () => { 
      expect(response.body.user).to.have.property('email'); });
    it('"user" contém a propriedade "role"', () => { 
      expect(response.body.user).to.have.property('role'); });
    it('"user" contém a propriedade "role" com valor igual a "admin"', () => { 
      expect(response.body.user.role).to.be.equal('admin'); });
    it('"user" contém a propriedade "_id"', () => { 
      expect(response.body.user).to.have.property('_id'); });
  });
  describe('Testa se não sendo um admin é possível cadastrar um admin', () => {
    let response;
    before(async () => {
      const collection = connectionMock.db('Cookmaster').collection('users');
      await collection.deleteMany({});
      await chai.request(app).post('/users').send({
        name: 'User',
        email: 'user@email.com',
        password: 'user',
      });
      const token = await chai.request(app).post('/login')
        .send({ email: 'user@email.com', password: 'user' })
        .then((response) => response.body.token);
      response = await chai.request(app).post('/users/admin').set('authorization', token)
        .send({ name: 'Another admin', email: 'anotheradmin@email.com',
          password: 'anotheradmin',
        });
    });
    it('O status da resposta é "403"', () => { 
      expect(response).to.have.status(STATUS_403); });
    it(toBeAnObjectMessageTest, () => { expect(response.body).to.be.an('object'); });
    it('O body tem uma propriedade "message"', () => { 
      expect(response.body).to.have.property('message'); });
    it('"message" é do tipo "string"', () => { 
      expect(response.body.message).to.be.a('string'); });
    it('"message" tem o valor igual a "Only admins can register new admins"', () => {
      expect(response.body.message).to.be.equal('Only admins can register new admins');
    });
  });
});