const chai = require('chai');
const sinon = require('sinon');
const chaiHTTP = require('chai-http');
const { MongoClient } = require('mongodb');
const mockedConnection = require('./mockedConnection');

const server = require('../api/app');
const { expect } = require('chai');
chai.use(chaiHTTP);

const LOGIN = {
  name: 'Mário Pardo',
  email: 'mario@email.com',
  password: '123456',
}

const ADMIN = {
  name: 'admin',
  email: 'root@email.com',
  password: 'admin',
}

describe('POST /users', () => {
  let connectionMock;
  before(async () => {
    connectionMock = await mockedConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  })
  
  describe('Quando não é passado "name", "email" e "password".', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
      .post('/users')
      .send({})
    });

    it('Retorna status 400.', () => {
      expect(response).to.have.status(400);
    });

    it('Retorna um objeto.', () => {
      expect(response.body).to.be.an('object');
    });

    it('É esperado haver uma propriedade "message".', () => {
      expect(response.body).to.have.property('message');
    });

    it('É espera que "message" possua o texto "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equals('Invalid entries. Try again.')
    });
  })
  
  describe('Quando é passado um "email" invalido.', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
      .post('/users')
      .send({ name: 'Teste', email: 'test@', password: '123456'})
    });

    it('Retorna status 400.', () => {
      expect(response).to.have.status(400);
    });

    it('Retorna um objeto.', () => {
      expect(response.body).to.be.an('object');
    });

    it('É esperado haver uma propriedade "message".', () => {
      expect(response.body).to.have.property('message');
    });

    it('É espera que "message" possua o texto "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equals('Invalid entries. Try again.')
    });
  });

  describe('Quando é passado um "email" já registrado', () => {
    let response;
    before(async () => {
      await connectionMock.db('Cookmaster').collection('users').deleteMany({});
      await connectionMock.db('Cookmaster').collection('users').insertOne(LOGIN);

      response = await chai.request(server)
        .post('/users')
        .send(LOGIN) 
    });

    it('Retorna status 409', () => {
      expect(response).to.have.status(409);
    });

    it('Retorna um objeto.', () => {
      expect(response.body).to.be.an('object');
    });

    it('É esperado haver uma propriedade "message".', () => {
      expect(response.body).to.have.property('message');
    });

    it('É espera que "message" possua o texto "Email already registered"', () => {
      expect(response.body.message).to.be.equals('Email already registered')
    });
  });

  describe('Quando o login é válido', () => {
    let response;
    before(async () => {
      await connectionMock.db('Cookmaster').collection('users').deleteMany({});

      response = await chai.request(server)
        .post('/users')
        .send(LOGIN) 
    });

    it('Retorna status 201', () => {
      expect(response).to.have.status(201);
    });
    
    it('Retorna um objeto.', () => {
      expect(response.body).to.be.an('object');
    });

    it('É esperado haver uma propriedade "user".', () => {
      expect(response.body).to.have.property('user');
    });

    it('É esperado haver uma propriedade "name".', () => {
      expect(response.body.user).to.have.property('name');
    });

    it('É esperado haver uma propriedade "email".', () => {
      expect(response.body.user).to.have.property('email');
    });

    it('É esperado haver uma propriedade "role".', () => {
      expect(response.body.user).to.have.property('role');
    });

    it('É esperado haver uma propriedade "_id".', () => {
      expect(response.body.user).to.have.property('_id');
    });
  })
});

describe('POST /login', () => {
  let connectionMock;
  before(async () => {
    connectionMock = await mockedConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('Quando não é passado "email" e "password".', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
      .post('/login')
      .send({})
    });

    it('Retorna status 401.', () => {
      expect(response).to.have.status(401);
    });

    it('Retorna um objeto.', () => {
      expect(response.body).to.be.an('object');
    });

    it('É esperado haver uma propriedade "message".', () => {
      expect(response.body).to.have.property('message');
    });

    it('É esperado que "message" possua o texto "All fields must be filled"', () => {
      expect(response.body.message).to.be.equals('All fields must be filled')
    });
  });

  describe('Quando é passado um "email" inválido', () => {
    let response;
    before(async () => {
      await connectionMock.db('Cookmaster').collection('users').deleteMany({});
      await connectionMock.db('Cookmaster').collection('users').insertOne(LOGIN);

      response = await chai.request(server)
      .post('/login')
      .send({ email: 'test@', password: '123456'})
    });

    it('Retorna status 401.', () => {
      expect(response).to.have.status(401);
    });

    it('Retorna um objeto.', () => {
      expect(response.body).to.be.an('object');
    });

    it('É esperado haver uma propriedade "message".', () => {
      expect(response.body).to.have.property('message');
    });

    it('É esperado que "message" possua o texto "Incorrect username or password"', () => {
      expect(response.body.message).to.be.equals('Incorrect username or password');
    });
  });

  describe('Quando é passado uma "senha" inválida', () => {
    let response;
    before(async () => {
      await connectionMock.db('Cookmaster').collection('users').deleteMany({});
      await connectionMock.db('Cookmaster').collection('users').insertOne(LOGIN);

      response = await chai.request(server)
      .post('/login')
      .send({ email: 'mario@email.com', password: '12345'})
    });

    it('Retorna status 401.', () => {
      expect(response).to.have.status(401);
    });

    it('Retorna um objeto.', () => {
      expect(response.body).to.be.an('object');
    });

    it('É esperado haver uma propriedade "message".', () => {
      expect(response.body).to.have.property('message');
    });

    it('É esperado que "message" possua o texto "Incorrect username or password"', () => {
      expect(response.body.message).to.be.equals('Incorrect username or password');
    });
  });

  describe('Quando é feito um login válido', () => {
    let response;
    before(async () => {
      await connectionMock.db('Cookmaster').collection('users').deleteMany({});
      await connectionMock.db('Cookmaster').collection('users').insertOne(LOGIN);

      response = await chai.request(server)
      .post('/login')
      .send({ email: 'mario@email.com', password: '123456'})
    });

    it('Retorna status 200.', () => {
      expect(response).to.have.status(200);
    });

    it('Retorna um objeto.', () => {
      expect(response.body).to.be.an('object');
    });

    it('É esperado haver uma propriedade "token".', () => {
      expect(response.body).to.have.property('token');
    });
  })
})

describe('POST /users/admin', () => {
  let connectionMock;
  before(async () => {
    connectionMock = await mockedConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
    await connectionMock.db('Cookmaster').collection('users').deleteMany({});
  })

  describe('Quando um usuário que não é admin faz um registro de admin', () => {
    let response;
    before(async () => {
      await connectionMock.db('Cookmaster').collection('users').insertOne(LOGIN);

      token = await chai.request(server)
      .post('/login')
      .send({ email: 'mario@email.com', password: '123456'});
      
      response = await chai.request(server)
        .post('/users/admin')
        .set('authorization', token)
        .send(ADMIN)
    });
    
    it('Retorna status 403', () => {
      console.log(response);
    })
  });
})

