const error = require('./error');
const authentication = require('./authentication');
const verifyObjectId = require('./verifyObjectId');
const requiredToken = require('./requiredToken');

module.exports = {
  error,
  authentication,
  verifyObjectId,
  requiredToken,
};