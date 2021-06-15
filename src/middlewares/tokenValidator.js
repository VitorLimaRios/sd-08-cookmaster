const { UNAUTHORIZED } = require('../api/constants/statusCodes');
const { JWT_MALFORMED } = require('../api/constants/statusMessages');
const { validateToken } = require('../services/validations/jwt');

const tokenValidatorMiddl = (req, res, next) => {

  const token = req.headers.authorization;

  try {
    const validToken = validateToken(token);
    
    const { userId } = validToken.data;
    req.userId = userId;

  } catch (_error) {
    return res.status(UNAUTHORIZED).json({message: JWT_MALFORMED});
  }
  next();
};

module.exports = tokenValidatorMiddl;
