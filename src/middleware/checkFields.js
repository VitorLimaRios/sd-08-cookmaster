const checkFields = (name, password, email) => {
  if (!name || !email || !password){
    throw new Error ('Invalid entries. Try again.');
  }
};

module.exports = {
  checkFields
};