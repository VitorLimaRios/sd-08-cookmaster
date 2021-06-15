const status_400 = 400;
const status_409 = 409;
const status_401 = 401;
const invalidMessage = {
  'message': 'Invalid entries. Try again.'
};
const loginMessage_1 = {
  'message': 'All fields must be filled',
};
const loginMessage_2 = {
  'message': 'Incorret username or password',
}; 

const isValidName = (req, res, next) => {
  const name = req.body.name;
  if (!name) return res.status(status_400).json(invalidMessage);
  next();
};

const isValidEmail = (req, res, next) => {
  const email = req.body.email;  
  const regexEmail = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
  const validEmail = regexEmail.test(email);
  if (!email || !validEmail) return res.status(status_400).json(invalidMessage); 
  next();
};

const isValidPassword = async (req, res, next) => {
  const password = req.body.password;
  if (!password) return res.status(status_400).json(invalidMessage);  
  next();
};

const isValidLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(status_401).json(loginMessage_1);
  next();
};

module.exports = {
  isValidName,
  isValidEmail,
  isValidPassword,   
  isValidLogin,
};
