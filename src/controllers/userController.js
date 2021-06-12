const users = require('../services/userService');
const {conflict, badRequest, created} = require('../services/responseType');
const { checkFields } = require('../middleware/checkFields');
const { checkEmail } = require('../middleware/checkEmail');

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

module.exports = {
  createUser
};