const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const modelSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
});

const modelName = 'User';

let User = null;

if (mongoose.connection && mongoose.connection.models[modelName]) {
  User = mongoose.connection.models[modelName];
} else {
  User = mongoose.model(modelName, modelSchema);
}
module.exports = {
  findUserByEmail: async (email) => {
    return await User.findOne({
      email,
    });
  },
  save: async (entries) => {
    const { name, email, password } = entries;
    const newUser = new User({
      name,
      email,
      password,
      role: 'user',
    });
    return await newUser.save();
  },  
};
