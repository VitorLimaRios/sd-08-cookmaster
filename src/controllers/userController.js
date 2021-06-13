const users = require('../services/userService');
const {
  conflict,
  badRequest,
  created,
  unauthorized,
  success} = require('../services/responseType');
const { checkFields, checkLoginFields } = require('../middleware/checkFields');
const { checkEmail, checkLoginEmail } = require('../middleware/checkEmail');

const createUser = async (req, res) => {
  const { name, password, email }  = req.body;
  try {
    checkFields(name, password, email);
    checkEmail(email);
    const data = await users.createUser(name, password, email);
    res.status(created).json(data);
  } catch (error) {
    if(error.message.includes('already')) {
      return res.status(conflict).json({message: error.message});
    }
    res.status(badRequest).json({message: error.message});
  }
  
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    checkLoginFields(email, password);
    checkLoginEmail(email);
    const data = await users.userLogin(email, password);
    res.status(success).json({token: data});
  } catch (error) {
    res.status(unauthorized).json({message: error.message});
  }
};

module.exports = {
  createUser, userLogin
};