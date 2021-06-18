const mongoose = require('mongoose');
require('../models/User');

const User = mongoose.model('user');

module.exports = User;
