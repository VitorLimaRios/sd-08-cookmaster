const invalid = 400;
const erro = 500;

module.exports = (err, _req, res, _next) => {
  if(err.isJoi) {
    res.status(invalid).json({message: 'Invalid entries. Try again.'});
  }
  res.status(err.statusCode || erro).json({message: err.message});
};
