const User = require('../services/User');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../../auth/config');

const STATUS_OK = 200;
const STATUS_SUBMIT = 201;
const STATUS_ERROR = 400;
const STATUS_ERRO = 401;
const STATUS_ERR = 409;

const secret = '123456789';

class UserController {
  async login (req, res) {
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        return res.status(STATUS_ERRO).json({
          message: 'All fields must be filled'
        });
      }

      const user = await User.find({ email });

      if (!user[0] || user[0].password !== password) {
        return res.status(STATUS_ERRO).json({
          message: 'Incorrect username or password'
        });
      }

      const token = jwt.sign({ data: user[0] }, secret, jwtConfig);

      return res.status(STATUS_OK).json({ token });
    } catch (err) {
      return res.status(STATUS_ERR).json({ erro: err.message });
    }
  };

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
