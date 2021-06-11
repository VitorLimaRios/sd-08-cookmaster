const userService = require('../services/userService');
const httpStatusCodeSucess = 200;
const httpStatusCodeCreated = 201;
const httpStatusCodeBadRequest = 400;
const httpStatusCodeConflict = 409;

const cadastrarUsuario = async (req, res) => {
  try {
    const usuario = req.body;
    const result = await userService.criar(usuario);
    const usuarioRetorno = {user: result};
    res.status(httpStatusCodeCreated).json(usuarioRetorno);
  } catch (err) {
    const httpRetorno = err.message === 'Email already registered' ? 
      httpStatusCodeConflict : httpStatusCodeBadRequest;
    res.status(httpRetorno).json(
      {
        message: err.message
      }
    );
  }
};

module.exports = {
  cadastrarUsuario,
};