const { ObjectId } = require('mongodb');
const { connect } = require('./config/mongodb.config');

exports.add = async ({ name, ingredients, preparation, userId, image }) =>
  connect().then(async (db) => {
    const recipe = await db
      .collection('recipes')
      .insertOne({ name, ingredients, preparation, userId, image });
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

exports.update = async (_id, entry) =>
  connect().then(async (db) => {
    await db
      .collection('recipes')
      .updateOne({ _id: ObjectId(_id) }, { $set: { ...entry } });
    return {
      _id,
      ...entry,
    };
  });

exports.exclude = (id) => connect()
  .then((db) => {
    db.collection('recipes').deleteOne({ _id: ObjectId(id) });
  });
