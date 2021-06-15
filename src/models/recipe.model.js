const { ObjectId } = require('mongodb');
const { connect } = require('./config/mongodb.config');

exports.add = async ({ name, ingredients, preparation, userId }) =>
  connect().then(async (db) => {
    const recipe = await db
      .collection('recipes')
      .insertOne({ name, ingredients, preparation, userId });
    return recipe.ops[0];
  });

exports.getAll = async () =>
  connect().then((db) => db.collection('recipes').find().toArray());

exports.getById = async (id) => {
  const recipe = connect().then((db) =>
    db.collection('recipes').findOne(ObjectId(id))
  );
  return recipe;
};

exports.getByName = (name) => connect().then(db => db.collection('recipes')
  .findOne({ name }));

exports.update = async ({id, name, ingredients, preparation, userId }) =>
  connect().then(async (db) => {
    const recipe = { name, ingredients, preparation, userId };
    await db
      .collection('recipes')
      .updateOne({ _id: ObjectId(id) }, { $set: { ...recipe } });
    return {
      _id: id,
      ...recipe,
    };
  });

exports.exclude = (id) => connect()
  .then((db) => {
    db.collection('recipes').deleteOne({ _id: ObjectId(id) });
  });
