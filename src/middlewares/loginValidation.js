const validBody = (email, password) => {
  if (!email || !password) return false;
  return true;
};


const bodyValidation = (email, password) => {
  const bodyValid = validBody(email, password);

  if (!bodyValid) return { message: 'All fields must be filled' };

  return bodyValid;
};

module.exports = {
  bodyValidation,
};
