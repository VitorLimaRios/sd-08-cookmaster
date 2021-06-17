const { General } = require('../models');
const { resources: { Recipes } } = require('../.env');

const getAll = async () => {
  const resources = await General.getAll(Recipes.tableOrCollec);
  return { result: resources };
};

const findById = async (id) => {
  const resource = await General.findById(Recipes.tableOrCollec, id);
  if (!resource) return { error: {
    code: 'not_found', message: `${Recipes.singular} not found` } };
  return { result: resource };
};

const insertOne = async (obj) => {
  const insertedId = await General.insertOne(Recipes.tableOrCollec, obj);
  if (!insertedId) return { error: {
    code: 'already_exists', message: `${Recipes.singular} already exists` } };
  return { result: { recipe: { _id: insertedId, ...obj } } };
};

const deleteById = async (id) => {
  const resp = await General.deleteById(Recipes.tableOrCollec, id);
  if (!resp) return { error: {
    code: 'not_found', message: 'not_found message delete' } };
  return { result: true };
};

const updateById = async (id, obj) => {
  const resp = await General.updateById(Recipes.tableOrCollec, id, obj);
  if (!resp) return { error: {
    code: 'not_found', message: `${Recipes.singular} not found` } };
  return await findById(id);
};

module.exports = {
  getAll,
  findById,
  insertOne,
  deleteById,
  updateById,
};
