const { findEmail} = require('../models/Users');
const Bad_Request = '400';
const Conflict = '409';

const checkUserData = (validateData) => {
  return (req, res, next) => {
    const { error } = validateData.userSchemas.validate(req.body);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      let message = details.map((i) => i.message).join(',');
      if (message.match(/email/)) {
        message = 'Invalid entries. Try again.';
      }
      res.status(Bad_Request).json({ message: message });
    }
  };
};

const checkUniqueEmail = async (req, res, next) => {
  const { email } = req.body;
  let check = await findEmail(email);
  if (check) return res.status(Conflict).json({ message: 'Email already registered' });
  next();
};

module.exports = { checkUserData, checkUniqueEmail };
