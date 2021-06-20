const { ObjectId } = require('mongodb');
const connection = require('../models/connection');
const Service = require('../services/RecipeService');

const httpCreateSuccess = 201;
const httpSuccess = 200;
const error400 = 400;
const deleteSuccess = 204;

const create = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const userId = req.user._id;
    const result = await Service.create({name, ingredients, preparation, userId});

    res.status(httpCreateSuccess).json({recipe: result});
  } catch (error) {
    const data = JSON.parse(error.message);
    res.status(data.status).send({message: data.message});   
  }
};


const getAll = async (req, res) => {
  const result = await Service.getAllRecipes();
  res.status(httpSuccess).json(result);
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Service.getById(id);
    res.status(httpSuccess).json(result);
  } catch (error) {
    const data = JSON.parse(error.message);
    res.status(data.status).send({message: data.message});  
  }
};

const updateById = async (req, res) => {
  try {
    if (req.error) {
      return res.status(error400).json({message: req.error});
    }
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;

    await Service.updateById(id, name, ingredients, preparation);

    const newResult = await Service.getById(id);
    res.status(httpSuccess).json(newResult);
  } catch (error) {
    const data = JSON.parse(error.message);
    res.status(data.status).send({message: data.message});
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.error) {
      return res.status(error400).json({message: req.error});
    }

    await Service.deleteById(id);

    res.status(deleteSuccess).json();
  } catch (error) {
    console.log(error);
  }
};

const updateURL = async (req, res) => {
  console.log(req.file);
  const urlImage = 'localhost:3000/src/uploads/' + req.file.filename;
  try {
    const { id } = req.params;

    await Service.updateURL(id, urlImage);
    const result = await Service.getById(id);
    res.status(httpSuccess).json(result);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
  updateURL
};
