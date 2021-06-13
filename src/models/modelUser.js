const connection = require('./connection');
const ModelDefault = require('./modelDefault');

let nameCollection = Symbol();

class User extends ModelDefault{
  constructor() {
    super();
    this[nameCollection] = 'users';

    this.createUser = this.createUser.bind(this);
  }

  
  async createUser(newUser) {
    try {
      return this.create(this[nameCollection], newUser);
    }catch (err) {
      console.error(' --> User create: ', err.message);
      return err;
    }
  }
  
  async dropUserCollection() {
    try {
      return this.dropCollection(this[nameCollection]);
    } catch (err) {
      console.error(' --> User dropUserCollection: ', err.message);
      return err;
    }
  }
}

module.exports = User;
