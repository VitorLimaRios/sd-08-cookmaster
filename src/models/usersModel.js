const { ObjectId } = require('mongodb');
const connection = require('../connection/connection');

const NAME_COLLECTION = 'users';

const addUser = async (name, email, password, role) => {
  try {
    const db = await connection();

    return await db
      .collection(NAME_COLLECTION)
      .insertOne({ user: { name, email, password, role }});

  } catch (error) {
    console.log(error.message);
    return null;
  }
};

const findEmail = async (email) => {
  try {
    const db = await connection();
    return await db
      .collection(NAME_COLLECTION)
      .findOne({ 'user.email': email });

  } catch (error) {
    console.log(error.message);
    return null;
  }
};

module.exports = {
  addUser,
  findEmail,
};