const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');
chai.use(chaiHttp);

const server = require('../api/app');
const { expect } = require('chai');
const { getConnection } = require('./connectionsMock');

let connectionMock;

describe('GET /recipes:id', () => {
  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('O Id passado da receita seja inválido', () => {

    let response;
    before(async () => {
      response = await chai.request(server)
        .get('/recipes/999999');
    });

    it('Retorna código de status "404"', () => {
      expect(response).to.have.status(404);
    });

    it('Retona um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('Objeto retornado possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('A propriedade "message" contém a menssagem "recipe not found"', () => {
      expect(response.body.message).to.be.equals('recipe not found');
    });
  });

  describe('Quando o Id da receita é encontrado com sucesso', () => {

    let userLogin;
    let createRecipe;
    let IdRecipe;
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


        IdRecipe = await chai.request(server)
        .get(`/recipes/${createRecipe.body.recipe._id}`);
    });

    after(async () => {
      const usersCollection = connectionMock.db('Cookmaster').collection('users');
      const recipeCollection = connectionMock.db('Cookmaster').collection('recipes')
      await usersCollection.deleteMany();
      await recipeCollection.deleteMany();
    });

    it('Retorna código de status "200"', () => {
      expect(IdRecipe).to.have.status(200);
    });

    it('Retona um objeto no body', () => {
      expect(IdRecipe.body).to.be.an('object');
    });

    it('O objeto retornado contém um "_id"', () => {
      expect(IdRecipe.body).to.have.property('_id');
    });
  });
});