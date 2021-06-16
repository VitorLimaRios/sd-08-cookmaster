const jwt = require('jsonwebtoken');
const usersModel = require('../models/users');

const STATUS_401 = 401;

const auth = async (req, res, next) => {
  // const { password } = req.body;
  // console.log('pass', password);
  // if (pass === 'admin') return next();
  const secret = 'xablau';
  const token = req.headers.authorization;
  if (!token)  return res.status(STATUS_401).json({ message: 'missing auth token'});
  try {
    const decode = jwt.verify(token, secret);
    if (!decode) return res.status(STATUS_401).json({ message: 'jwt malformed' });   
    const user = await usersModel.findByEmail(decode.email);      
    // console.log('mid_auth', user);
    req.user = user;
    next();
  } catch (error) { 
    return res.status(STATUS_401).json({ message: 'jwt malformed' });   
  }
};

const fileImage = (req, res) => {
  const upload = multer({ dest: path.join(__dirname, '..', 'uploads') });
};

// app.post('/recipes/:id/image/', auth, upload.single('image'), (req, res) => {

// });

module.exports = {
  auth,
  fileImage,
};
