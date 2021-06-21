const connect = require('./connection');

const getByEmail = async (email) => {
  return connect().then((db) =>
    db.collection('users').findOne({ email: email })
  );
};

const add = async (name, email, password) =>
  connect()
    .then((db) =>
      db.collection('users').insertOne({
        name: name,
        email: email,
        password: password,
        role: 'user',
      })
    )
    .then((result) => result.ops[0]);

module.exports = {
  getByEmail,
  add,
};
