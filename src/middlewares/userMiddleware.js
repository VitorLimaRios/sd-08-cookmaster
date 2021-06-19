function validateEmail(email) {
  const urlRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  const re = urlRegex;

  return re.test(email);
}

module.exports = { validateEmail};
