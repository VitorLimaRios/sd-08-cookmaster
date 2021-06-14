const usersModel = require('../models/usersModel');
const { code, message } = require('../helpers/messages');


const validateForm = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  try {
    if(!name || !ingredients || !preparation) {
      throw new Error(message.INVALID_ENTRIES);
    };
    next();
  } catch (error) {
    return res.status(code.BAD_REQUEST).json({ message: error.message });
  }
};

module.exports = validateForm;
