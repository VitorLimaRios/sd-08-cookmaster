const jwt = require('jsonwebtoken');
// const multer = require('multer');
const usersModel = require('../models/users');

const STATUS_401 = 401;
// const STATUS_200 = 200;

const auth = async (req, res, next) => {
  // const { password } = req.body;
  // console.log('pass', password);
  // if (pass === 'admin') return next();
  const secret = 'xablau';
  const token = req.headers.authorization;
  if (!token)  return res.status(STATUS_401).json({ message: 'missing auth token'});
  try {
    const decode = jwt.verify(token, secret);
    if (!decode) { 
      return res.status(STATUS_401).json({ message: 'jwt malformed' });
    } else { 
      const user = await usersModel.findByEmail(decode.email);
      req.user = user;
      next();
    }
  } catch (error) {
    return res.status(STATUS_401).json({ message: 'jwt malformed' });
  }
};
// --------------------------------------------
// const addImage = (req, _res) => {
//   const storage = multer.diskStorage({
//     destination: (_req, _file, callback) => 
//       callback(null, { dest: path.join(__dirname, '..', 'uploads') }),
//     filename: (req, _file, callback) => {
//       const { id } = req.params;
//       callback(null, `${id}.jpeg`);
//     },
//   });
//   const upload = multer({ storage });
//   req.recipe = upload;
//   console.log(req.recipe);
//   res.status(STATUS_200).json();
// };

module.exports = {
  auth,
  // addImage,
};
