const sinon = require('sinon');
const { expect } = require('chai');
const {
  payloadUserResult, payloadUserInput, invalidEntriesError,
  invalidEmailError, invalidEntryErrorMessage, invalidEmailErrorMessage
} = require('./payloadMocks');

const UserService = require('../../services/user');
const UserController = require('../../controllers/user');

const HTTP_STATUS_CODES = {
  CREATED: 201,
  BAD_REQUEST: 400,
  CONFLICT: 409
};

const TEST_TITLES = {
  ERROR_MIDDLEWARE: 'chama next com o objeto de error',
};

describe('É possível criar um usuário', () => {
  let response, request, next;

  beforeEach(() => {
    response = {};
    request = {};
    request.body = {};
    response.json = sinon.stub().returns();
    response.status = sinon.stub().returns(response);
    next = sinon.stub().returns();
  });

  describe('Quando o usuário for criado com sucesso', () => {
    beforeEach(() => {
      response.body = payloadUserInput;
    });
    
    before(() => sinon.stub(UserService, 'create').resolves(payloadUserResult));

    after(() => UserService.create.restore());

    it('retorna status 201', async () => {
      await UserController.create(request, response, next);
      expect(response.status.calledWith(HTTP_STATUS_CODES.CREATED)).to.be.true;
    });

    it('chama response.json com um objeto referente ao usuário', async () => {
      await UserController.create(request, response, next);
      expect(response.json.args[0][0]).to.deep.equal({ user: payloadUserResult });
    });
  });

  describe('Quando os dados estiverem inválidos', () => {
    before(() => sinon.stub(UserService, 'create').resolves(invalidEntriesError));

    after(() => UserService.create.restore());

    describe('Quando o name não for preenchido', async () => {
      beforeEach(() => {
        request.body = {
          password: 'password',
          email: 'email@email.com'
        };
      });
    
      it(TEST_TITLES.ERROR_MIDDLEWARE, async () => {
        await UserController.create(request, response, next);
        expect(next.calledWith(invalidEntriesError)).to.be.true;
      });
    });

    describe('Quando o email não for preenchido', async () => {
      beforeEach(() => {
        request.body = {
          name: 'name',
          password: 'password'
        };
      });

      before(async () => await UserController.create(request, response, next));
    
      it(TEST_TITLES.ERROR_MIDDLEWARE, async () => {
        await UserController.create(request, response, next);
        expect(next.calledWith(invalidEntriesError)).to.be.true;
      });
    });

    describe('Quando o email for inválido', async () => {
      beforeEach(() => {
        request.body = {
          name: 'name',
          passoword: 'password',
          email: 'invalidEmail'
        };
      });

      before(async () => await UserController.create(request, response, next));
    
      it(TEST_TITLES.ERROR_MIDDLEWARE, async () => {
        await UserController.create(request, response, next);
        expect(next.calledWith(invalidEntriesError)).to.be.true;
      });
    });

    describe('Quando a senha não for preenchida', async () => {
      beforeEach(() => {
        request.body = {
          name: 'name',
          email: 'email@email.com'
        };
      });

      before(async () => await UserController.create(request, response, next));
    
      it(TEST_TITLES.ERROR_MIDDLEWARE, async () => {
        await UserController.create(request, response, next);
        expect(next.calledWith(invalidEntriesError)).to.be.true;
      });
    });
  });

  describe('Quando o email já foi cadastrado', () => {
    before(() => sinon.stub(UserService, 'create').resolves(invalidEmailError));

    after(() => UserService.create.restore());

    it(TEST_TITLES.ERROR_MIDDLEWARE, async () => {
      await UserController.create(request, response, next);
      expect(next.calledWith(invalidEmailError)).to.be.true;
    });
  });
});
