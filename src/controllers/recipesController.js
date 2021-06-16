const express = require('express');
const multer = require('multer');
const { resolve } = require('path');

const { recipesServices } = require('../services');
const {
  recipesCreate,
  getRecipes,
  recipesById,
  updateRecipesById,
  deleteRecipesById,
  uploadImage,
} = recipesServices;

const SUCCESS = 200;
const CREATED = 201;
const NO_CONTENT = 204;
const BAD = 400;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;

const registerRecipes = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { authorization } = req.headers;
    
    const result = await recipesCreate(name, ingredients, preparation, authorization);

    if (result.message === 'Invalid entries. Try again.')
      return res.status(BAD).json(result);

    if (result.message === 'jwt malformed')
      return res.status(UNAUTHORIZED).json(result);

    return res.status(CREATED).json(result);
  } catch (error) {

    return res.status(UNAUTHORIZED).json({ message: error.message });
  }
};

const getAllRecipes = async (_req, res) => {
  try {

    const result = await getRecipes();

    return res.status(SUCCESS).json(result);
  } catch (error) {
    return res.status(BAD).json(error);
  }
};

const getRecipesById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await recipesById(id);

    if (result.message === 'recipe not found')
      return res.status(NOT_FOUND).json(result);

    return res.status(SUCCESS).json(result);
  } catch (error) {
    return res.status(BAD).json(error);
  }
};

const updateRecipes = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    const { authorization } = req.headers;

    const result = await updateRecipesById({
      id, name, ingredients, preparation }, authorization);

    if (result.message === 'missing auth token')
      return res.status(UNAUTHORIZED).json(result);

    if (result.message === 'recipe not found')
      return res.status(NOT_FOUND).json(result);

    return res.status(SUCCESS).json(result);
  } catch (error) {
    return res.status(UNAUTHORIZED).json({ message: 'jwt malformed' });
  }
};

const deleteRecipes = async (req, res) => {
  try {
    const { id } = req.params;
    const { authorization } = req.headers;

    const result = await deleteRecipesById(id, authorization);

    if (result.message === 'missing auth token')
      return res.status(UNAUTHORIZED).json(result);

    if (result.message === 'recipe not found')
      return res.status(NOT_FOUND).json(result);

    return res.status(SUCCESS).json(result);
  } catch (error) {
    return res.status(NO_CONTENT).json({ message: 'jwt malformed' });
  }
};

const uploadRecipeImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { authorization } = req.headers;
    const { filename } = req.file;
    
    const path = `localhost:3000/src/uploads/${ filename }`;
    const result = await uploadImage(id, path, authorization);

    if (result.message === 'missing auth token')
      return res.status(UNAUTHORIZED).json(result);

    if (result.message === 'recipe not found')
      return res.status(NOT_FOUND).json(result);

    return res.status(SUCCESS).json(result);
  } catch (error) {
    console.log(error.message);
    res.status(NOT_FOUND).json({ message: error.message });
  }
};

const showImage = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await recipesById(id);
    return res.status(SUCCESS).send(result.imageURL);
  } catch (error) {
    console.log('aqui');
    console.log(error.message);
    res.status(NOT_FOUND).json({ message: error.message });
  }
};


module.exports = {
  registerRecipes,
  getAllRecipes,
  getRecipesById,
  updateRecipes,
  deleteRecipes,
  uploadRecipeImage,
  showImage,
};