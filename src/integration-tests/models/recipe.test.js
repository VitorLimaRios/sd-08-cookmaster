const chai = require('chai');
const sinon = require('sinon');
const { MongoClient, ObjectId } = require('mongodb');

const model = require('../../models/recipe.model');
const { getConnection } = require('../helpers/connectionMock');
const { expect } = chai;
const { add, update, exclude, getById, getByName } = model;

let connectionMock;

describe('MODEL recipe.model.js', () => {
  const entry = { 
    "name" : "Receita do Jacquin", 
    "ingredients" : "Frango", 
    "preparation" : "10 minutos no forno" 
  };

  const entryUpdate = { 
    "name" : "Receita do beto", 
    "ingredients" : "miojo", 
    "preparation" : "10 minutos na agua fervente" 
  };

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('quando é cadastrado com sucesso', async () => {
    let newRecipe;

    before(async () => {
      newRecipe = await add(entry);
      await exclude(newRecipe._id);
    });

    it('Existe uma função add que recebe um object { name, ingredients, preparation }', async () => {
      expect(typeof add).equal('function');
    });

    it('tipo é um object', () => {
      expect(newRecipe).to.be.an('object');
    });

    it('Cadastro contem as chaves { _id, name, ingredients, preparation }', () => {
      expect(newRecipe).to.have.property('_id');
      expect(newRecipe.name).to.be.equal(entry.name);
      expect(newRecipe.ingredients).to.be.equal(entry.ingredients);
      expect(newRecipe.preparation).to.be.equal(entry.preparation);
    });

    it('Cadastro não contem as chaves null ou undefined { _id, name, ingredients, preparation }', () => {
      expect(newRecipe._id).to.not.empty;
      expect(newRecipe.name).to.not.empty;
      expect(newRecipe.ingredients).to.not.empty;
      expect(newRecipe.preparation).to.not.empty;
    });

    it('Cadastro contem apenas 4 (quatro) chaves', () => {
      expect(newRecipe).to.deep.equal({ _id: newRecipe._id, ...entry });
    });
  });

  describe('quando é atualizado com sucesso', async () => {
    let beforeRecipe;
    let afterRecipe;

    before(async () => {
      beforeRecipe = await add(entry);
      afterRecipe = await update(beforeRecipe._id, entryUpdate);
      await exclude(beforeRecipe._id)
    });

    it('Existe uma função update', async () => {
      expect(typeof update).equal('function');
    });

    it('atualizando as chaves { name, ingredients, preparation } estão diferentes e { id } igual', () => {
      expect(afterRecipe._id).to.be.equal(beforeRecipe._id);
      expect(afterRecipe.name).not.to.be.equal(beforeRecipe.name);
      expect(afterRecipe.ingredients).not.to.be.equal(beforeRecipe.ingredients);
      expect(afterRecipe.preparation).not.to.be.equal(beforeRecipe.preparation);
    });

    it('atualizando não contem as chaves null ou undefined { _id, name, ingredients, preparation }', () => {
      expect(afterRecipe._id).to.not.empty;
      expect(afterRecipe.name).to.not.empty;
      expect(afterRecipe.ingredients).to.not.empty;
      expect(afterRecipe.preparation).to.not.empty;
    });

  });

  describe('quando é deletado com sucesso', async () => {
    let beforeRecipe;
    let afterRecipe;
    let getByRecipe;

    before(async () => {
      beforeRecipe = await add(entry);
      afterRecipe = await exclude(beforeRecipe._id);
      getByRecipe = await getById(beforeRecipe._id);
      await exclude(beforeRecipe._id)
    });

    it('Existe uma função delete', async () => {
      expect(typeof exclude).equal('function');
    });

    it('deletado um usuario returna null ou undefined', () => {
      expect(afterRecipe).to.be.undefined;
    });

    it('deletado com sucesso', () => {
      expect(getByRecipe).to.be.null;
    });

  });

  describe('quando é feito a busca por nome com sucesso', async () => {
    let recipeCurrent;
    let recipeById;
    let recipeByName;

    before(async () => {
      recipeCurrent = await add(entry);
      recipeById = await getById(recipeCurrent._id);
      recipeByName = await getByName(recipeCurrent.name);

    });

    it('Existe uma função getByName', async () => {
      expect(typeof getByName).equal('function');
    });

    it('buscando um receita por nome é igual a trazer por id', () => {
      expect(recipeByName.name).to.be.equal(recipeById.name);
    });

    it('buscando um receita que não existe retorna null', async () => {
      await exclude(recipeCurrent._id);
      recipeByName = await getByName(recipeCurrent.name)
      expect(recipeByName).to.be.null;
    });

  });

});
