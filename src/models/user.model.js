const { ObjectId } = require('mongodb');
const { connect } = require('./config/mongodb.config');

exports.add = async ({ name, email, password, role }) =>
  connect().then(async (db) => {
    const user = await db
      .collection('users')
      .insertOne({ name, email, password, role });
    return user.ops[0];
  });

exports.getAll = async () =>
  connect().then((db) => db.collection('users').find().toArray());

exports.getById = async (id) => {
  await ObjectId.isValid(id);
  const user = connect().then((db) =>
    db.collection('users').findOne(ObjectId(id))
  );
  return user;
};

exports.update = async (id, { name, email, password, role }) =>
  connect().then(async (db) => {
    const user = { name, email, password, role };
    await db
      .collection('users')
      .updateOne({ _id: ObjectId(id) }, { $set: { ...user } });
    return {
      _id: id,
      ...user,
    };
  });

exports.exclude = async (id) =>
  connect().then(async (db) =>
    db.collection('users').deleteOne({ _id: ObjectId(id) })
  );
