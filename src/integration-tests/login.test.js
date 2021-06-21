const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const server = require('../api/app');

chai.use(chaiHttp);

describe('POST login', () => {
  describe('Quando não é passado usuário e senha', () => {
    let response;

    before(async () => {
      response = await chai.request(server)
        .post('')
        .send({});
    })

    it('teste', () => {
      console.log(response)
    })
  })
})