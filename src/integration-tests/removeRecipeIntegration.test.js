const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');
chai.use(chaiHttp);

const server = require('../api/app');
const { getConnection } = require('./connectionMock');
const { expect } = chai;

let connectionMock;

describe('DELETE /recipes/:id', async () => {
  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('When recipe is removed with success', () => {
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
        .delete(`/recipes/${recipe._id}`)
        .set('authorization', token)
        .send({});
    });

    it('should return a 204 status code', () => {
      expect(response).to.have.status(204);
    });

    it('should have no content in the body', () => {
      expect(response.body).to.be.empty;
    });
  });

  describe('When no auth token is send', () => {
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
        .delete(`/recipes/${recipe._id}`)
        .set('authorization', '')
        .send({});
    });

    it('should return a 401 status code', () => {
      expect(response).to.have.status(401);
    });

    it('should have a body with property "message" in the response', () => {
      expect(response.body).to.have.property('message');
    });

    it('should have the message "missing auth token"', () => {
      expect(response.body.message).to.be.equals('missing auth token');
    });
  });

  describe('When an invalid auth token is send', () => {
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
        .delete(`/recipes/${recipe._id}`)
        .set('authorization', '9999')
        .send({});
    });

    it('should return a 401 status code', () => {
      expect(response).to.have.status(401);
    });

    it('should have a body with property "message" in the response', () => {
      expect(response.body).to.have.property('message');
    });

    it('should have the message "jwt malformed"', () => {
      expect(response.body.message).to.be.equals('jwt malformed');
    });
  });

});
