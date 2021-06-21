const Services = require('../services/user');

const SUCCEEDED = 200;
const INTERNALSERVERERROR = 500;
const UNAUTHORIZED = 401;

module.exports = async (req, res) => {
  try {
    // console.log('CONTROLLER req.body', req.body);
    const { email, password } = req.body;
    const token = await Services.login( email, password);

    if (!token) throw Error;

    if (token.message === 'All fields must be filled') {
      return res.status(UNAUTHORIZED).json({ message: token.message });
    }

    if (token.message === 'Incorrect username or password') {
      return res.status(UNAUTHORIZED).json({ message: token.message });
    }

    res.status(SUCCEEDED).json({ token });
  } catch (err) {
    res
      .status(INTERNALSERVERERROR)
      .json({ message: 'Erro interno', error: err });
  }
};
