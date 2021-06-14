const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');
chai.use(chaiHttp);

const server = require('../api/app');
const { getConnection } = require('./connectionMock');
const { expect } = chai;

let connectionMock;

describe('GET /recipes/:id', async () => {
  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('When get the specific recipe with success', () => {
    let response;

    before(async () => {
      const usersCollection = connectionMock.db('Cookmaster').collection('users');
      await usersCollection.insertOne({
        name: 'exampleName',
        email: 'example@example.com',
        password: 'examplePassword'
      });

      const token = await chai.request(server)
        .post('/login')
        .send({
          email: 'example@example.com',
          password: 'examplePassword'
        })
        .then((res) => res.body.token);

      const recipe = await chai.request(server)
        .post('/recipes')
        .set('authorization', token)
        .send({
          name: 'exampleRecipe',
          ingredients: 'exampleIngredients',
          preparation: 'examplePreparation'
        })
        .then((res) => res.body.recipe);

      response = await chai.request(server)
        .get(`/recipes/${recipe._id}`)
        .send({});
    });

    it('should return a 200 status code', () => {
      expect(response).to.have.status(200);
    });

    it('should have a body in the response', () => {
      expect(response.body).to.be.an('object');
    });
  });

  describe('When send an invalid ID', () => {
    let response;

    before(async () => {
      response = await chai.request(server)
        .get('/recipes/9999')
        .send({});
    });

    it('should return a 404 status code', () => {
      expect(response).to.have.status(404);
    });

    it('should have a body with property "message" in the response', () => {
      expect(response.body).to.have.property('message');
    });

    it('should have the message "recipe not found"', () => {
      expect(response.body.message).to.be.equals('recipe not found');
    });
  });

  describe('When there is no return from the DB', () => {
    let response;

    before(async () => {
      response = await chai.request(server)
        .get(`/recipes/60c7ae27f206d3f3f4cde498`)
        .send({});
    });

    it('should return a 404 status code', () => {
      expect(response).to.have.status(404);
    });

    it('should have a body with property "message" in the response', () => {
      expect(response.body).to.have.property('message');
    });

    it('should have the message "recipe not found"', () => {
      expect(response.body.message).to.be.equals('recipe not found');
    });
  });

});
