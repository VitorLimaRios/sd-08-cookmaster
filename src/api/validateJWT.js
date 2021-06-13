const jwt = require('jsonwebtoken');
const user = require('./models/userModel');

const secret = 'odeioBackEnd';
const invalid = 401; 

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

module.exports = async (req, res, next) => {
  const token = req.headers['authorization'];

  // if (!token) return res.status(400).json({ 'message': 'Token not found' });

  try {
    const payload = jwt.verify(token, secret);

    const userAccount = await user.findByEmail(payload.data.email);

    if (!userAccount) return res.status(invalid).json({ 'message': 'jwt malformed' });

    req.user = userAccount;

  } catch (err) {
    // return res.status(invalid).json({ 'message': 'jwt malformed' });
  }
  console.log('as');
  next();
};

// const jwt = require('jsonwebtoken');
// const user = require('./models/userModel');

// const secret = 'odeioBackEnd';
// const invalid = 401; 

// module.exports = async (req, res, next) => {
//   const token = req.headers.authorization;
//   console.log('9',token);

//   jwt.verify(token, secret, function (err, decoded) {
//     if(err) return res.status(invalid).json({ 'message': 'jwt malformed'});
//     req.userId = decoded.id;
//     console.log('User Id: ' + decoded.id);
//     next();
//   });
// };
