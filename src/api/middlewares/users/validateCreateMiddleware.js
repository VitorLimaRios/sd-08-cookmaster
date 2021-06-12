const User = require('../../services/users/Users');
const { ERRORS, EMAIL_REGEX } = require('../../utils/consts');

module.exports = async (req, res, next) => {
  const { name, email, password } = req.body;
  const { eInput, eDuplicate } = ERRORS;
  const search = await User.getByEmail(email);

  switch(true) {
  case !name || !email || !password || !EMAIL_REGEX.test(email):
    return res.status(eInput.status).json({ message: eInput.message });
  case search !== null:
    return res.status(eDuplicate.status).json({message: eDuplicate.message});
  default:
    next();
  }
};