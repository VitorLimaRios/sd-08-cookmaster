const STATUS_500 = 500;

module.exports = (err, _req, res, _next) => {
  if(err.isJoi) {
    return res.status(err.statusCode).json({message: err.message});
  }
  res.status(err.statusCode || STATUS_500).json({message: err.message});
};
