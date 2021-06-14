const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');
chai.use(chaiHttp);

const server = require('../api/app');
const { expect } = require('chai');
const { getConnection } = require('./connectionsMock');

let connectionMock;

describe('GET /recipes', () => {
  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('Caso não tenha nenhuma receita cadastrada', () => {

    let response;
    before(async () => {
      response = await chai.request(server)
        .get('/recipes');
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

    it('A propriedade "message" contém a menssagem "Nenhuma receita cadastrada ainda!"', () => {
      expect(response.body.message).to.be.equals('Nenhuma receita cadastrada ainda!');
    });
  });


  describe('Quando a listagem de receitas é feita com sucesso', () => {

    let userLogin;
    let createRecipe;
    let getAllRecipes;
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


      getAllRecipes = await chai.request(server)
        .get('/recipes');
    });

    after(async () => {
      const usersCollection = connectionMock.db('Cookmaster').collection('users');
      const recipeCollection = connectionMock.db('Cookmaster').collection('recipes')
      await usersCollection.deleteMany();
      await recipeCollection.deleteMany();
    });

    it('Retorna código de status "200"', () => {
      expect(getAllRecipes).to.have.status(200);
    });

    it('Retona um array no body', () => {
      expect(getAllRecipes.body).to.be.a('array');
    });
  });
});