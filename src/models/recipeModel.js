const connect = require('./connection');
const { ObjectId } = require('mongodb');

const getByEmail = async (email) => {
  return connect().then((db) =>
    db.collection('users').findOne({ email: email })
  );
};

const add = async (name, ingredients, preparation, userId) =>
  connect()
    .then((db) =>
      db.collection('recipes').insertOne({
        name,
        ingredients,
        preparation,
        userId,
      })
    )
    .then((result) => result.ops[0]);

const getAll = async () =>
  connect().then((db) => db.collection('recipes').find().toArray());

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connect().then((db) => db.collection('recipes').findOne(ObjectId(id)));
};

const update = async (recipeToUpdate) => {
  const { id, name, ingredients, preparation, userId } = recipeToUpdate;
  if (!ObjectId.isValid(id)) return null;
  connect().then((db) =>
    db
      .collection('recipes')
      .updateOne(
        { _id: ObjectId(id) },
        { $set: { name, ingredients, preparation, userId } }
      )
  );
  // return id;
  return { _id: id, name, ingredients, preparation, userId };
};

const exclude = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connect().then((db) =>
    db.collection('recipes').deleteOne({ _id: ObjectId(id) })
  );
};

const updateWithImage = async (recipeToUpdate, path) => {
  const { id, name, ingredients, preparation, userId } = recipeToUpdate;
  const image = path;
  if (!ObjectId.isValid(id)) return null;
  connect().then((db) =>
    db
      .collection('recipes')
      .updateOne(
        { _id: ObjectId(id) },
        { $set: { name, ingredients, preparation, userId, image } }
      )
  );
  return { _id: id, name, ingredients, preparation, userId, image };
};

module.exports = {
  getByEmail,
  add,
  getAll,
  getById,
  update,
  exclude,
  updateWithImage,
};
