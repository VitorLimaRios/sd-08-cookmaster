const jwt = require('jsonwebtoken');
const { KEY, ERRORS } = require('../../utils/consts');

module.exports = (req, res, next) => {
  const { eToken, eNotToken } = ERRORS;
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(eNotToken.status).json({ message: eNotToken.message });
  }

  try {
    jwt.verify(authorization, KEY);
    next();
  } catch (err) {
    return res.status(eToken.status).json({ message: eToken.message });
  }
};
