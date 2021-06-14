const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');
chai.use(chaiHttp);

const server = require('../api/app');
const { getConnection } = require('./connectionMock');
const { expect } = chai;

let connectionMock;

describe('GET /recipes', async () => {
  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('When get all recipes with success', () => {
    let response;

    before(async () => {
      const recipesCollection = connectionMock.db('Cookmaster').collection('recipes');
      await recipesCollection.insertMany([
        {
          name: 'exampleRecipe1',
          ingredients: 'exampleIngredients1',
          preparation: 'examplePreparation1'
        },
        {
          name: 'exampleRecipe2',
          ingredients: 'exampleIngredients2',
          preparation: 'examplePreparation2'
        }
      ]);

      response = await chai.request(server)
        .get('/recipes')
        .send({});
    });

    it('should return a 200 status code', () => {
      expect(response).to.have.status(200);
    });

    it('should have a body in the response', () => {
      expect(response.body).to.be.an('array');
    });
  });

});
