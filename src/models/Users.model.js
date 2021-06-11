const mongoose = require('../database/connection');

const UsersSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    unique: true,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  role: {
    type: String
  }
});

const User = mongoose.model('User', UsersSchema);

module.exports = User;
