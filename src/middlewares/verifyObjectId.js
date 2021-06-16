const { ObjectId } = require('mongodb');
const CustomError = require('../error/customError');

const path = {
  '/recipes/:id': {
    'get': (req) => {
      const { id } = req.params;
      if (!id || !ObjectId.isValid(id)) {
        return 'r-n-found';
      }
      return { _id: id };
    }
  }
};

module.exports = (req, res, next) => {
  try {
    const info = { 
      path: req.route.path,
      method: Object.keys(req.route.methods)[0]
    };
    const valid = path[info.path][info.method];
    const resolve = valid(req);
    if (typeof resolve === 'string') {
      throw new CustomError(
        'Invalid id',
        'invalid',
        resolve
      );
    }

    next();
  } catch (err) {
    if (err instanceof CustomError) {
      return next(err.responseError());
    }
    return next(err);
  }
};