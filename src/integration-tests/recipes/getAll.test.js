const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { MongoClient, ObjectId } = require('mongodb');
const { expect } = require('chai');

const app = require('../../api/app');
const getConnection = require('../getConnection');
const connection = require('../../models/connection');

chai.use(chaiHttp);

describe('É possível recuperar todas as receitas em GET /recipes', () => {
  let conn;

  before(async () => {
    conn = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(conn);
  });

  beforeEach(async () => {
    const db = await conn.db('Cookmaster');
    await db.collection('users').deleteMany({});
    await db.collection('recipes').deleteMany({});
  });

  after(() => {
    MongoClient.connect.restore();
    connection.close();
  });

  describe('Quando encontrar receitas no banco de dados', () => {
    let response;

    beforeEach(async () => {
      const db = await conn.db('Cookmaster');

      const recipeId = ObjectId();

      const payloadRecipe = {
        _id: recipeId,
        name: 'Frango',
        ingredients: 'Frango, sazon',
        preparation: '10 minutos no forno',
        userId: ObjectId()
      };

      await db.collection('recipes').insertOne(payloadRecipe);

      response = await chai.request(app)
        .get('/recipes')
        .send()
        .then((response) => response);
    });

    it('retorna um array contendo as receitas', () => {
      expect(response.body).to.be.an('array');
      expect(response.body).to.have.lengthOf(1);
    });

    it('retorna status 200', () => {
      expect(response).to.have.status(200);
    });
  });

  describe('Quando não encontrar receitas', () => {
    let response;

    beforeEach(async () => {
      response = await chai.request(app)
        .get('/recipes')
        .send()
        .then((response) => response);
    });

    it('retorna um array vazio', () => {
      expect(response.body).to.be.an('array');
      expect(response.body).to.be.empty;
    });

    it('retorna status 200', () => {
      expect(response).to.have.status(200);
    });
  });
});
