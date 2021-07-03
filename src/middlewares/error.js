const STATUS_400 = 400;
const STATUS_500 = 500;

module.exports = (err, _req, res, _next) => {
  if(err.isJoi) {
    res.status(STATUS_400).json({message: 'Invalid entries. Try again.'});
  }
  res.status(err.statusCode || STATUS_500).json({message: err.message});
};
