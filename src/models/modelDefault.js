const connection = require('./connection');
const { ObjectId } = require('mongodb');

class modelDefault {
  constructor() {
    this._conn = connection;

    this.create = this.create.bind(this);
    this.dropDataBase = this.dropDataBase.bind(this);
    this.dropCollection = this.dropCollection.bind(this);
  }

  async dropDataBase() {
    try {
      const result = await this._conn().then((db) => db.dropDatabase());
      return result;
    } catch (err) {
      console.error(' --> Default dropDataBase: ', err.message);
      return err;
    }
  }

  async dropCollection(nameCollection) {
    try{
      const result = await this._conn()
        .then((db) => db.dropCollection(nameCollection));
      return result;
    } catch (err) {
      console.error(' --> Default dropCollection: ', err.message);
      return err;
    }
  }

  async create(nameCollection, newDocument) {
    try {
      const getCollection = await this._conn()
        .then((db) => db.collection(nameCollection));
      const getResult = await getCollection.insertOne(newDocument);
      return getResult.ops[0];
    }catch(err) {
      console.error(' --> Default create: ', err.message);
      return err;
    }
  }

  async createMany(nameCollection, manyDocument) {
    try {
      const getCollection = await this._conn()
        .then((db) => db.collection(nameCollection));
      const getResult = await getCollection.insertMany(manyDocument);
      return getResult.ops;
    }catch(err) {
      console.error(' --> Default createMany: ', err.message);
      return err;
    }
  }

  async getByKey(nameCollection, getDocument) {
    try {
      const getCollection = await this._conn()
        .then((db) => db.collection(nameCollection));
      const getResult = await getCollection.findOne(getDocument);
      return getResult;
    } catch(err) {
      console.error(' --> Default getByKey: ', err.message);
      return err;
    }
  }

  async getAll(nameCollection) {
    try {
      const getCollection = await this._conn()
        .then((db) => db.collection(nameCollection));
      const allRecipes = await getCollection.find({});
      return allRecipes.toArray();
    }catch (err) {
      console.log(' --> Default getAll: ', err.message);
      return err;
    }
  }

  async deleteOneDocument(nameCollection, document) {
    try {
      const getCollection = await this._conn()
        .then((db) => db.collection(nameCollection));
      const resultDelete = await getCollection.deleteOne({ ...document });
      return resultDelete;
    } catch (err) {
      console.log(' --> Default delete one: ', err.message);
      return err;
    }
  }
}

module.exports = modelDefault;
