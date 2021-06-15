const mongoConnection = require('./mongoConnection');

const create = async (newUser) => {
  try
  {
    const usersCollection = await mongoConnection()
      .then((db) => db.collection('users'));

    const createdUser = await usersCollection
      .insertOne(newUser);

    return createdUser.ops[0];
  }
  catch (error)
  {
    const { code, message } = error;
    console.log(code, message);
  }
};

const findByEmail = async (email) => {
  const usersCollection = await mongoConnection()
    .then((db) => db.collection('users'));
  
  const user = await usersCollection.findOne({ email });

  return user;
};

const createAdmin = async (newUserAdmin) => {
  try
  {
    const usersCollection = await mongoConnection()
      .then((db) => db.collection('users'));

    const createdAdmin = await usersCollection
      .insertOne(newUserAdmin);

    return createdAdmin.ops[0];
  }
  catch (error)
  {
    const { code, message } = error;
    console.log(code, message);
  }
};

module.exports = {
  create,
  findByEmail,
  createAdmin,
};
