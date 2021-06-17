const { UNAUTHORIZED } = require('../api/constants/statusCodes');
const { JWT_MALFORMED, MISSING_TOKEN } = require('../api/constants/statusMessages');
const { validateToken } = require('../services/validations/jwt');

const tokenValidatorMiddl = (req, res, next) => {

  const token = req.headers.authorization;

  if (!token) return res.status(UNAUTHORIZED).json({message: MISSING_TOKEN});

  try {
    const validToken = validateToken(token);
    
    const { userId } = validToken.data;
    req.userId = userId;
    req.token = token;

  } catch (_error) {
    return res.status(UNAUTHORIZED).json({message: JWT_MALFORMED});
  }
  next();
};

module.exports = tokenValidatorMiddl;
