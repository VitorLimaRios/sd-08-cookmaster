const jwt = require('jsonwebtoken');
const userModel = require('../models/usersMod');

const secret = 'cookmaster';

const code = {
  code401: 401,
};

const validJWT = async (req, res, next) => {
  const token = req.headers['authorization'];

  if(!token) {
    return res.status().json({ message: 'jwt malformed'});
  }

  try {
    const decoded = jwt.verify(token, secret);
    console.log('decoded', decoded);
    const getAll = await userModel.getAll();
    console.log('getAll validateJWT', getAll);
    const findUser = await getAll.find((data) => 
      // console.log('findUser data', data.email);
      // console.log('findUser decoded', decoded.data.email);
      data.email === decoded.data.email
    );
    console.log('findUser validateJWT', findUser);
    // const user = await userModel.findUser(decoded.data._id);

    if(!findUser) {
      return res
        .status(code.code401)
        .json({ message: 'Erro ao procurar usuário do token.'});
    }

    req.user = findUser;

    next();

  } catch (err) {
    return res.status(code.code401).json({ message: err.message });
  }
};

module.exports = {
  validJWT
};
