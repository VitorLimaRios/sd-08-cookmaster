const jwt = require('jsonwebtoken');
const { getByEmail } = require('../../models/users/users');

const secret = 'tokenSecret';
const msg = 'jwt malformed';
const msg1 = 'missing auth token';

const QOU = 401;

const validateJwt = async (req, res, next) => {
  const token = req.headers.authorization;
  
  if (!token) return res.status(QOU).json({ message: msg1 });
  
  try {
    const decoded = jwt.verify(token, secret);
    
    const email = await getByEmail(decoded.email);
    
    if (!email) return res.status(QOU).json({ message: msg });
    
    req.users = decoded;

    next();
  } catch (err) {
    return res.status(QOU).json({ message: err.message });
  }
};

module.exports = validateJwt;
