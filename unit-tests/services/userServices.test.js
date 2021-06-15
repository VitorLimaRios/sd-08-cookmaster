const sinon = require('sinon');
const { ObjectId, MongoClient } = require('mongodb');
const { expect } = require('chai');

const UserModel = require('../../src/models/user');
const UserService = require('../../src/services/user');

describe('É possível cadastrar um usuário', () => {
  before(() => sinon.stub(MongoClient, 'connect').resolves());

  after(() => MongoClient.connect.restore());

  describe('Quando cadastrado com sucesso', () => {
    const payloadUserResult = {
      _id: ObjectId(),
      name: 'name',
      email: 'validemail@email.com',
      password: 'password',
      role: 'user'
    };

    const payloadUserInput = { 
      name: 'name',
      email: 'validemail@email.com',
      password: 'password'
    };

    before(() => {
      sinon.stub(UserModel, 'create').resolves(payloadUserResult);
      sinon.stub(UserModel, 'getByEmail').resolves(null);
    });

    after(() => {
      UserModel.create.restore();
      UserModel.getByEmail.restore();
    });

    it('deve usar o argumentos recebidos para criar o usuário', async () => {
      const result = await UserService.create(payloadUserInput);
      expect(UserModel.create.calledWith(payloadUserInput)).to.be.true;
    });

    it('retorna um objeto', async () => {
      const result = await UserService.create(payloadUserInput);
      expect(result).to.be.a('object');
    });

    it(`o objeto retornado deve ser referente ao novo cadastro e não deve
      expor a senha`, async () => {
      const result = await UserService.create(payloadUserInput);
      expect(result).to.have.all.keys(['_id', 'name', 'email', 'role']);
      const { _id, name, email, role } = result;
      expect(_id.toString()).to.equal(payloadUserResult._id.toString());
      expect(name).to.equal(payloadUserResult.name);
      expect(email).to.equal(payloadUserResult.email);
      expect(role).to.equal(payloadUserResult.role);
    });
  });

  describe('Quando os dados forem inválidos', () => {
    const invalidEntriesError = {
      err: {
        code: 'invalid_data',
        message: 'Invalid entries. Try again.'
      }
    };

    it('Retorna erro quando o name não for preenchido', async () => {
      const result = await UserService.create({
        password: 'password',
        email: 'email@email.com'
      });
      expect(result).to.deep.equal(invalidEntriesError);
    });

    it('Retorna erro quando o email não for preenchido', async () => {
      const result = await UserService.create({ name: 'name', password: 'password' });
      expect(result).to.deep.equal(invalidEntriesError);
    });

    it('Retorna erro quando o email for inválido', async () => {
      const result = await UserService.create({
        name: 'name',
        passoword: 'password',
        email: 'invalidEmail'
      });
      expect(result).to.deep.equal(invalidEntriesError);
    });

    it('Retorna erro quando a senha não for preenchida', async () => {
      const result = await UserService.create({ name: 'name', email: 'email@email.com' });
      expect(result).to.deep.equal(invalidEntriesError);
    });
  });

  describe('Quando o email já foi cadastrado', () => {
    const payloadUser = {
      _id: ObjectId(),
      name: 'string',
      email: 'email@email.com',
      password: 'string',
      role: 'user'
    };

    const invalidEmailError = {
      err: {
        code: 'conflict',
        message: 'Email already registered'
      }
    };

    before(() => sinon.stub(UserModel, 'getByEmail').resolves(payloadUser));

    after(() => UserModel.getByEmail.restore());

    it('Retorna um objeto de erro', async () => {
      const result = await UserService.create({
        name: 'name',
        password: 'senha',
        email: 'email@email.com'
      });

      expect(result).to.deep.equal(invalidEmailError);
    });
  });
});
