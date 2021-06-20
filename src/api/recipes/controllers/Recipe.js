const Recipe = require('../services/Recipe');
const jwt = require('jsonwebtoken');

const secret = '123456789';

const STATUS_SUBMIT = 201;
const STATUS_ERROR = 400;

class RecipeController {
  async store(req, res) {
    try {
      const { name, ingredients, preparation } = req.body;
      const token = req.headers['authorization'];

      const decoded = jwt.verify(token, secret);

      const { _id } = await Recipe.create({ name, ingredients, preparation });

      return res.status(STATUS_SUBMIT).json({ recipe: {
        name, ingredients, preparation, userId: decoded.data['_id'], _id
      } });    
    } catch (err) {
      return res.status(STATUS_ERROR).json({ message: 'Invalid entries. Try again.' });
    }
  }

  async index(_req, res) {
    try {
      const data = await Recipe.find({});
      res.json(data);
    } catch (error) {
      res.status(STATUS_ERROR).json({ message: 'Invalid entries. Try again.' });
    }
  }
}

module.exports = new RecipeController();
