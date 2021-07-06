const { MongoClient } = require('mongodb');
const server = require("../../api/server");
const chai = require("chai");
const { expect } = chai;
const sinon = require("sinon");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

const { getConnection } = require('./../connectionMock');

describe.only("POST /Recipes", () => {

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe("Não é passado name, ingredients e preparation", () => {
    let response;

    before(async () => {
      response = await chai.request(server).post("/recipes").send({});
    });

    it("Retorna código de erro 400", () => {
      expect(response).to.have.status(400);
    });
    it("Retorna um objeto como resposta", () => {
      expect(response.body).to.be.an("object");
    });
    it("Retorna uma propriedade com nome de 'message'", () => {
      expect(response.body).to.be.property("message");
    });
    it("Retorna a mensagem de erro dentro da propriedade 'message'", () => {
      expect(response.body.message).to.be.equals("Invalid entries. Try again.");
    });
  });
});
