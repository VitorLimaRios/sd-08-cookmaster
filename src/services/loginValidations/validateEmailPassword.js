const UNAUTHORIZED_STATUS = 401;
const PASSWORD_MINIMUM_SIZE = 3;

const unfilledEntryes = {
  err: {
    status: UNAUTHORIZED_STATUS,
    message: 'All fields must be filled',
  },
};

const incorrectEntries = {
  err: {
    status: UNAUTHORIZED_STATUS,
    message: 'Incorrect username or password',
  },
};

const IsEmptyEntries = (email, password) => {
  if (!email || !password) return true;
  return false;
};

const isInvalidEmail = (email) => {
  const re = /.+@[A-z]+[.]com/;
  if (re.test(email)) return false;
  return true;
};

const isInvalidPassword = (password) => {
  if (password.length < PASSWORD_MINIMUM_SIZE) return true;
  return false;
};

const validateEmailPassword = (email, password) => {
  if (IsEmptyEntries(email, password)) return unfilledEntryes;
  if (isInvalidEmail(email)) return incorrectEntries;
  if (isInvalidPassword(password)) return incorrectEntries;
  return {};
};

module.exports = validateEmailPassword;
