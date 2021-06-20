const mongoose = require('mongoose');
require('../models/Recipe');

const Recipe = mongoose.model('recipe');

module.exports = Recipe;
