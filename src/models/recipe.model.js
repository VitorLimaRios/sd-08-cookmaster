const { ObjectId } = require('mongodb');
const connect = require('./config/mongodb.config');

exports.add = async ({ name, ingredients, preparation }) =>
  connect().then(async (db) => {
    const recipe = await db
      .collection('recipes')
      .insertOne({ name, ingredients, preparation });
    return recipe.ops[0];
  });

exports.getAll = async () =>
  connect().then((db) => db.collection('recipes').find().toArray());

exports.getById = async (id) => {
  await ObjectId.isValid(id);
  const recipe = connect().then((db) =>
    db.collection('recipes').findOne(ObjectId(id))
  );
  return recipe;
};

exports.update = async (id, { name, ingredients, preparation }) =>
  connect().then(async (db) => {
    const recipe = { name, ingredients, preparation };
    await db
      .collection('recipes')
      .updateOne({ _id: ObjectId(id) }, { $set: { ...recipe } });
    return {
      _id: id,
      ...user,
    };
  });

exports.exclude = async (id) =>
  connect().then(async (db) =>
    db.collection('recipes').deleteOne({ _id: ObjectId(id) })
  );
