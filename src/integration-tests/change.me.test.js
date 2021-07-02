const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { expect } = chai;
const server = require('../api/app');

describe('POST /users', () => {
  describe('Quando não é passado o campo "name" do usuário', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
        .post('/users')
        .send({
          email: 'email@email.com',
          password: 'password',
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
});
