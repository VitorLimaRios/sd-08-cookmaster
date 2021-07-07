const sinon = require('sinon');
const { expect } = require('chai');
const { ObjectId } = require('mongodb');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const UserService = require('../services/users');
const UserController = require('../controllers/user');
const UserModel = require('../models/user');
const server = require('../api/app');

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const mockInput = {
  name: 'rafael',
  email: 'rafael@email.com',
  password: '1234'
};

const mockResult = {
  _id: ObjectId(),
  name: 'rafael',
  email: 'rafael@email.com',
  role: 'user'
};

const mockInvalid = {
  err: {
    code: 'invalid_data',
    message: 'Invalid entries. Try again.'
  }
};

describe('controller user', () => {
  let res, req, next;

    beforeEach(() => {
      res = {};
      req = {};
      req.body = {};
      res.json = sinon.stub().returns();
      res.status = sinon.stub().returns(res);
      next = sinon.stub().returns();
    });
  describe('quando usuario é criado com sucesso', () => {
    
      beforeEach(() => {
        res.body = mockInput;
      });

      before(() => sinon.stub(UserService, 'create').resolves(mockResult));

      after(() => UserService.create.restore());

      it('retorna status 201', async () => {
        await UserController.create(req, res, next);
        expect(res.status.calledWith(201)).to.be.true;
      });
      it('chama response.json com um objeto referente ao usuário', async () => {
        await UserController.create(req, res, next);
        expect(res.json.args[0][0]).to.deep.equal(mockResult);
      });
  });
});

describe('Testa o model do user', () => {
  const user = {
    name: 'rafael',
    email: 'rafael@email.com',
    password: '1234'
  };

  before(async () => {
    let DBServer = await MongoMemoryServer.create();
    let URLMock = await DBServer.getUri();

    let connectionMock = await MongoClient
      .connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });

    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  describe('criar user', async () => {
    it('retorna um objeto', async () => {
      const { name, email, password } = user;
      const result = await UserModel.create(name, email, password);

      expect(result).to.be.an('object');
    });
  });
})
