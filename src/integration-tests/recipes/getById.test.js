const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { MongoClient, ObjectId } = require('mongodb');
const { expect } = require('chai');

const app = require('../../api/app');
const getConnection = require('../getConnection');
const connection = require('../../models/connection');

chai.use(chaiHttp);

describe('É possível recuperar uma receita pelo ID em GET /recipes/:id', () => {
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

  describe('Quando a receita for encontrada', () => {
    let response;

    beforeEach(async () => {
      const recipeId = ObjectId();

      const payloadRecipe = {
        _id: recipeId,
        name: 'Frango',
        ingredients: 'Frango, sazon',
        preparation: '10 minutos no forno',
        userId: ObjectId()
      };

      const db = await conn.db('Cookmaster');
      await db.collection('recipes').insertOne(payloadRecipe);

      response = await chai.request(app)
        .get(`/recipes/${recipeId}`)
        .send()
    });

    it('retorna um objeto contendo a receita', () => {
      expect(response.body).to.have.all.keys([
        '_id', 'name', 'ingredients', 'preparation', 'userId'
      ]);
    });

    it('retorna status 200', () => {
      expect(response).to.have.status(200);
    });
  });

  describe('Quando a receita não for encontrada', () => {
    let response;

    beforeEach(async () => {
      response = await chai.request(app)
        .get(`/recipes/${ObjectId()}`)
        .send()
    });

    it('retorna um objeto contendo a mensagem de erro', () => {
      expect(response.body.message).to.equal('recipe not found');
    });

    it('retorna status 404', () => {
      expect(response).to.have.status(404);
    });
  });

  describe('Quando o Id for inválido', () => {
    let response;

    beforeEach(async () => {
      response = await chai.request(app)
        .get(`/recipes/invalidId`)
        .send()
    });

    it('retorna um objeto contendo a mensagem de erro', () => {
      expect(response.body.message).to.equal('recipe not found');
    });

    it('retorna status 404', () => {
      expect(response).to.have.status(404);
    });
  });
});
