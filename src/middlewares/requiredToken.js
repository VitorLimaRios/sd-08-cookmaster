const CustomError = require('../error/customError');

module.exports = (req, _res, next) => {
  try{
    const info = { 
      path: req.route.path,
      method: Object.keys(req.route.methods)[0]
    };
    if (info.path === '/recipes/:id' && info.method === ('put' || 'delete')) {
      const { authorization: token } = req.headers;
      if (!token) {
        throw new CustomError(
          'token incorrect',
          'update',
          'm-a-token'
        );
      }
    }
    next();
  } catch (err) {
    if (err instanceof CustomError) {
      return next(err.responseError());
    }
    return next(err);
  }
};