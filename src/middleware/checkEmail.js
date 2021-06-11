const checkEmail = (req, res) => {
  const { email } = req.body;
  const re = /.+@[A-z]+[.]com/;
  if(!re.test(email)) {
    throw new Error ('Invalid entries. Try again.');
  }
};

module.exports = {
  checkEmail
};