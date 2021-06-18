const auth = require('../auth');
const CustomErro = require('../error/customError');

module.exports = (req, _res, next) => {
  try {
    const { authorization: token } = req.headers;
    const info = {
      path: req.route.path,
      method: Object.keys(req.route.methods)[0],
    };

    const msgErr = {
      '/recipes/:id': {
        delete: 'm-a-token',
      },
    };
    const typeMsg = msgErr[info.path] || { [info.method]: '' };
    const msgCode =
      typeMsg[info.method] === 'm-a-token' ? 'm-a-token' : 'r-i-jwt';
    if (!token) {
      throw new CustomErro(
        'Token invalid',
        'middleware authentication',
        msgCode
      );
    }
      
    const compare = auth(token);
    
    if (!compare.payload) {
      throw new CustomErro(
        'Token invalid',
        'middleware authentication',
        msgCode
      );
    }
      
    req.payload = compare.payload;
    next();
  } catch (err) {
    if (err instanceof CustomErro) {
      return next(err.responseError());
    }
    return next(err);
  }
};
