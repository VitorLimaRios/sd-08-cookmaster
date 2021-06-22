const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const INTERNAL_SERVER_ERROR = 500;

const error = (err, _req, res, _next) => {
  let code;

  if (err.isJoi) {

    switch (err.details[0].message) {
    case 'Invalid entries. Try again.':
      code = BAD_REQUEST;
      break;

    case 'All fields must be filled':
      code = UNAUTHORIZED;
      break;

    default:
      code = INTERNAL_SERVER_ERROR;
    }

    return res.status(code)
      .json({
        message: err.details[0].message
      });
  }

  return res.status(err.code  || INTERNAL_SERVER_ERROR)
    .json({ message: err.message });;
};

module.exports = error;