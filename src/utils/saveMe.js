module.exports = (callback) => async (...args) => {
  try {
    return callback(...args);
  } catch (error) {
    console.log(error);
    return null;
  }
};
