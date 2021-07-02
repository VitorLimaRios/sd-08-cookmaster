// https://github.com/tryber/sd-08-cookmaster/blob/e829394cd1264c2b2e1de4680e9b4a2996a4fa7e/src/integration-tests/change.me.test.js
// inspirado no codigo do Caio
const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const server = require('../api/app');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const deleteOne = require('../models/delete');

chai.use(chaiHttp);
const { expect } = chai;

describe('POST /users', () => {
  describe('Será validado que o campo "name" é obrigatório', () => {
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
  describe('Será validado que o campo "email" é obrigatório', () => {
    let response;

    before(async () => {
      response = await chai.request(server)
        .post('/users')
        .send({
          name: 'João ninguém',
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
  describe('Será validado que não é possível cadastrar usuário com o campo email inválido', () => {
    let response;

    before(async () => {
      response = await chai.request(server)
        .post('/users')
        .send({
          name: 'João ninguém',
          email: 'emailemail.com',
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
  describe('Será validado que é possível cadastrar usuário com sucesso', () => {
    let response;
    const DBServer = new MongoMemoryServer();

    before(async () => {
      // const URLMock = await DBServer.getUri();
      // const OPTIONS = {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
      // };

      // const connectionMock = await MongoClient.connect(URLMock, OPTIONS);
     console.log('entrei no before');
      const connectionMock = await DBServer.getUri()
      .then(URLMock => MongoClient.connect(
          URLMock,
          { useNewUrlParser: true, useUnifiedTopology: true }
      ))
      .catch(err => {
          console.log(err)
          done(err)
      });
      console.log('true ', DBServer.getInstanceInfo());
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      connectionMock.db('Cookmaster')
        .collection('users')
        .insertOne({
            name: 'string',
            email: 'email@email.com',
            password: 'string',
          });

      response = await chai.request(server)
        .post('/users')
        .send({
          name: 'string',
          email: 'email@email.com',
          password: 'string',
        });
        console.log(response);
    });

    after(async() => {
        console.log('entrei no after');
        console.log('true ', DBServer.getInstanceInfo());
        await DBServer.stop();
        console.log('False ', DBServer.getInstanceInfo());
    });
    it('existe uma resposta', () => {
        console.log(response,'teste1');
    
          expect(response).to.exist();
        console.log(response,'teste2');

        });
    
    console.log(response,'teste3');
    it('retorna o código de status "201"', () => {
    console.log(response,'teste4');

      expect(response).to.have.status(201);
    });

  });
//   Será validado que é possível ao cadastrar usuário, o valor do campo "role" tenha o valor "user"
    // describe('Será validado que é possível ao cadastrar usuário, o valor do campo "role" tenha o valor "user"', () => {
    // let response;
    // const DBServer = new MongoMemoryServer();

    // before(async () => {
    //   // const URLMock = await DBServer.getUri();
    //   // const OPTIONS = {
    //   //   useNewUrlParser: true,
    //   //   useUnifiedTopology: true,
    //   // };

    //   // const connectionMock = await MongoClient.connect(URLMock, OPTIONS);

    //   const connectionMock = await DBServer.getUri()
    //   .then(URLMock => MongoClient.connect(
    //       URLMock,
    //       { useNewUrlParser: true, useUnifiedTopology: true }
    //   ));

    //   sinon.stub(MongoClient, 'connect').resolves(connectionMock);

    // //   connectionMock.db('Cookmaster')
    // //     .collection('users')
    // //     .insertOne({});

    //   response = await chai.request(server)
    //     .post('/users')
    //     .send({
    //       name: 'string',
    //       email: 'email@email.com',
    //       password: 'string',
    //     });
    // });

    // // after(() => {});

    // it('retorna o código de status "201"', () => {
    //   expect(response).to.have.status(201);
    // });
//   });


//   Será validado que o campo "email" é único
    // describe('Será validado que o campo "email" é único', () => {
    // let response;
    // const DBServer = new MongoMemoryServer();

    // before(async () => {
    //   // const URLMock = await DBServer.getUri();
    //   // const OPTIONS = {
    //   //   useNewUrlParser: true,
    //   //   useUnifiedTopology: true,
    //   // };

    //   // const connectionMock = await MongoClient.connect(URLMock, OPTIONS);

    //   const connectionMock = await DBServer.getUri()
    //   .then(URLMock => MongoClient.connect(
    //       URLMock,
    //       { useNewUrlParser: true, useUnifiedTopology: true }
    //   ));

    //   sinon.stub(MongoClient, 'connect').resolves(connectionMock);

    // //   connectionMock.db('Cookmaster')
    // //     .collection('users')
    // //     .insertOne({});

    //   response = await chai.request(server)
    //     .post('/users')
    //     .send({
    //       name: 'string',
    //       email: 'email@email.com',
    //       password: 'string',
    //     });
    // });

    // // after(() => {});

    // it('retorna o código de status "409"', () => {
    //   expect(response).to.have.status(409);
    // });
//   });


});

describe('POST /login', () => {
  describe('Será validado que o campo "email" é obrigatório', () => {
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

// describe('DELETE /recipes/:id', () => {
//   describe('Quando a receita com o id passado não é encontrada', () => {
//     let response;
//     const ID = '9999999';

//     before(async() => {
//       response = await chai.request(server)
//         .delete(`/recipes/${ID}`)
//         .send({
//           name: 'name',
//           ingredients: 'ingredients',
//           preparation: 'preparation',
//         });
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
