const auth = require('../auth');
const CustomErro = require('../error/customError');

module.exports = (req, _res, next) => {
  try {
    const { authorization: token } = req.headers;
    if (!token) {
      throw new CustomErro(
        'Token invalid',
        'middleware authentication',
        'r-i-jwt'
      );
    }

    const compare = auth(token);

    if (!compare.payload) {
      throw new CustomErro(
        'Token invalid',
        'middleware authentication',
        'r-i-jwt'
      );
    }

    req.payload = compare.payload;
    next();
  }catch (err) {
    if (err instanceof CustomErro) {
      return next(err.responseError());
    }
    return next(err);
  }
};