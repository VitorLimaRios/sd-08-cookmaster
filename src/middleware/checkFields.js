const checkFields = (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password){
    throw new Error ('Invalid entries. Try again.');
  }
};

module.exports = {
  checkFields
};