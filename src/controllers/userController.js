const users = require('../services/userService');
const {conflict, notFound, success, badRequest} = require('../services/responseType');
const { checkFields } = require('../middleware/checkFields');
const { checkEmail } = require('../middleware/checkEmail');

const createUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    checkFields(req);
    checkEmail(req);
    const data = await users.createUser(name, password, email);
    res.status(success).json(data);
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