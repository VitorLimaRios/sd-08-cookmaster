const STATUS_500 = 500;

module.exports = (err, req, res, next) => {
  res.status(STATUS_500).json(err);
}; 