const bcrypt = require('bcryptjs');
const { General } = require('../models');
const { resources: { Users } } = require('../.env');

const SALT_SIZE = 10;

const getAll = async () => {
  const resources = await General.getAll(Users.tableOrCollec);
  return { result: resources };
};

const findById = async (id) => {
  const resource = await General.findById(Users.tableOrCollec, id);
  if (!resource) return { error: {
    code: 'not_found', message: `${Users.singular} not found` } };
  return { result: resource };
};

const insertOne = async (obj) => {
  const existingUsers = await General.findWith(Users.tableOrCollec, { email: obj.email });
  if (existingUsers[0]) return { error: {
    code: 'already_exists', message: 'Email already registered' } };
  await bcrypt.hash(obj.password, SALT_SIZE).then((hash) => {obj.password = hash;});
  if (!obj.role) obj.role = 'user';
  const insertedId = await General.insertOne(Users.tableOrCollec, obj);
  const { password: _pwd, ...restObj } = obj;
  return { result: { user: { _id: insertedId, ...restObj } } };
};

const deleteById = async (id) => {
  const resp = await General.deleteById(Users.tableOrCollec, id);
  if (!resp) return { error: {
    code: 'not_found', message: 'not_found message delete' } };
  return { result: {
    message: `The ${Users.singular} with id = ${id} was deleted successfully` } };
};

const updateById = async (id, obj) => {
  const resp = await General.updateById(Users.tableOrCollec, id, obj);
  if (!resp) return { error: {
    code: 'not_found', message: `${Users.singular} not found` } };
  return await findById(id);
};

module.exports = {
  getAll,
  findById,
  insertOne,
  deleteById,
  updateById,
};
