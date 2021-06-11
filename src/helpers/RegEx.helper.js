const REG_EX = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

module.exports = (email) => {
  return REG_EX.test(email);
};