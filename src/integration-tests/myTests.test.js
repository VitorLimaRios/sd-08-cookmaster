const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

chai.use(chaiHttp);
const { expect } = chai;

const mongoDbUrl = 'mongodb://localhost:27017/Cookmaster';

const server = require('../api/app');

describe('POST /users cadastro de usuario', async () => {
  describe('quando é criado com sucesso', () => {
    let response;
    // const DBServer = new MongoMemoryServer();
  
    before(async () => {
      response = await chai.request(server)
        .post('/users')
        .send({
          name: 'test',
          email: 'test@test.com',
        });
    });

    it('retorna o código de status 400', () => {
      expect(response).to.have.status(400);
    });

    it('retorna mensagem de erro', () => {
      expect(response.body).to.have.property('message');
    })
  });
});

describe('POST /login logar usuario', async () => {
  describe('quando é logado com sucesso', () => {
    let response;
    let db;
    let connection;

    before(async () => {
      connection = await MongoClient.connect(mongoDbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      db = connection.db('Cookmaster');
      await db.collection('users').deleteMany({});

      response = await chai.request(server)
        .post('/users')
        .send({
          name: "test",
          email: "test@test.com",
          password: "123456"
      });
    });

    it('logado com sucesso', () => {
      expect(response).to.have.status(201);
    });
  });
});

describe('POST /users/admin cadastrar admin', async () => {
  describe('quando cadastra um admin', () => {
    let response;
    let db;
    let connection;

    before(async () => {
      connection = await MongoClient.connect(mongoDbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      db = connection.db('Cookmaster');
      await db.collection('users').deleteMany({});
      await db.collection('users').insertOne({ name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' });

      response = await chai.request(server)
        .post('/users')
        .send({
          name: "test",
          email: "test@test.com",
          password: "123456"
      });
    });

    it('logado com sucesso', () => {
      expect(response).to.have.status(201);
    });
  });
});

describe('GET /recipes listar receitas', async () => {
  describe('listar todas as receitas', () => {
    let response;
    let db;
    let connection;

    before(async () => {
      connection = await MongoClient.connect(mongoDbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      db = connection.db('Cookmaster');
      await db.collection('users').deleteMany({});

      await chai.request(server)
        .post('/users')
        .send({
          name: "test",
          email: "test@test.com",
          password: "123456"
      });

      const loginUser = await chai.request(server)
        .post('/login')
        .send({
          name: "test",
          email: "test@test.com",
          password: "123456"
      });

      await chai.request(server)
        .post('/recipes')
        .set('authorization', loginUser.body.token)
        .send({
          name: 'alho',
          ingredients: 'pao, alho, fe',
          preparation: 'coloca tudo na churrasqueira'
      });

      response = await chai.request(server)
        .get('/recipes');
    });

    it('logado com sucesso', () => {
      expect(response).to.have.status(200);
    });
  });
});

describe('POST /users/admin cadastrar admin', async () => {
  describe('quando cadastra um admin', () => {
    let response;
    let db;
    let connection;

    before(async () => {
      connection = await MongoClient.connect(mongoDbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      db = connection.db('Cookmaster');
      await db.collection('users').deleteMany({});

      await chai.request(server)
        .post('/users')
        .send({
          name: "test",
          email: "test@test.com",
          password: "123456"
      });

      const loginUser = await chai.request(server)
        .post('/login')
        .send({
          name: "test",
          email: "test@test.com",
          password: "123456"
      });

      const recipe = await chai.request(server)
        .post('/recipes')
        .set('authorization', loginUser.body.token)
        .send({
          name: 'alho',
          ingredients: 'pao, alho, fe',
          preparation: 'coloca tudo na churrasqueira'
      });

      await chai.request(server)
        .get(`/recipes/${recipe.recipe._id}`);

      it('logado com sucesso', () => {
        expect(response).to.have.status(200);
      });

      it('body é um objeto', () => {
        expect(response.body).to.be.an('object');
      });
    });
  });
});
