const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');
chai.use(chaiHttp);

const server = require('../api/app');
const { expect } = require('chai');
const { getConnection } = require('./connectionsMock');

let connectionMock;

describe('DELETE /recipes/:id', () => {
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
        .delete('/recipes/:id')
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
        .delete('/recipes/:id')
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

  describe('Quando o usuário passado não é o mesmo que criou a receita', () => {

    let userLogin;
    let createRecipe;
    let userFAKE;
    let recipeDelete;
    before(async () => {
      const usersCollection = connectionMock.db('Cookmaster').collection('users');
      await usersCollection.insertOne({
        name: 'User Name',
        email: 'user@email.com',
        password: 'senha123',
        role: 'user',
      });

      await usersCollection.insertOne({
        name: 'User Name 2',
        email: 'user2@email.com',
        password: 'senha321',
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

      userFAKE = await chai.request(server)
        .post('/login')
        .send({
          email: 'user2@email.com',
          password: 'senha321',
        });

        recipeDelete = await chai.request(server)
          .delete(`/recipes/${createRecipe.body.recipe._id}`)
          .send({})
          .set('authorization', userFAKE.body.token);
    });

    after(async () => {
      const usersCollection = connectionMock.db('Cookmaster').collection('users');
      const recipeCollection = connectionMock.db('Cookmaster').collection('recipes')
      await usersCollection.deleteMany();
      await recipeCollection.deleteMany();
    });

    it('Retorna código de status "401"', () => {
      expect(recipeDelete).to.have.status(401);
    });

    it('Retona um objeto no body', () => {
      expect(recipeDelete.body).to.be.an('object');
    });

    it('Objeto retornado possui a propriedade "message"', () => {
      expect(recipeDelete.body).to.have.property('message');
    });

    it('A propriedade "message" contém o "Erro de permissão"', () => {
      expect(recipeDelete.body.message).to.be.equals('Erro de permissão');
    });


  });

  describe('Quando a receita é editada com sucesso', () => {

    let userLogin;
    let createRecipe;
    let recipeDelete;
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

        recipeDelete = await chai.request(server)
          .delete(`/recipes/${createRecipe.body.recipe._id}`)
          .set('authorization', userLogin.body.token);
    });

    after(async () => {
      const usersCollection = connectionMock.db('Cookmaster').collection('users');
      const recipeCollection = connectionMock.db('Cookmaster').collection('recipes')
      await usersCollection.deleteMany();
      await recipeCollection.deleteMany();
    });

    it('Retorna código de status "204"', () => {
      expect(recipeDelete).to.have.status(204);
    });

    it('Retorna vazio o body', () => {
      expect(recipeDelete.body).to.be.empty;
    });
  });
});