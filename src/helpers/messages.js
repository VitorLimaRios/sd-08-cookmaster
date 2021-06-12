const code = {
  STATUS_OK: 200,
  STATUS_CREATED: 201,
  STATUS_CONFLICT: 409,
  STATUS_BAD_REQUEST: 400,
};

const message = {
  INVALID_ENTRIES: 'Invalid entries. Try again.',
  EMAIL_ALREADY_REGISTERED: 'Email already registered',
};

module.exports = { code, message };