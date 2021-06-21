const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  ingredients: {
    type: String,
    required: true,
  },
  preparation: {
    type: String,
    required: true
  },
  image: {
	  type: Buffer,
  },
},
{
  timestamps: true
}
);

module.exports = mongoose.model('recipe', RecipeSchema);
