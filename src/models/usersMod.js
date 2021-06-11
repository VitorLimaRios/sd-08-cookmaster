const connect = require('./connection');

const addUsers = () => 
  connect().then((db) => {
    const postUser = db.collection('users').insertOne({});
    return postUser.ops[0];
  });