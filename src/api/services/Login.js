const { General } = require('../models');
const { resources: { Login } } = require('../.env');

const getAll = async () => {
  const resources = await General.getAll(Login.tableOrCollec);
  return { result: resources };
};

const findById = async (id) => {
  const resource = await General.findById(Login.tableOrCollec, id);
  if (!resource) return { error: {
    code: 'not_found', message: `${Login.singular} not found` } };
  return { result: resource };
};

const insertOne = async (obj) => {
  const insertedId = await General.insertOne(Login.tableOrCollec, obj);
  if (!insertedId) return { error: {
    code: 'already_exists', message: `${Login.singular} already exists` } };
  return { result: { _id: insertedId, ...obj } };
};

const deleteById = async (id) => {
  const resp = await General.deleteById(Login.tableOrCollec, id);
  if (!resp) return { error: {
    code: 'not_found', message: 'not_found message delete' } };
  return { result: {
    message: `The ${Login.singular} with id = ${id} was deleted successfully` } };
};

const updateById = async (id, obj) => {
  const resp = await General.updateById(Login.tableOrCollec, id, obj);
  if (!resp) return { error: {
    code: 'not_found', message: `${Login.singular} not found` } };
  return await findById(id);
};

module.exports = {
  getAll,
  findById,
  insertOne,
  deleteById,
  updateById,
};
