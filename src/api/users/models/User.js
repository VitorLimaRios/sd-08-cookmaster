const mongoose = require('mongoose');

const validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
    validate: validateEmail,
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: false
  }
},
{
  timestamps: true
}
);

module.exports = mongoose.model('user', UserSchema);
