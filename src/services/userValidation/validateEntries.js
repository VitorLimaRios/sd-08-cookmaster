const BAD_REQUEST_STATUS = 400;

const invalidEntriesResponse = {
  err: {
    status: BAD_REQUEST_STATUS,
    message: 'Invalid entries. Try again.',
  },
};

const IsEmptyEntries = (name, email, password) => {
  if (!name || !email || !password) return true;
  return false;
};

const isInvalidEmail = (email) => {
  const re = /.+@[A-z]+[.]com/;
  if(re.test(email)) return false;
  return true;
};

const validateEntries = (name, email, password) => {
  if (IsEmptyEntries(name, email, password)) return invalidEntriesResponse;
  if (isInvalidEmail(email)) return invalidEntriesResponse;
  return {};
};

module.exports = validateEntries;
