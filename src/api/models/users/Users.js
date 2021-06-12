const jwt = require('jsonwebtoken');
const { COLLECTION_USERS, KEY, JWT_CONFIG } = require('../../utils/consts');
const connectionDB = require('../../connections/ConnectionDB');

const create = async (name, email, password) => {
  return connectionDB()
    .then((db) => db.collection(COLLECTION_USERS)
      .insertOne({ name, email, password, role: 'user' }))
    .then((result => result.ops[0]));
};

const getByEmail = async (email) => {
  return connectionDB()
    .then((db) => db.collection(COLLECTION_USERS)
      .findOne({ email: email }))
    .then((result => result));
};

const login = async (requestEmail) => {
  const search = await getByEmail(requestEmail);
  const { _id, email, role } = search;
  const user = { _id, email, role };
  const token = jwt.sign({ data: user }, KEY, JWT_CONFIG);
  return token;
};

module.exports = {
  create,
  getByEmail,
  login,
};
