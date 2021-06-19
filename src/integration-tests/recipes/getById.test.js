const chai = require('chai');
const sinon = require('sinon')
const chaiHttp = require('chai-http');
const { MongoClient, ObjectId } = require('mongodb');
const { expect } = require('chai');
const jwt = require('jsonwebtoken');

const app = require('../../api/app');
const getConnection = require('../getConnection');
const connection = require('../../models/connection');
const secret = require('../../data/secret');

chai.use(chaiHttp);

describe('É possível recuperar uma receita pelo ID em GET /recipes/:id', () => {
  let conn;

  before(async () => {
    conn = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(conn);
  })

  beforeEach(async () => {
    const db = await conn.db('Cookmaster');
    await db.collection('users').deleteMany({});
    await db.collection('recipes').deleteMany({});
  })

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
        name: "Frango",
        ingredients: "Frango, sazon",
        preparation: "10 minutos no forno",
        userId: ObjectId()
      }

      const db = await conn.db('Cookmaster');
      await db.collection('recipes').insertOne(payloadRecipe);

      response = await chai.request(app)
        .get(`/recipes/${recipeId}`)
        .send()
        .then(({ body }) => body);
    })

    it('retorna um objeto contendo a receita', () => {
      expect(response).to.be.a('object');
      expect(response).to.have.all.keys([
        '_id', 'name', 'ingredients', 'preparation', 'userId'
      ]);
    })
  })

  describe('Quando a receita não for encontrada', () => {
    let response;

    beforeEach(async () => {
      response = await chai.request(app)
        .get(`/recipes/${ObjectId()}`)
        .send()
        .then(({ body }) => body);
    })

    it('retorna um objeto contendo a mensagem de erro', () => {
      expect(response).to.be.a('object');
      expect(response.message).to.equal('recipe not found');
    })
  })
})
