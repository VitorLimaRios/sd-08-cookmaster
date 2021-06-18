const User = require('../services/User');

const STATUS_SUBMIT = 201;
const STATUS_ERROR = 400;
const STATUS_ERR = 409;

class UserController {
  async store(req, res) {
    const { name, email, password } = req.body;
    try {
      await User.init();
      const { _id } = await User.create({ name, email, password, role: 'user' });
      res.status(STATUS_SUBMIT).json({ user:
        { name, email, role: 'user', _id }
      });
    } catch (error) {
      if(error.code) {
        return res.status(STATUS_ERR).json({ message: 'Email already registered' });    
      }
      res.status(STATUS_ERROR).json({ message: 'Invalid entries. Try again.' });
    }
  };
  async index(_req, res) {
    try {
      const data = await User.find({});
      res.json(data);
    } catch (error) {
      res.status(STATUS_ERROR).json({ message: 'Invalid entries. Try again.' });
    }
  }
}

module.exports = new UserController();
