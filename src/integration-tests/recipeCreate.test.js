const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');
chai.use(chaiHttp);

const server = require('../api/app');
const { expect } = require('chai');
const { getConnection } = require('./connectionsMock');

let connectionMock;

describe('POST /recipes', () => {
  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('Quando não é passado o token JWT', () => {

    let response;
    before(async () => {
      response = await chai.request(server)
        .post('/recipes')
        .send({})
        .set('authorization', '');
    });

    it('Retorna código de status "401"', () => {
      expect(response).to.have.status(401);
    });

    it('Retona um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('Objeto retornado possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('A propriedade "message" contém o valor "missing auth token"', () => {
      expect(response.body.message).to.be.equals('missing auth token');
    });
  });

  describe('Quando o token passado não é um JWT', () => {

    let response;
    before(async () => {
      response = await chai.request(server)
        .post('/recipes')
        .send({})
        .set('authorization', '999');
    });

    it('Retorna código de status "401"', () => {
      expect(response).to.have.status(401);
    });

    it('Retona um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('Objeto retornado possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('A propriedade "message" contém o valor "jwt malformed"', () => {
      expect(response.body.message).to.be.equals('jwt malformed');
    });
  });

  describe('Quando a receita é cadastrada com sucesso', () => {

    let userLogin;
    let createRecipe;
    before(async () => {
      const usersCollection = connectionMock.db('Cookmaster').collection('users');
      await usersCollection.insertOne({
        name: 'User Name',
        email: 'user@email.com',
        password: 'senha123',
        role: 'user',
      });

      userLogin = await chai.request(server)
        .post('/login')
        .send({
          email: 'user@email.com',
          password: 'senha123',
        });
      
      
      createRecipe = await chai.request(server)
        .post('/recipes')
        .send({
          name: 'Pão de Batata',
          ingredients: 'Batata, Farinha',
          preparation: 'Misture tudo e forno por 45min a 180 graus',
        })
        .set('authorization', userLogin.body.token);
    });

    after(async () => {
      const usersCollection = connectionMock.db('Cookmaster').collection('users');
      const recipeCollection = connectionMock.db('Cookmaster').collection('recipes')
      await usersCollection.deleteMany();
      await recipeCollection.deleteMany();
    });

    it('Retorna código de status "201"', () => {
      expect(createRecipe).to.have.status(201);
    });

    it('Retona um objeto no body', () => {
      expect(createRecipe.body).to.be.an('object');
    });

    it('Objeto retornado possui a propriedade "recipe"', () => {
      expect(createRecipe.body).to.have.property('recipe');
    });

    it('A propriedade "recipe" contém o "_id"', () => {
      expect(createRecipe.body.recipe).to.have.property('_id');
    });
  });
});