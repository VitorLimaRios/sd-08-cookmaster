const Recipe = require('../services/Recipe');
const jwt = require('jsonwebtoken');

const secret = '123456789';

const STATUS_OK = 200;
const STATUS_SUBMIT = 201;
const STATUS_ERROR = 400;
const STATUS_ERR = 404;

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

  async index(req, res) {
    const { id } = req.params;
    
    if(id) {
      try {
        const data = await Recipe.findById({ _id: id });
        return res.status(STATUS_OK).json(data);
      } catch (error) {
        return res.status(STATUS_ERR).json({ message: 'recipe not found' });
      }
    }

    try {
      const data = await Recipe.find({});
      res.status(STATUS_OK).json(data);
    } catch (error) {
      res.status(STATUS_ERROR).json({ message: 'Invalid entries. Try again.' });
    }
  }
}

module.exports = new RecipeController();
