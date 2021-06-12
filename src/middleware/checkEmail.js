const checkEmail = (email) => {
  const re = /.+@[A-z]+[.]com/;
  if(!re.test(email)) {
    throw new Error ('Invalid entries. Try again.');
  }
};

module.exports = {
  checkEmail
};