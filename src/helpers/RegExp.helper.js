const REG_EXP = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

module.exports = (email) => {
  return REG_EXP.test(email);
};