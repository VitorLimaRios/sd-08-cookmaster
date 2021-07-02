const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const server = require('../api/app');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

chai.use(chaiHttp);
const { expect } = chai;

describe('POST /users', () => {
  describe('Quando não é passado o campo "name" do usuário', () => {
    let response;

    before(async () => {
      response = await chai.request(server)
        .post('/users')
        .send({
          email: 'email@email.com',
          password: 'string',
        });
    });

    // after(() => {});

    it('retorna o código de status "400"', () => {
      expect(response).to.have.status(400);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de respoasta possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade message possui a seguinte frase "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equals('Invalid entries. Try again.');
    });
  });

  // describe('Quando o usuário é cadastrado com sucesso', () => {
  //   let response;
  //   const DBServer = new MongoMemoryServer();

  //   before(async () => {
  //     // const URLMock = await DBServer.getUri();
  //     // const OPTIONS = {
  //     //   useNewUrlParser: true,
  //     //   useUnifiedTopology: true,
  //     // };

  //     // const connectionMock = await MongoClient.connect(URLMock, OPTIONS);

  //     const connectionMock = await DBServer.getUri()
  //     .then(URLMock => MongoClient.connect(
  //         URLMock,
  //         { useNewUrlParser: true, useUnifiedTopology: true }
  //     ));

  //     sinon.stub(MongoClient, 'connect').resolves(connectionMock);

  //   //   connectionMock.db('Cookmaster')
  //   //     .collection('users')
  //   //     .insertOne({});

  //     response = await chai.request(server)
  //       .post('/users')
  //       .send({
  //         name: 'string',
  //         email: 'email@email.com',
  //         password: 'string',
  //       });
  //   });

  //   // after(() => {});

  //   it('retorna o código de status "201"', () => {
  //     expect(response).to.have.status(201);
  //   });

  // });
});

describe('POST /login', () => {
  describe('Quando não é passado o campo email', () => {
    let response;

    before(async () => {
      response = await chai.request(server)
        .post('/login')
        .send({
          password: 'abc123',
        });
    });

    // after(() => {});

    it('retorna o código de status "401"', () => {
      expect(response).to.have.status(401);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a mensagem possui a seguinte frase "All fields must be filled"', () => {
      expect(response.body.message).to.be.equals('All fields must be filled');
    });
  });
});

describe('POST /recipes', () => {
  describe('Quando não é passado o nome da receita', () => {
    let response;

    before(async() => {
      response = await chai.request(server)
        .post('/recipes')
        .send({
          ingredients: 'ingredients',
          preparation: 'preparation',
        });
    });

    // after(() => {});

    it('retorna o código de status "400"', () => {
      expect(response).to.have.status(400);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a mensagem possui a seguinte frase "All fields must be filled"', () => {
      expect(response.body.message).to.be.equals('Invalid entries. Try again.');
    });
  });
});

describe('GET /recipes/:id', () => {
  describe('Quando não encontra uma receita com o id passado', () => {
    let response;
    const ID = '9999999';

    before(async() => {
      response = await chai.request(server)
        .get(`/recipes/${ID}`);
    });

    // after(() => {});

    it('retorna o código de status "404"', () => {
      expect(response).to.have.status(404);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a mensagem possui a seguinte frase "All fields must be filled"', () => {
      expect(response.body.message).to.be.equals('recipe not found');
    });
  });
});

describe('PUT /recipes/:id', () => {
  describe('Quando sem está autenticação', () => {
    let response;
    const ID = '9999999';

    before(async() => {
      response = await chai.request(server)
        .put(`/recipes/${ID}`)
        .send({
          name: 'name',
          ingredients: 'ingredients',
          preparation: 'preparation',
        });
    });

    // after(() => {});

    it('retorna o código de status "401"', () => {
      expect(response).to.have.status(401);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a mensagem possui a seguinte frase "All fields must be filled"', () => {
      expect(response.body.message).to.be.equals('missing auth token');
    });
  });
});

describe('DELETE /recipes/:id', () => {
  describe('Quando a receita com o id passado não é encontrada', () => {
    let response;
    const ID = '9999999';

    before(async() => {
      response = await chai.request(server)
        .delete(`/recipes/${ID}`)
        .send({
          name: 'name',
          ingredients: 'ingredients',
          preparation: 'preparation',
        });
    });

    // after(() => {});

    it('retorna o código de status "404"', () => {
      expect(response).to.have.status(404);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a mensagem possui a seguinte frase "All fields must be filled"', () => {
      expect(response.body.message).to.be.equals('recipe not found');
    });
  });
});

// describe('PUT /recipes/:id/image', () => {
//   describe('Quando a receita com o id passado não é encontrada', () => {
//     let response;
//     const ID = '9999999';

//     before(async() => {
//       response = await chai.request(server)
//         .put(`/recipes/${ID}/image`);
//     });

//     // after(() => {});

//     it('retorna o código de status "404"', () => {
//       expect(response).to.have.status(404);
//     });

//     it('retorna um objeto no body', () => {
//       expect(response.body).to.be.an('object');
//     });

//     it('o objeto possui a propriedade "message"', () => {
//       expect(response.body).to.have.property('message');
//     });

//     it('a mensagem possui a seguinte frase "All fields must be filled"', () => {
//       expect(response.body.message).to.be.equals('recipe not found');
//     });
//   });
// });
