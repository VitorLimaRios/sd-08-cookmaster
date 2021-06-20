const Services = require('../services/user');

const CREATED = 201;
const INTERNALSERVERERROR = 500;
const BADREQUEST = 400;
const CONFLICT = 409;

module.exports = async (req, res) => {
  try {
    // console.log('CONTROLLER req.body', req.body);
    const { name, email, password } = req.body;
    const user = await Services.createUser(name, email, password);
    if (!user) throw Error;
    if (user.message === 'Invalid entries. Try again.') {
      return res.status(BADREQUEST).json({ message: user.message });
    }
    if (user.message === 'Email already registered') {
      return res.status(CONFLICT).json({ message: user.message });
    }
    delete user.password;
    res.status(CREATED).json({ user });
  } catch (err) {
    res
      .status(INTERNALSERVERERROR)
      .json({ message: 'Erro interno', error: err });
  }
};