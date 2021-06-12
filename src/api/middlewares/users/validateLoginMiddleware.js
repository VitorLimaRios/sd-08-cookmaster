const { getByEmail } = require('../../services/users/Users');
const { ERRORS } = require('../../utils/consts');

module.exports = async (req, res, next) => {
  const { email, password } = req.body;
  const { eLoginEmpty, eLoginInvalid } = ERRORS;

  if (!email || !password) {
    return res.status(eLoginEmpty.status).json({ message: eLoginEmpty.message });
  }

  const search = await getByEmail(email);
  if (search === null || password !== search.password) {
    return res.status(eLoginInvalid.status).json({ message: eLoginInvalid.message });
  }

  next();
};
