const isEmailValid = (email) => {
  return /.*@.*\.com.*/.test(email);
};

const BAD_REQUEST = 400;

const userValidation = (req, res, next) => {
  const { name, email, password } = req.body;
  if(!name || !isEmailValid(email) || !password) {
    return res.status(BAD_REQUEST).send({ message: 'Invalid entries. Try again.' });
  }
  next();
};

module.exports = userValidation;