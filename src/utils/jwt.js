module.exports = (err, decode) => {
  if(err) {
    err.message = 'jwt malformed';
    err.statusCode = 401;
    throw err;
  };
  return decode;
};
