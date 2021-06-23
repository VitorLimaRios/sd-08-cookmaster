const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const server = require('../api/app');

chai.use(chaiHttp);
const { expect } = chai;

describe('POST /users', () => {
  describe('quando usuário é criado com sucesso', () => {
    const payload = { 
      name: 'Fake Name',
      email: 'fakemail@gmail.com',
      password: 'senha123'
    };

    let response;
    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock,
        { useNewUrlParser: true, useUnifiedTopology: true }
      );

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      response = await chai.request(server)
        .post('/users')
        .send(payload);
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('retorna o código de status 201', () => {
      expect(response).to.have.status(201);
    });
  });

  describe('quando o payload não é valido e usuario não é criado', () => {
    const payload = { 
      email: 'fakemail@gmail.com',
      password: ''
    };

    let response;
    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock,
        { useNewUrlParser: true, useUnifiedTopology: true }
      );

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      response = await chai.request(server)
        .post('/users')
        .send(payload);
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('retorna o código de status 400', () => {
      expect(response).to.have.status(400);
    });

    it('retorna o objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('tal objeto tem a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a menssagem é "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });
  });
});

describe('POST /login', () => {
  describe('quando o login é efetuado com sucesso', () => {
    const userData = { 
      name: 'Fake Name',
      email: 'fakemail@gmail.com',
      password: 'senha123'
    };
    
    const payload = { 
      email: 'fakemail@gmail.com',
      password: 'senha123'
    };

    let response;
    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock,
        { useNewUrlParser: true, useUnifiedTopology: true }
      );

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster')
        .collection('users')
        .insertOne(userData);

      response = await chai.request(server)
        .post('/login')
        .send(payload);
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('retorna o código de status 200', () => {
      expect(response).to.have.status(200);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.a('object');
    });

    it('objeto de resposta possui a propriedade "token"', () => {
      expect(response.body).to.have.property('token');
    });
  });
});

describe('POST /login', () => {
  describe('quando o login é efetuado com sucesso', () => {
    const adminData = { 
      name: 'fake-admin',
      email: 'root@email.com',
      password: 'fake-admin',
      role: 'admin'
    };
    
    const userDataToToken = { 
      email: 'root@email.com',
      password: 'fake-admin',
    };

    const payload = {
      name: 'Fake Name',
      email: 'fakemail@gmail.com',
      password: 'senha123'
    };

    let response;
    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock,
        { useNewUrlParser: true, useUnifiedTopology: true }
      );

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster')
        .collection('users')
        .insertOne(adminData);

      const { body: { token } } = await chai.request(server)
        .post('/login')
        .send(userDataToToken);

      response = await chai.request(server)
        .post(`/users/admin`)
        .set('authorization', token)
        .send(payload);
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('retorna o código de status 201', () => {
      expect(response).to.have.status(201);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.a('object');
    });

    it('objeto de resposta possui a propriedade "user"', () => {
      expect(response.body).to.have.property('user');
    });

    it('tal propriedade possui outro objeto com as propriedades "_id", "name", "email", "password", "role"', () => {
      expect(response.body.user).to.include.all.keys('_id', 'name', 'email', 'password', 'role');
    });
  });
});
