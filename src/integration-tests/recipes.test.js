const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');
const { expect } = chai;
const app = require('../api/app');
const connection = require('./mockConnect');

chai.use(chaiHttp);

const STATUS_401 = 401;

const RECIPE_MOCK = {
    name: "receita de vó",
    ingredients: "tudo que engorda",
    preparation: "daquele jeito",
    userId: 1,
  };

const toBeAnObjectMessageTest = 'O body retornado tem forma de objeto';

describe('Testa o endpoint "/recipes"', () => {
    before(async () => {
      connectionMock = await connection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    });
    after(async () => {
      MongoClient.connect.restore();
    });
    describe('Testa se não é possível adicionar uma receita sem estar logado', () => {
      let response;
      before(async () => {
        const collectionRecipes = connectionMock.db('Cookmaster').collection('recipes');
        await collectionRecipes.deleteMany({});

        response = await chai.request(app).post('/recipes').send(RECIPE_MOCK);
      });
      it('O status da resposta é "401"', () => {
        expect(response).to.have.status(STATUS_401);
      });
      it(toBeAnObjectMessageTest, () => {
        expect(response.body).to.be.an('object');
      });
      it('O body tem uma propriedade "message"', () => { 
        expect(response.body).to.have.property('message'); });
    });
});