const BAD_REQUEST_STATUS = 400;

const invalidEntriesResponse = {
  err: {
    status: BAD_REQUEST_STATUS,
    message: 'Invalid entries. Try again.',
  },
};

const IsEmptyEntries = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) return true;
  return false;
};


const validateEntries = (name, ingredients, preparation) => {
  if (IsEmptyEntries(name, ingredients, preparation)) return invalidEntriesResponse;
  return {};
};

module.exports = validateEntries;
