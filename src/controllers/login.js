const Services = require('../services/user');

const SUCCEEDED = 200;
const UNAUTHORIZED = 401;
const INTERNALSERVERERROR = 500;

module.exports = async (req, res) => {
  try {
    // console.log('CONTROLLER req.body', req.body);
    const { email, password } = req.body;
    const token = await Services.login( email, password);
    if (!token) throw Error;
    res.status(SUCCEEDED).json({ token });
  } catch (err) {
    if (err.message === 'All fields must be filled') {
      return res.status(UNAUTHORIZED).json({ message: err.message });
    }
    if (err.message === 'Incorrect username or password') {
      return res.status(UNAUTHORIZED).json({ message: err.message });
    }
    res.status(INTERNALSERVERERROR).json({ message: 'Erro interno', error: err.message });
  }
};
