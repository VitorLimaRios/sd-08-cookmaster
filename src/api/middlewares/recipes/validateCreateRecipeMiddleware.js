const { ERRORS } = require('../../utils/consts');

module.exports = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const { eInput } = ERRORS;
  switch(true) {
  case !name || !ingredients || !preparation:
    return res.status(eInput.status).json({ message: eInput.message });
  default:
    next();
  }
};
