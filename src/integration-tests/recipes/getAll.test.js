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

describe('É possível recupear todas as receitas em GET /recipes', () => {
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


  describe('Quando encontrar receitas no banco de dados', () => {
    let response;

    beforeEach(async () => {
      const db = await conn.db('Cookmaster');

      const recipeId = ObjectId();

      const payloadRecipe = {
        _id: recipeId,
        name: "Frango",
        ingredients: "Frango, sazon",
        preparation: "10 minutos no forno",
        userId: ObjectId()
      }

      await db.collection('recipes').insertOne(payloadRecipe);

      response = await chai.request(app)
        .get(`/recipes`)
        .send()
        .then(({ body }) => body);
    })

    it('retorna um array contendo as receitas', () => {
      expect(response).to.be.an('array');
      expect(response).to.have.lengthOf(1);
    })
  })

  describe('Quando não encontrar receitas', () => {
    let response;

    beforeEach(async () => {
      response = await chai.request(app)
        .get(`/recipes`)
        .send()
        .then(({ body }) => body);
    })

    it('retorna um array vazio', () => {
      expect(response).to.be.an('array');
      expect(response).to.be.empty;
    })
  })
})
