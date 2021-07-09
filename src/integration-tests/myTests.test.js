const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

const {
  MongoClient
} = require('mongodb');
const {
  MongoMemoryServer
} = require('mongodb-memory-server');

chai.use(chaiHttp);
const {
  expect
} = chai;

const mongoDbUrl = 'mongodb://localhost:27017/Cookmaster';

const server = require('../api/app');

describe('POST /users cadastro de usuario', async () => {
  describe('quando é criado com sucesso', () => {
    let response;
    // const DBServer = new MongoMemoryServer();

    before(async () => {
      response = await chai.request(server)
        .post('/users')
        .send({
          name: 'test',
          email: 'test@test.com',
        });
    });

    it('retorna o código de status 400', () => {
      expect(response).to.have.status(400);
    });

    it('retorna mensagem de erro', () => {
      expect(response.body).to.have.property('message');
    })
  });
});

describe('POST /login logar usuario', async () => {
  describe('quando é logado com sucesso', () => {
    let response;
    let db;
    let connection;

    before(async () => {
      connection = await MongoClient.connect(mongoDbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      db = connection.db('Cookmaster');
      await db.collection('users').deleteMany({});

      response = await chai.request(server)
        .post('/users')
        .send({
          name: "test",
          email: "test@test.com",
          password: "123456"
        });
    });

    after(async () => {
      await connection.close();
    });

    it('logado com sucesso', () => {
      expect(response).to.have.status(201);
    });
  });
});

describe('POST /users/admin cadastrar admin', async () => {
  describe('quando cadastra um admin', () => {
    let response;
    let db;
    let connection;

    before(async () => {
      connection = await MongoClient.connect(mongoDbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      db = connection.db('Cookmaster');
      await db.collection('users').deleteMany({});
      await db.collection('users').insertOne({
        name: 'admin',
        email: 'root@email.com',
        password: 'admin',
        role: 'admin'
      });

      response = await chai.request(server)
        .post('/users')
        .send({
          name: "test",
          email: "test@test.com",
          password: "123456"
        });
    });

    after(async () => {
      await connection.close();
    });

    it('logado com sucesso', () => {
      expect(response).to.have.status(201);
    });

  });
});

describe('GET /recipes listar receitas', async () => {
  describe('listar todas as receitas', () => {
    let response;
    let db;
    let connection;

    before(async () => {
      connection = await MongoClient.connect(mongoDbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      db = connection.db('Cookmaster');
      await db.collection('users').deleteMany({});

      await chai.request(server)
        .post('/users')
        .send({
          name: "test",
          email: "test@test.com",
          password: "123456"
        });

      const loginUser = await chai.request(server)
        .post('/login')
        .send({
          name: "test",
          email: "test@test.com",
          password: "123456"
        });

      await chai.request(server)
        .post('/recipes')
        .set('authorization', loginUser.body.token)
        .send({
          name: 'alho',
          ingredients: 'pao, alho, fe',
          preparation: 'coloca tudo na churrasqueira'
        });

      response = await chai.request(server)
        .get('/recipes');
    });

    after(async () => {
      await connection.close();
    });

    it('logado com sucesso', () => {
      expect(response).to.have.status(200);
    });
  });
});

describe('POST /users/admin cadastrar admin', async () => {
  describe('quando cadastra um admin', () => {
    let response;
    let db;
    let connection;

    before(async () => {
      connection = await MongoClient.connect(mongoDbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      db = connection.db('Cookmaster');
      await db.collection('users').deleteMany({});

      await chai.request(server)
        .post('/users')
        .send({
          name: "test",
          email: "test@test.com",
          password: "123456"
        });

      const loginUser = await chai.request(server)
        .post('/login')
        .send({
          name: "test",
          email: "test@test.com",
          password: "123456"
        });

      const recipe = await chai.request(server)
        .post('/recipes')
        .set('authorization', loginUser.body.token)
        .send({
          name: 'alho',
          ingredients: 'pao, alho, fe',
          preparation: 'coloca tudo na churrasqueira'
        });

      await chai.request(server)
        .get(`/recipes/${recipe.recipe._id}`);
    });

    after(async () => {
      await connection.close();
    });

    it('logado com sucesso', () => {
      expect(response).to.have.status(200);
    });

    it('body é um objeto', () => {
      expect(response.body).to.be.an('object');
    });
  });
});

describe('POST /recipes erro ao cadastrar receita', async () => {
  describe('falta de token', () => {
    let response;
    let db;
    let connection;

    before(async () => {
      connection = await MongoClient.connect(mongoDbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      db = connection.db('Cookmaster');
      await db.collection('users').deleteMany({});

      response = await chai.request(server)
        .post('/recipes')
        .send({});
    });

    after(async () => {
      await connection.close();
    });

    it('falta de token', () => {
      expect(response.body).to.have.property('message');
    });
  });
});

describe('POST /recipes erro ao cadastrar receita', async () => {
  describe('erro ao cadastrar receita', () => {
    let response;
    let db;
    let connection;

    before(async () => {
      connection = await MongoClient.connect(mongoDbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      db = connection.db('Cookmaster');
      await db.collection('users').deleteMany({});

      await chai.request(server)
        .post('/users')
        .send({
          name: "test",
          email: "test@test.com",
          password: "123456"
        });

      const loginUser = await chai.request(server)
        .post('/login')
        .send({
          name: "test",
          email: "test@test.com",
          password: "123456"
        });

      response = await chai.request(server)
        .post('/recipes')
        .set('authorization', loginUser.body.token)
        .send({
          ingredients: 'pao, alho, fe',
          preparation: 'coloca tudo na churrasqueira'
        });
    });

    after(async () => {
      await connection.close();
    });

    it('dados insuficientes', () => {
      expect(response.body).to.have.property('message');
    });
  });
});

describe('PUT /recipes atualiza receita', async () => {
  describe('atualizar receita com sucesso', () => {
    let response;
    let db;
    let connection;
    console.log('cheguei aqui')
    before(async () => {
      connection = await MongoClient.connect(mongoDbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      db = connection.db('Cookmaster');
      await db.collection('users').deleteMany({});

      await chai.request(server)
        .post('/users')
        .send({
          name: "test",
          email: "test@test.com",
          password: "123456"
        });

      const loginUser = await chai.request(server)
        .post('/login')
        .send({
          name: "test",
          email: "test@test.com",
          password: "123456"
        });

      const recipe = await chai.request(server)
        .post('/recipes')
        .set('authorization', loginUser.body.token)
        .send({
          name: 'pao de alho',
          ingredients: 'pao, alho, fe',
          preparation: 'coloca tudo na churrasqueira'
        });

      console.log('TESTA EU AQUI', recipe.recipe._id);

      response = await chai.request(server)
        .put(`/recipes/${recipe.body.recipe._id}`)
        .set('authorization', loginUser.body.token)
        .send({
          name: 'Receita de frango do Jacquin editado',
          ingredients: 'Frango editado',
          preparation: '10 min no forno editado',
        });
    });

    after(async () => {
      await connection.close();
    });

    it('receita atualizada com sucesso', () => {
      expect(response).to.have.status(200);
    });
  });
});

describe('9 DELETE /recipes deleta receita', async () => {
  describe('deleta receita com sucesso', () => {
    let response;
    let db;
    let connection;

    before(async () => {
      connection = await MongoClient.connect(mongoDbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      db = connection.db('Cookmaster');
      await db.collection('users').deleteMany({});

      await chai.request(server)
        .post('/users')
        .send({
          name: "test",
          email: "test@test.com",
          password: "123456"
        });

      const loginUser = await chai.request(server)
        .post('/login')
        .send({
          name: "test",
          email: "test@test.com",
          password: "123456"
        });

      const recipe = await chai.request(server)
        .post('/recipes')
        .set('authorization', loginUser.body.token)
        .send({
          name: 'pao de alho',
          ingredients: 'pao, alho, fe',
          preparation: 'coloca tudo na churrasqueira'
        });

      console.log('TESTA EU AQUI', recipe.recipe._id);

      response = await chai.request(server)
        .delete(`/recipes/${recipe.body.recipe._id}`)
        .set('authorization', loginUser.body.token)
    });

    after(async () => {
      await connection.close();
    });

    it('receita atualizada com sucesso', () => {
      expect(response).to.have.status(204);
    });
  })
})
