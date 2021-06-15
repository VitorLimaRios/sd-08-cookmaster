const { General } = require('../models');
const { resources: { Users } } = require('../.env');

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
  const insertedId = await General.insertOne(Users.tableOrCollec, obj);
  if (!insertedId) return { error: {
    code: 'already_exists', message: `${Users.singular} already exists` } };
  return { result: { _id: insertedId, ...obj } };
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
