const connection = require('./connection');

const createUser = async (name, email, password) => connection()
  .then(async (db) => {
    const newUser = await db
      .collection('users')
      .insertOne({
        name,
        email,
        password,
        role: 'user'
      });
    return newUser.ops[0];
  });

const findEmail = async (email) => {
  try {
    const emailRegistered = connection()
      .then((db) => db
        .collection('users')
        .findOne({ email }));
    return emailRegistered;
  } catch (err) {
    console.log('Email already registered');
  }
};

module.exports = {
  createUser,
  findEmail
};
